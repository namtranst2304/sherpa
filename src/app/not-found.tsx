import React from 'react';
import Link from 'next/link';
import { Terminal, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black cyber-grid flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-neon-red/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        {/* Animated Warning Icon */}
        <div className="relative group">
          <AlertTriangle className="w-24 h-24 md:w-32 md:h-32 text-neon-red animate-pulse drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" strokeWidth={1.5} />
          <div className="absolute inset-0 flex items-center justify-center pt-2">
            <span className="text-neon-red font-black text-2xl md:text-3xl animate-pulse">!</span>
          </div>
        </div>

        {/* Glitchy 404 Text */}
        <div className="relative">
          <h1 className="text-7xl md:text-[10rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-neon-red to-black tracking-tighter text-glow-red select-none">
            404
          </h1>
          <div className="absolute inset-0 text-7xl md:text-[10rem] leading-none font-black text-neon-red opacity-30 blur-[2px] -translate-x-1 translate-y-1">404</div>
          <div className="absolute inset-0 text-7xl md:text-[10rem] leading-none font-black text-neon-cyan opacity-30 blur-[2px] translate-x-1 -translate-y-1">404</div>
        </div>
        
        {/* System Error Console */}
        <div className="flex items-center gap-3 text-neon-red font-mono bg-neon-red/10 px-6 py-3 border border-neon-red/50 shadow-neon-red">
          <Terminal className="w-5 h-5" />
          <span className="uppercase tracking-[0.2em] text-xs md:text-sm font-bold">System Error: Sector Not Found</span>
        </div>

        {/* Lore Description */}
        <p className="text-zinc-400 font-mono text-xs md:text-sm max-w-lg mt-4 tracking-wider leading-relaxed bg-black/50 p-4 border-l-2 border-zinc-800">
          <span className="text-neon-yellow">{"// WARNING:"}</span> The requested coordinate does not exist in the current timeline. 
          Ghost is unable to establish a connection to this zone. Recommend immediate extraction.
        </p>

        {/* Action Button */}
        <Link 
          href="/"
          className="mt-8 px-10 py-4 border border-neon-cyan text-neon-cyan font-bold uppercase tracking-[0.3em] text-xs md:text-sm hover:bg-neon-cyan/10 hover:text-white hover:border-white shadow-neon-cyan hover:shadow-neon-cyan-hover transition-all duration-300 relative group overflow-hidden flex items-center gap-3"
        >
          {/* Scanline effect on hover */}
          <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent group-hover:animate-[cyber-fade_1s_ease-in-out_infinite]" />
          
          <div className="w-2 h-2 bg-neon-cyan rounded-full group-hover:bg-white transition-colors" />
          <span className="relative z-10 pt-[2px]">RETURN TO ORBIT</span>
        </Link>
      </div>
    </div>
  );
}
