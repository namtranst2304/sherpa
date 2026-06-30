import { NextResponse } from 'next/server';
import { EdgeTTS } from 'node-edge-tts';
import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { text, voice = "vi-VN-NamMinhNeural" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const tts = new EdgeTTS({
      voice: voice,
      lang: "vi-VN",
      outputFormat: "audio-24khz-48kbitrate-mono-mp3",
      timeout: 60000,
    });

    const tempFilePath = path.join(os.tmpdir(), `tts-${Date.now()}-${crypto.randomUUID()}.mp3`);
    let audioBuffer: Buffer;
    
    try {
      await tts.ttsPromise(text, tempFilePath);
      audioBuffer = fs.readFileSync(tempFilePath);
    } finally {
      // Clean up luon luon chay du thanh cong hay that bai
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("TTS Error:", error);
    return NextResponse.json({ error: "Failed to generate TTS", details: error.message }, { status: 500 });
  }
}
