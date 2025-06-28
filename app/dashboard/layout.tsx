import type React from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { redirect } from "next/navigation"

// This would check authentication in a real app
async function checkAuth() {
  // Simulate auth check - replace with actual auth logic
  const isAuthenticated = true // This should check actual auth state
  if (!isAuthenticated) {
    redirect("/login")
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await checkAuth()

  return (
    <div className="min-h-screen pb-20">
      {children}
      <BottomNavigation />
    </div>
  )
}
