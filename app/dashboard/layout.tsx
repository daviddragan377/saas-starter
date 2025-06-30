import type React from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/login")
    }

    return (
      <div className="min-h-screen pb-20">
        {children}
        <BottomNavigation />
      </div>
    )
  } catch (error) {
    console.error("Dashboard layout error:", error)
    redirect("/login")
  }
}
