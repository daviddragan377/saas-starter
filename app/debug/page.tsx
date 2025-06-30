"use client"

import { useEffect, useState } from "react"

// Force dynamic rendering
export const dynamic = "force-dynamic"

export default function DebugPage() {
  const [status, setStatus] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Only import and use Supabase on the client side
        const { createClient } = await import("@/lib/supabase/client")
        const supabase = createClient()

        // Test auth
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        console.log("Auth test:", { user: !!user, error: authError })

        // Test database connection with different queries
        const tests = {
          userProfiles: await supabase.from("user_profiles").select("*").limit(1),
          journeyMilestones: await supabase.from("journey_milestones").select("*").limit(1),
          dreamEntries: await supabase.from("dream_entries").select("*").limit(1),
          chatSessions: await supabase.from("chat_sessions").select("*").limit(1),
        }

        console.log("Database tests:", tests)

        // Try to insert a test record if user exists
        let insertTest = null
        if (user) {
          insertTest = await supabase
            .from("user_profiles")
            .upsert({
              user_id: user.id,
              personality_traits: '["debug_test"]',
              traumas_insecurities: '["debug_test"]',
              goals: '["debug_test"]',
            })
            .select()
        }

        console.log("Insert test:", insertTest)

        setStatus({
          auth: {
            user: !!user,
            userId: user?.id,
            error: authError?.message,
          },
          database: {
            userProfiles: {
              success: !tests.userProfiles.error,
              error: tests.userProfiles.error?.message,
              count: tests.userProfiles.data?.length || 0,
            },
            journeyMilestones: {
              success: !tests.journeyMilestones.error,
              error: tests.journeyMilestones.error?.message,
              count: tests.journeyMilestones.data?.length || 0,
            },
            dreamEntries: {
              success: !tests.dreamEntries.error,
              error: tests.dreamEntries.error?.message,
              count: tests.dreamEntries.data?.length || 0,
            },
            chatSessions: {
              success: !tests.chatSessions.error,
              error: tests.chatSessions.error?.message,
              count: tests.chatSessions.data?.length || 0,
            },
          },
          insertTest: {
            success: !insertTest?.error,
            error: insertTest?.error?.message,
            data: insertTest?.data,
          },
          env: {
            supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            actualUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
          },
        })
      } catch (error: any) {
        console.error("Debug error:", error)
        setStatus({ error: error.message })
      } finally {
        setLoading(false)
      }
    }

    checkStatus()
  }, [])

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Debug Status</h1>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Status</h1>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Full Status:</h2>
          <pre className="text-xs overflow-auto">{JSON.stringify(status, null, 2)}</pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-bold">Authentication</h3>
            <p>User: {status.auth?.user ? "✅ Authenticated" : "❌ Not authenticated"}</p>
            <p>User ID: {status.auth?.userId || "None"}</p>
            {status.auth?.error && <p className="text-red-600">Error: {status.auth.error}</p>}
          </div>

          <div className="bg-green-50 p-4 rounded">
            <h3 className="font-bold">Database Tables</h3>
            <p>User Profiles: {status.database?.userProfiles?.success ? "✅" : "❌"}</p>
            <p>Journey Milestones: {status.database?.journeyMilestones?.success ? "✅" : "❌"}</p>
            <p>Dream Entries: {status.database?.dreamEntries?.success ? "✅" : "❌"}</p>
            <p>Chat Sessions: {status.database?.chatSessions?.success ? "✅" : "❌"}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded">
            <h3 className="font-bold">Insert Test</h3>
            <p>Success: {status.insertTest?.success ? "✅" : "❌"}</p>
            {status.insertTest?.error && <p className="text-red-600">Error: {status.insertTest.error}</p>}
          </div>

          <div className="bg-purple-50 p-4 rounded">
            <h3 className="font-bold">Environment</h3>
            <p>Supabase URL: {status.env?.supabaseUrl ? "✅" : "❌"}</p>
            <p>Supabase Key: {status.env?.supabaseKey ? "✅" : "❌"}</p>
            <p className="text-xs">URL: {status.env?.actualUrl}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
