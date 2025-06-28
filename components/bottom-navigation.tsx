"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, MessageCircle, Volume2, Sparkles, Mountain } from "lucide-react"

const navItems = [
  { href: "/dreams", icon: Moon, label: "Dreams" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/sounds", icon: Volume2, label: "Sounds" },
  { href: "/mantras", icon: Sparkles, label: "Mantras" },
  { href: "/path", icon: Mountain, label: "Path" },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-stone-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                isActive ? "text-blue-700 bg-blue-50" : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
