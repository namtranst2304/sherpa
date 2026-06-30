import { NextResponse } from 'next/server';

// Split text into chunks of max 200 chars for Google TTS
function splitText(text: string, maxLength: number = 200): string[] {
  const words = text.split(' ');
  const chunks = [];
  let currentChunk = '';

  for (const word of words) {
    if (currentChunk.length + word.length + 1 > maxLength) {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = word;
    } else {
      currentChunk = currentChunk ? `${currentChunk} ${word}` : word;
    }
  }
  if (currentChunk) chunks.push(currentChunk);

  return chunks;
}

export async function POST(req: Request) {
  try {
    const { text, voice } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // node-edge-tts is incompatible with Cloudflare Workers because it uses 'fs' and 'ws' (net TCP sockets).
    // We fall back to Google Translate TTS API which relies solely on edge-compatible fetch requests.
    const chunks = splitText(text, 200);
    const audioBuffers: Uint8Array[] = [];
    let totalLength = 0;

    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Referer': 'http://translate.google.com/',
        },
      });

      if (!response.ok) {
        throw new Error(`Google TTS failed for chunk with status ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      audioBuffers.push(uint8Array);
      totalLength += uint8Array.length;
    }

    // Concatenate all audio MP3 buffers
    const finalAudio = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of audioBuffers) {
      finalAudio.set(buf, offset);
      offset += buf.length;
    }

    return new NextResponse(finalAudio, {
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
