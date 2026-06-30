"use client";

import * as React from "react";
import { Volume2, Settings2, Square, BookOpen } from "lucide-react";
import type { ThemeColorTokens } from "@/lib/theme";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { TimelineEvent } from "@/data/timeline/index";

const DESTINY_PHONETICS: Record<string, string> = {
  "The Final Shape": "Đờ Phai nồ sếp",
  "The Witness": "Đờ Uýt nợt",
  "The Traveler": "Đờ Tra vồ lờ",
  "Black Fleet": "Bờ lách Phờ lít",
  "Iron Lord": "Ai rờn lót",
  "Clovis Bray": "Cờ lô vít Bờ rây",
  "Beyond Light": "Bi don lai",
  "Witch Queen": "Uých quin",
  "Red War": "Rét oa",
  "Ares One": "E rít oăn",
  "Saint-14": "Xên mười bốn",
  "Cayde-6": "Kây sáu",
  "Mara Sov": "Ma ra xốp",
  "Xivu Arath": "Xi vu A rát",
  "Traveler": "Tra vồ lờ",
  "Witness": "Uýt nợt",
  "Eliksni": "Y lích xờ ni",
  "Lightfall": "Lai phôn",
  "Darkness": "Đác nớt",
  "Vanguard": "Van gát",
  "Warlock": "Oa lóc",
  "Titan": "Tai tần",
  "Hunter": "Hăn tờ",
  "Ghost": "Gốut",
  "Savathûn": "Xa va thun",
  "Neomuna": "Nê ô mu na",
  "Awoken": "A uốc cần",
  "Destiny": "Đét xờ ti ni",
  "Pyramid": "Pi ra mít",
  "Fallen": "Phôn lờn",
  "Taken": "Tây cần",
  "Scorn": "Xờ con",
  "Crucible": "Cờ ru xi bồ",
  "Ishtar": "Ích ta",
  "Rasputin": "Rát pu tin",
  "Warmind": "Oa mai",
  "Speaker": "Xờ pích cơ",
  "Osiris": "Ô xai rít",
  "Zavala": "Da va la",
  "Ikora": "Ai cô ra",
  "Uldren": "U đờ rần",
  "Ahamkara": "A ham ca ra",
  "Shadowkeep": "Sa đô kíp",
  "Forsaken": "Pho sếch cần",
  "Collapse": "Cồ láp",
  "Light": "Lai",
  "Hive": "Hai",
  "Vex": "Véc",
  "Cabal": "Ca ban",
  "Oryx": "O rích",
  "Crota": "Cờ rô ta",
  "Rhulk": "Rúc",
  "Exo": "Ếch xô",
  "SIVA": "Si va",
  "Crow": "Cờ râu",
};

const applyPhonetics = (text: string) => {
  let result = text;
  // Sắp xếp các từ theo độ dài giảm dần để ưu tiên thay cụm từ dài trước (tránh lỗi đè chữ)
  const sortedKeys = Object.keys(DESTINY_PHONETICS).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(key => {
    // Regex thay thế từ chính xác (case-insensitive)
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    result = result.replace(regex, DESTINY_PHONETICS[key]);
  });
  return result;
}

export interface TTSControlsProps {
  events: TimelineEvent[];
  currentEventIndex: number;
  theme?: ThemeColorTokens;
  onEventChange?: (index: number) => void;
  className?: string;
  eraTitle?: string;
  eraDescription?: string;
}

