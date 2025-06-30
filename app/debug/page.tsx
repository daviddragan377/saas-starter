"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function DebugPage() {
  const [status, setStatus] = useState<any>({})
  const supabase = createClient()

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Test auth
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        // Test database connection
        const { data: profiles, error: dbError } = await supabase.from("user_profiles").select("*").limit(1)

        setStatus({
          auth: { user: !!user, error: authError?.message },
          database: { connected: !dbError, error: dbError?.message },
          env: {
            supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          },
        })
      } catch (error) {
        setStatus({ error: error.message })
      }
    }

    checkStatus()
  }, [supabase])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Status</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(status, null, 2)}</pre>
    </div>
  )
}
