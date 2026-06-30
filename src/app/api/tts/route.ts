import { NextResponse } from 'next/server';

function escapeXml(unsafe: string) {
    return unsafe.replace(/[<>&"']/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return c;
        }
    });
}

function generateRequestId() {
  return crypto.randomUUID().replace(/-/g, '');
}

async function generateSecMsGecToken() {
    const TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
    const WINDOWS_FILE_TIME_EPOCH = BigInt("11644473600");
    const ticks = BigInt(Math.floor((Date.now() / 1000) + Number(WINDOWS_FILE_TIME_EPOCH))) * BigInt("10000000");
    const roundedTicks = ticks - (ticks % BigInt("3000000000"));
    const strToHash = `${roundedTicks}${TRUSTED_CLIENT_TOKEN}`;
    
    // We can use crypto module for hashing since we removed runtime='edge'
    const cryptoModule = await import('crypto');
    return cryptoModule.createHash('sha256').update(strToHash, 'ascii').digest('hex').toUpperCase();
}

async function getEdgeTTS(text: string, voice: string): Promise<Uint8Array> {
  const gecToken = await generateSecMsGecToken();
  const wsUrl = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4&Sec-MS-GEC=${gecToken}&Sec-MS-GEC-Version=1-130.0.2849.68`;

  let ws: any;
  const isCloudflare = typeof (globalThis as any).WebSocketPair !== 'undefined';
  
  if (isCloudflare) {
    // Cloudflare Workers WebSocket client via fetch
    const fetchUrl = wsUrl.replace('wss://', 'https://');
    const response = await fetch(fetchUrl, {
      headers: {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
        'Origin': 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold'
      }
    });
    ws = (response as any).webSocket;
    if (!ws) throw new Error("No websocket returned from CF fetch");
    ws.accept();
  } else {
    // Local Node.js environment
    // Use ws package so we can pass the required Origin header
    // Use eval to avoid Next.js attempting to bundle 'ws' for the edge unnecessarily
    const WS = await eval("import('ws')");
    ws = new WS.default(wsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
        'Origin': 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold'
      }
    });
  }

  return new Promise((resolve, reject) => {
    let audioChunks: Uint8Array[] = [];
    let isCompleted = false;

    const timeout = setTimeout(() => {
      if (!isCompleted) {
        ws.close();
        reject(new Error("Edge TTS Timeout"));
      }
    }, 30000);

    const onOpen = () => {
      const configMessage = `Content-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"true"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`;
      ws.send(configMessage);

      const requestId = generateRequestId();
      const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="vi-VN"><voice name="${voice}"><prosody rate="default" pitch="default" volume="default">${escapeXml(text)}</prosody></voice></speak>`;
      const ssmlMessage = `X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nPath:ssml\r\n\r\n${ssml}`;
      ws.send(ssmlMessage);
    };

    const onMessage = async (eventOrData: any) => {
      // the 'ws' package passes raw data as first argument instead of an event object
      const data = isCloudflare ? eventOrData.data : eventOrData;
      
      if (typeof data === 'string') {
        if (data.includes('Path:turn.end')) {
          isCompleted = true;
          clearTimeout(timeout);
          ws.close();
          
          const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.length, 0);
          const finalAudio = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk of audioChunks) {
            finalAudio.set(chunk, offset);
            offset += chunk.length;
          }
          resolve(finalAudio);
        }
      } else {
        // Binary audio data
        let buffer: ArrayBuffer;
        if (typeof Blob !== 'undefined' && data instanceof Blob) {
           buffer = await data.arrayBuffer();
        } else if (data.buffer) { // Buffer or ArrayBufferView
           buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        } else {
           buffer = data;
        }

        const uint8 = new Uint8Array(buffer);
        const separatorStr = "Path:audio\r\n";
        const encoder = new TextEncoder();
        const separator = encoder.encode(separatorStr);
        
        let index = -1;
        for (let i = 0; i < uint8.length - separator.length; i++) {
          let match = true;
          for (let j = 0; j < separator.length; j++) {
            if (uint8[i + j] !== separator[j]) {
              match = false;
              break;
            }
          }
          if (match) {
            index = i + separator.length;
            break;
          }
        }

        if (index !== -1) {
          audioChunks.push(uint8.slice(index));
        }
      }
    };

    const onError = (err: any) => {
      clearTimeout(timeout);
      reject(err);
    };

    if (ws.readyState === 1 /* OPEN */) {
      onOpen();
    } else if (isCloudflare) {
      ws.addEventListener('open', onOpen);
    } else {
      ws.on('open', onOpen);
    }
    
    if (isCloudflare) {
      ws.addEventListener('message', onMessage);
      ws.addEventListener('error', onError);
      ws.addEventListener('close', () => {
        if (!isCompleted) {
          clearTimeout(timeout);
          reject(new Error("WebSocket closed unexpectedly"));
        }
      });
    } else {
      ws.on('message', onMessage);
      ws.on('error', onError);
      ws.on('close', () => {
        if (!isCompleted) {
          clearTimeout(timeout);
          reject(new Error("WebSocket closed unexpectedly"));
        }
      });
    }
  });
}

export async function POST(req: Request) {
  try {
    const { text, voice = "vi-VN-NamMinhNeural" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const finalAudio = await getEdgeTTS(text, voice);

    return new NextResponse(finalAudio as any, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': finalAudio.length.toString(),
      },
    });
  } catch (error: unknown) {
    console.error("TTS Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Failed to generate TTS", details: errorMessage }, { status: 500 });
  }
}