export function TTSButton({ events, currentEventIndex, theme, onEventChange, className, eraTitle, eraDescription }: TTSControlsProps) {
  const instanceId = React.useId();
  const [mode, setMode] = React.useState<'NONE' | 'SINGLE' | 'CHAPTER'>('NONE');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [selectedVoice, setSelectedVoice] = React.useState("vi-VN-NamMinhNeural");
  const [isLoading, setIsLoading] = React.useState(false);

  // Lưu trữ các câu đã tải
  const playlistRef = React.useRef<{ audio: HTMLAudioElement; url: string; eventIndex: number }[]>([]);
  const currentIndexRef = React.useRef(0);
  const stopRef = React.useRef<{ stop: () => void }>({ stop: () => { } });

  // Lưu state để biết đang đọc voice nào, event nào
  const currentVoiceRef = React.useRef("");
  const playingEventIndexRef = React.useRef(-1);
  const isAutoScrollingRef = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const stopPlayback = React.useCallback(() => {
    stopRef.current.stop();
    playlistRef.current.forEach(item => {
      item.audio.pause();
      URL.revokeObjectURL(item.url);
    });
    playlistRef.current = [];
    currentIndexRef.current = 0;
    setIsPlaying(false);
    setIsPaused(false);
    setMode('NONE');
    window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: false } }));
  }, []);

  // Nếu user vuốt sang thẻ khác bằng tay thì tự tắt (dù là SINGLE hay CHAPTER)
  React.useEffect(() => {
    if (isPlaying && playingEventIndexRef.current !== -1 && playingEventIndexRef.current !== currentEventIndex) {
      if (!isAutoScrollingRef.current) {
        stopPlayback();
      }
    }
  }, [currentEventIndex, isPlaying, stopPlayback]);

  // Tự động tắt nếu người dùng cuộn sang chương khác (nút TTS bị khuất khỏi màn hình)
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying) {
            stopPlayback();
          }
        });
      },
      { threshold: 0 }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) observer.unobserve(currentContainer);
    };
  }, [isPlaying, stopPlayback]);

  React.useEffect(() => {
    // Reset playlist nếu giọng thay đổi
    if (selectedVoice !== currentVoiceRef.current) {
      stopPlayback();
      currentVoiceRef.current = selectedVoice;
    }
  }, [selectedVoice, stopPlayback]);

  // Nghe sự kiện từ các thẻ/instance khác để tự dừng
  React.useEffect(() => {
    const handleOtherPlay = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.id !== instanceId) {
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
  }, [instanceId, isPlaying]);

  React.useEffect(() => {
    return () => stopPlayback();
  }, [stopPlayback]);

  const handlePlay = async (targetMode: 'SINGLE' | 'CHAPTER') => {
    if (!events || events.length === 0) return;

    // Toggle pause/resume nếu bấm lại nút của mode đang chạy
    if (mode === targetMode && isPlaying) {
      stopRef.current.stop();
      if (playlistRef.current[currentIndexRef.current]) {
        playlistRef.current[currentIndexRef.current].audio.pause();
      }
      setIsPlaying(false);
      setIsPaused(true);
      window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: false } }));
      return;
    }

    if (mode === targetMode && isPaused) {
      // Resume
      setIsPlaying(true);
      setIsPaused(false);
      window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: true } }));
      window.dispatchEvent(new CustomEvent('tts-play-started', { detail: { id: instanceId } }));
      // Tiếp tục vòng lặp bằng cách gọi lại phần play (cần refactor một chút nếu muốn resume chuẩn)
      // Để đơn giản, ta tái khởi động play loop từ currentIndex
      startPlayLoop();
      return;
    }

    // Nếu đổi mode hoặc play mới
    stopPlayback();
    setMode(targetMode);
    setIsPlaying(true);
    setIsPaused(false);
    playingEventIndexRef.current = currentEventIndex;

    window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: true } }));
    window.dispatchEvent(new CustomEvent('tts-play-started', { detail: { id: instanceId } }));

    // Chuẩn bị chunks
    const chunks: { text: string; eventIndex: number }[] = [];

    const eventsToProcess = targetMode === 'SINGLE'
      ? [{ text: `${events[currentEventIndex].title}. ${events[currentEventIndex].description.replace(/\*\*(.*?)\*\*/g, '$1')}`, eIdx: currentEventIndex }]
      : events.map((e, idx) => {
        let text = `${e.title}. ${e.description.replace(/\*\*(.*?)\*\*/g, '$1')}`;
        // Nối thêm tiêu đề và mô tả của chương vào sự kiện đầu tiên
        if (idx === 0 && eraTitle) {
          const prefix = `${eraTitle}. ${eraDescription ? eraDescription + ". " : ""}`;
          text = prefix + text;
        }
        return { text, eIdx: idx };
      });

    // Nếu Read Chapter, tự động nhảy về đầu tiên
    if (targetMode === 'CHAPTER' && onEventChange) {
      onEventChange(0);
    }

    eventsToProcess.forEach(({ text: txt, eIdx }) => {
      // Áp dụng từ điển phiên âm trước khi chia câu
      const phoneticText = applyPhonetics(txt);

      const rawChunks = phoneticText.split('\n')
        .flatMap(line => line.match(/.*?[.!?](?:\s|$)|.+/g) || [])
        .map(s => s.trim())
        .filter(Boolean);

      let currentChunk = "";
      for (const c of rawChunks) {
        if (!currentChunk || currentChunk.length + c.length < 100) {
          currentChunk += (currentChunk ? " " : "") + c;
        } else {
          chunks.push({ text: currentChunk, eventIndex: eIdx });
          currentChunk = c;
        }
      }
      if (currentChunk) chunks.push({ text: currentChunk, eventIndex: eIdx });
    });

    startPlayLoop(chunks);
  };

  const startPlayLoop = async (chunksProvided?: { text: string; eventIndex: number }[]) => {
    // Lưu các biến local để loop
    const chunksToPlay = chunksProvided || playlistRef.current.map(p => ({ text: '', eventIndex: p.eventIndex })); // Fallback tạm

    let isCancelled = false;
    stopRef.current.stop = () => { isCancelled = true; };

    const fetchChunk = async (index: number) => {
      if (playlistRef.current[index]) return playlistRef.current[index]; // Đã tải

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: chunksToPlay[index].text, voice: selectedVoice })
      });

      if (!response.ok) throw new Error("TTS chunk failed");

      const blob = await response.blob();
      const audioBlob = new Blob([blob], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);

      const item = { audio, url, eventIndex: chunksToPlay[index].eventIndex };
      playlistRef.current[index] = item;
      return item;
    };

    try {
      if (currentIndexRef.current === 0 && !playlistRef.current[0]) {
        setIsLoading(true);
      }

      let lastNotifiedEventIndex = -1;

      while (currentIndexRef.current < chunksToPlay.length) {
        if (isCancelled) break;

        const currentEventIndex = chunksToPlay[currentIndexRef.current].eventIndex;
        if (onEventChange && currentEventIndex !== lastNotifiedEventIndex) {
          // Bật cờ auto scroll để useEffect không hiểu nhầm là user tự vuốt
          isAutoScrollingRef.current = true;
          onEventChange(currentEventIndex);
          lastNotifiedEventIndex = currentEventIndex;
          playingEventIndexRef.current = currentEventIndex;

          // Tắt cờ auto scroll sau 1s (chờ carousel trượt xong)
          setTimeout(() => { isAutoScrollingRef.current = false; }, 1000);
        }

        const currentItem = await fetchChunk(currentIndexRef.current);
        setIsLoading(false);

        if (currentIndexRef.current + 1 < chunksToPlay.length) {
          fetchChunk(currentIndexRef.current + 1).catch(() => { });
        }
        if (currentIndexRef.current + 2 < chunksToPlay.length) {
          fetchChunk(currentIndexRef.current + 2).catch(() => { });
        }

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

      if (!isCancelled && currentIndexRef.current >= chunksToPlay.length) {
        setIsPlaying(false);
        setIsPaused(false);
        setMode('NONE');
        currentIndexRef.current = 0;
        window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: false } }));
      }
    } catch (error) {
      console.error(error);
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoading(false);
      setMode('NONE');
      window.dispatchEvent(new CustomEvent('toggle-global-music', { detail: { pause: false } }));
    }
  };

  if (!events || events.length === 0) return null;

  const voices = [
    { id: "vi-VN-NamMinhNeural", name: "Nam Minh (Nam)" },
    { id: "vi-VN-HoaiMyNeural", name: "Hoài My (Nữ)" }
  ];

  const isActive = isPlaying || isLoading;

  return (
    <div
      ref={containerRef}
      className={`tts-btn-group inline-flex items-center p-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 group shrink-0 ${className || ""}`}
      style={{
        boxShadow: isActive ? `0 0 20px ${theme?.hex || '#22d3ee'}30` : undefined,
        borderColor: isActive ? `${theme?.hex || '#22d3ee'}50` : undefined
      }}
    >
      {/* Read Single Button */}
      <button
        onClick={() => handlePlay('SINGLE')}
        className="flex items-center justify-center gap-2.5 px-3 md:px-5 py-2 rounded-full hover:bg-white/10 transition-all text-[10px] md:text-xs font-mono tracking-widest uppercase"
        style={{ color: mode === 'SINGLE' && isActive ? (theme?.hex || '#22d3ee') : '#a1a1aa' }}
        title={mode === 'SINGLE' && isPlaying ? "Pause Reading" : mode === 'SINGLE' && isPaused ? "Resume Reading" : "Read Current Card"}
      >
        {mode === 'SINGLE' && isLoading ? (
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: theme?.hex || '#22d3ee', borderTopColor: 'transparent' }} />
          </div>
        ) : mode === 'SINGLE' && isPlaying ? (
          <Square className="w-4 h-4 fill-current animate-pulse" />
        ) : (
          <Volume2 className="w-4 h-4 transition-transform group-hover:scale-110" />
        )}
        <span className="font-semibold">Read</span>
      </button>

      <div className="w-[1px] h-5 bg-white/10 mx-1" />

      {/* Read Chapter Button */}
      <button
        onClick={() => handlePlay('CHAPTER')}
        className="flex items-center justify-center gap-2.5 px-3 md:px-5 py-2 rounded-full hover:bg-white/10 transition-all text-[10px] md:text-xs font-mono tracking-widest uppercase"
        style={{ color: mode === 'CHAPTER' && isActive ? (theme?.hex || '#22d3ee') : '#a1a1aa' }}
        title={mode === 'CHAPTER' && isPlaying ? "Pause Chapter" : mode === 'CHAPTER' && isPaused ? "Resume Chapter" : "Read Entire Chapter"}
      >
        {mode === 'CHAPTER' && isLoading ? (
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: theme?.hex || '#22d3ee', borderTopColor: 'transparent' }} />
          </div>
        ) : mode === 'CHAPTER' && isPlaying ? (
          <Square className="w-4 h-4 fill-current animate-pulse" />
        ) : (
          <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
        )}
        <span className="font-semibold">Read Chapter</span>
      </button>

      <div className="w-[1px] h-5 bg-white/10 mx-1" />

      {/* Voice Settings */}
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
