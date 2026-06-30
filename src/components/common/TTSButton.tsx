"use client";

import * as React from "react";
import { Volume2, Square, Settings2 } from "lucide-react";
import type { ThemeColorTokens } from "@/lib/theme";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function TTSButton({ text, theme }: { text: string; theme?: ThemeColorTokens }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [selectedVoice, setSelectedVoice] = React.useState("vi-VN-NamMinhNeural");
  const [isLoading, setIsLoading] = React.useState(false);

  // Lưu trữ các câu đã tải
  const playlistRef = React.useRef<{ audio: HTMLAudioElement; url: string }[]>([]);
  const currentIndexRef = React.useRef(0);
  const stopRef = React.useRef<{ stop: () => void }>({ stop: () => {} });
  
  // Lưu state để biết đang đọc bài nào
  const currentTextRef = React.useRef("");
  const currentVoiceRef = React.useRef("");

  React.useEffect(() => {
    // Reset playlist nếu nội dung hoặc giọng thay đổi
    if (text !== currentTextRef.current || selectedVoice !== currentVoiceRef.current) {
      stopRef.current.stop();
      playlistRef.current.forEach(item => {
        item.audio.pause();
        URL.revokeObjectURL(item.url);
      });
      playlistRef.current = [];
      currentIndexRef.current = 0;
      currentTextRef.current = text;
      currentVoiceRef.current = selectedVoice;
      setIsPlaying(false);
      setIsPaused(false);
      window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: false } }));
    }
  }, [text, selectedVoice]);

  // Nghe sự kiện từ các thẻ khác để tự dừng nếu có người khác phát
  React.useEffect(() => {
    const handleOtherPlay = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.text !== text) {
        if (isPlaying) {
          stopRef.current.stop();
          if (playlistRef.current[currentIndexRef.current]) {
            playlistRef.current[currentIndexRef.current].audio.pause();
          }
          setIsPlaying(false);
          setIsPaused(true);
        }
      }
    };
    window.addEventListener('tts-play-started', handleOtherPlay);
    return () => window.removeEventListener('tts-play-started', handleOtherPlay);
  }, [text, isPlaying]);

  React.useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      stopRef.current.stop();
      playlistRef.current.forEach(item => {
        item.audio.pause();
        URL.revokeObjectURL(item.url);
      });
      window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: false } }));
    };
  }, []);

  const handlePlay = async () => {
    if (!text) return;

    if (isPlaying) {
      stopRef.current.stop();
      if (playlistRef.current[currentIndexRef.current]) {
        playlistRef.current[currentIndexRef.current].audio.pause();
      }
      setIsPlaying(false);
      setIsPaused(true);
      window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: false } }));
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: true } }));
    window.dispatchEvent(new CustomEvent('tts-play-started', { detail: { text } }));

    // Hàm chia nhỏ text theo câu
    const chunks = text.match(/[^.!?\n]+[.!?\n]+/g)?.map(s => s.trim()).filter(Boolean) || [text];

    let isCancelled = false;
    stopRef.current.stop = () => { isCancelled = true; };

    const fetchChunk = async (index: number) => {
      if (playlistRef.current[index]) return playlistRef.current[index]; // Đã tải

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chunks[index], voice: selectedVoice })
      });

      if (!response.ok) throw new Error("TTS chunk failed");
      
      const blob = await response.blob();
      const audioBlob = new Blob([blob], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      
      const item = { audio, url };
      playlistRef.current[index] = item;
      return item;
    };

    try {
      if (currentIndexRef.current === 0 && !playlistRef.current[0]) {
        setIsLoading(true);
      }

      // Phát từng câu nối tiếp nhau
      while (currentIndexRef.current < chunks.length) {
        if (isCancelled) break;

        // Tải câu hiện tại (rất nhanh vì đoạn ngắn)
        const currentItem = await fetchChunk(currentIndexRef.current);
        setIsLoading(false);

        // Phát ngầm câu tiếp theo trong lúc câu hiện tại đang đọc
        if (currentIndexRef.current + 1 < chunks.length) {
          fetchChunk(currentIndexRef.current + 1).catch(() => {});
        }

        // Phát audio
        const audio = currentItem.audio;
        
        await new Promise((resolve) => {
          audio.onended = resolve;
          audio.onerror = resolve;
          stopRef.current.stop = () => {
            isCancelled = true;
            audio.pause();
            resolve(false);
          };
          audio.play().catch(resolve);
        });

        if (!isCancelled) {
          currentIndexRef.current++;
        }
      }

      if (!isCancelled && currentIndexRef.current >= chunks.length) {
        // Đọc xong toàn bộ
        setIsPlaying(false);
        setIsPaused(false);
        currentIndexRef.current = 0; // reset
        window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: false } }));
      }
    } catch (error) {
      console.error(error);
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoading(false);
      window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: false } }));
    }
  };

  if (!text) return null;

  const voices = [
    { id: "vi-VN-NamMinhNeural", name: "Nam Minh (Nam)" },
    { id: "vi-VN-HoaiMyNeural", name: "Hoài My (Nữ)" }
  ];

  return (
    <div 
      className="tts-btn-group inline-flex items-center p-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 group hover:border-white/20 shrink-0"
      style={{
        boxShadow: isPlaying ? `0 0 20px ${theme?.hex || '#22d3ee'}30` : undefined,
        borderColor: isPlaying ? `${theme?.hex || '#22d3ee'}50` : undefined
      }}
    >
      <button 
        onClick={handlePlay}
        className="flex items-center justify-center gap-2.5 px-4 md:px-5 py-2 rounded-full hover:bg-white/10 transition-all text-xs font-mono tracking-widest uppercase"
        style={{ color: isPlaying || isLoading ? (theme?.hex || '#22d3ee') : '#a1a1aa' }}
        title={isPlaying ? "Pause Reading" : isPaused ? "Resume Reading" : "Read Story"}
      >
        {isLoading ? (
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: theme?.hex || '#22d3ee', borderTopColor: 'transparent' }} />
          </div>
        ) : isPlaying ? (
          <Square className="w-4 h-4 fill-current animate-pulse" />
        ) : (
          <Volume2 className="w-4 h-4 transition-transform group-hover:scale-110" />
        )}
        <span className="hidden md:inline font-semibold">{isLoading ? "Loading" : isPlaying ? "Pause" : isPaused ? "Resume" : "Listen"}</span>
      </button>

      <div className="w-[1px] h-5 bg-white/10 mx-1" />

      <Popover>
        <PopoverTrigger asChild>
          <button 
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full hover:bg-white/10 transition-all text-zinc-400 hover:text-white"
            title="Voice Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-52 p-2 bg-black/95 backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] text-white" 
          sideOffset={12}
        >
          <div className="space-y-1">
            <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase px-2 pb-2 mb-1 border-b border-white/10">
              AI Voice Engine
            </h4>
            {voices.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVoice(v.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-all flex items-center justify-between
                  ${selectedVoice === v.id ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}
                `}
              >
                {v.name}
                {selectedVoice === v.id && (
                  <div 
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]" 
                    style={{ backgroundColor: theme?.hex || '#22d3ee', color: theme?.hex || '#22d3ee' }} 
                  />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
