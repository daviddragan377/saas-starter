import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-stone-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Page Not Found</h1>
        <p className="text-stone-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
