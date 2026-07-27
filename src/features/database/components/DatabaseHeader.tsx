import React from 'react';
import { Search } from 'lucide-react';

interface DatabaseHeaderProps {
  title: string;
  description: string;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  actions?: React.ReactNode;
}

export function DatabaseHeader({
  title,
  description,
  searchPlaceholder = "Tìm kiếm...",
  searchValue,
  onSearchChange,
  actions
}: DatabaseHeaderProps) {
  return (
    <div className="sticky top-0 md:top-14 z-20 pt-6 pb-4 pl-14 md:pl-0 bg-background/80 backdrop-blur-md border-b border-zinc-800/50">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-cyan animate-cyber-scan uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]">
            {title}
          </h1>
          <p className="text-zinc-400 mt-2 font-mono text-sm max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative group w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-neon-cyan transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-zinc-800 rounded-md leading-5 bg-zinc-900/50 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan sm:text-sm transition-all focus:bg-zinc-900"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Actions / Filters */}
          {actions && (
            <div className="flex gap-2 w-full sm:w-auto ml-0 sm:ml-auto">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
