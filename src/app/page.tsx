import Link from "next/link"
import { CyberCard, CyberButton, CyberBadge } from "@/components/ui/CyberComponents"
import { DESTINY_ACTIVITIES } from "@/lib/constants"
import { AstronautIcon } from "@/components/ui/icons"

export default function Home() {
  const activities = Object.values(DESTINY_ACTIVITIES)

  return (
    <div className="flex-1 w-full bg-black cyber-grid min-h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Cool background overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/80 to-black z-0" />
      
      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center relative z-10">

        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mb-16 mt-8">
          <div className="flex justify-center mb-6">
            <AstronautIcon className="w-24 h-24 text-neon-cyan animate-pulse drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-widest text-neon-cyan text-glow-cyan uppercase">
            Destiny 2 Sherpa
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-mono">
            Welcome Guardian. Your ultimate hub for comprehensive guides on Destiny 2 Dungeons and Raids.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            {activities.map((act) => (
              <CyberButton 
                key={`hero-btn-${act.id}`} 
                variant={act.locked ? "red" : "cyan"} 
                className="font-bold tracking-wide uppercase px-8 py-4 text-lg"
              >
                {act.locked ? (
                  <span className="cursor-not-allowed flex items-center gap-2 text-neon-red">
                    Explore {act.title} <CyberBadge variant="red" pulse>UPDATING</CyberBadge>
                  </span>
                ) : (
                  <Link href={act.href}>
                    Explore {act.title}
                  </Link>
                )}
              </CyberButton>
            ))}
          </div>
        </div>

        {/* Features / Quick Navigation Mapped */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
          {activities.map((category) => {
            const Icon = category.icon
            const isLocked = category.locked
            const theme = category.themeColor || "cyan"
            
            const themeStyles = {
              cyan: {
                iconBox: 'bg-neon-cyan/20',
                icon: 'text-neon-cyan',
                title: 'text-neon-cyan text-glow-cyan',
                arrow: 'text-neon-cyan'
              },
              green: {
                iconBox: 'bg-neon-green/20',
                icon: 'text-neon-green',
                title: 'text-neon-green text-glow-green',
                arrow: 'text-neon-green'
              },
              red: {
                iconBox: 'bg-neon-red/10',
                icon: 'text-neon-red opacity-80',
                title: 'text-neon-red text-glow-red',
                arrow: 'text-zinc-600'
              },
              orange: {
                iconBox: 'bg-neon-orange/20',
                icon: 'text-neon-orange',
                title: 'text-neon-orange text-glow-orange',
                arrow: 'text-neon-orange'
              },
              yellow: {
                iconBox: 'bg-neon-yellow/20',
                icon: 'text-neon-yellow',
                title: 'text-neon-yellow text-glow-yellow',
                arrow: 'text-neon-yellow'
              },
              zinc: {
                iconBox: 'bg-zinc-800/20',
                icon: 'text-zinc-400',
                title: 'text-zinc-400',
                arrow: 'text-zinc-400'
              }
            }

            const currentStyle = isLocked ? themeStyles.red : themeStyles[theme]

            return (
              <CyberCard key={category.id} variant={isLocked ? "red" : theme} withCorners className="flex flex-col h-full bg-black">
                <div className="flex items-center gap-3 mb-4 border-b border-zinc-800 pb-4">
                  <div className={`p-3 rounded-md ${currentStyle.iconBox}`}>
                    <Icon className={`w-8 h-8 ${currentStyle.icon}`} />
                  </div>
                  <h2 className={`text-2xl font-black uppercase tracking-widest flex items-center gap-3 ${currentStyle.title}`}>
                    {category.title}
                    {isLocked && <CyberBadge variant="red" pulse>UPDATING</CyberBadge>}
                  </h2>
                </div>
                <p className={`${isLocked ? 'text-neon-red/60' : 'text-zinc-400'} mb-6 flex-1 font-mono text-sm leading-relaxed`}>
                  {category.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {category.items.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className={`mt-1 text-xs ${currentStyle.arrow}`}>▶</span>
                      <span className={`text-sm ${isLocked ? 'text-zinc-500' : 'text-zinc-300'}`}>{item.title}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {isLocked ? (
                    <CyberButton variant="red" className="w-full justify-center cursor-not-allowed">
                      SYSTEM OFFLINE
                    </CyberButton>
                  ) : (
                    <Link href={category.href} className="w-full block">
                      <CyberButton variant={theme} className="w-full justify-center">
                        INITIALIZE {category.title.toUpperCase()}
                      </CyberButton>
                    </Link>
                  )}
                </div>
              </CyberCard>
            )
          })}
        </div>

      </main>
    </div>
  )
}