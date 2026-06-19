import React from "react"

export function AstronautIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Astronaut Helmet Base */}
      <rect x="4" y="4" width="16" height="16" rx="6" ry="6" />
      {/* Helmet Visor */}
      <rect x="7" y="8" width="10" height="6" rx="3" ry="3" fill="currentColor" fillOpacity="0.2" />
      {/* Antenna */}
      <path d="M12 4v-2" />
      <circle cx="12" cy="2" r="1" />
      {/* Suit Collar details */}
      <path d="M8 20v2" />
      <path d="M16 20v2" />
      <path d="M4 14h-2" />
      <path d="M20 14h2" />
    </svg>
  )
}
