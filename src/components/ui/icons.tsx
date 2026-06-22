import React from "react"

export function GhostIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Ghost Core Eye */}
      <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      
      {/* Top Shell */}
      <path d="M12 2 L15.5 8.5 L8.5 8.5 Z" />
      
      {/* Bottom Shell */}
      <path d="M12 22 L15.5 15.5 L8.5 15.5 Z" />
      
      {/* Right Shell */}
      <path d="M22 12 L15.5 8.5 L15.5 15.5 Z" />
      
      {/* Left Shell */}
      <path d="M2 12 L8.5 8.5 L8.5 15.5 Z" />
    </svg>
  )
}
