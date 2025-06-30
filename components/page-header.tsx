"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-stone-200">
      <div>
        <h1 className="text-xl font-semibold text-stone-800">{title}</h1>
        {subtitle && <p className="text-sm text-stone-600 mt-1">{subtitle}</p>}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account">Account Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/billing">Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/onboarding">Retake Quiz</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
