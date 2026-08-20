'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function TopNavLogo() {
  return (
    <div className="mr-8 hidden md:flex">
      <Link
        href="/"
        className="cyber-text-container group flex items-center gap-2"
      >
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-sm mix-blend-screen transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]">
          <Image
            src="/logo.ico"
            alt="D2 Sherpa Logo"
            width={40}
            height={40}
            className="h-full w-full object-contain"
            unoptimized
          />
        </div>
        <div className="relative flex items-center">
          <span className="cyber-text hidden sm:inline-block">D2 Sherpa</span>
        </div>
      </Link>
    </div>
  )
}
