import type React from "react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen pb-20">
      {children}
      <BottomNavigation />
    </div>
  )
}
