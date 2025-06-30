"use client"

import { useState, useRef, useEffect } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Coffee } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm here to support you on your wellness journey. How are you feeling today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [user, setUser] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim() || !user) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Save user message to database
    await supabase.from("chat_messages").insert({
      session_id: "default", // You might want to create proper sessions
      user_id: user.id,
      role: "user",
      content: inputValue,
    })

    // Simulate AI response
    setTimeout(async () => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I hear you, and I want you to know that your feelings are valid. It's natural to experience ups and downs on your healing journey. What would feel most supportive for you right now?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])

      // Save AI response to database
      await supabase.from("chat_messages").insert({
        session_id: "default",
        user_id: user.id,
        role: "assistant",
        content: aiResponse.content,
      })

      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-stone-50 flex flex-col">
      <PageHeader title="Wellness Chat" subtitle="Your compassionate AI companion" />

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <Card
                className={`max-w-[80%] p-4 ${
                  message.role === "user" ? "bg-blue-600 text-white border-0" : "bg-white wellness-shadow border-0"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                      <Coffee className="w-3 h-3 text-amber-600" />
                    </div>
                    <span className="text-xs text-stone-500">AI Therapist</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className={`text-xs mt-2 block ${message.role === "user" ? "text-blue-100" : "text-stone-400"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </Card>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <Card className="bg-white wellness-shadow border-0 p-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                    <Coffee className="w-3 h-3 text-amber-600" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-stone-200">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Share what's on your mind..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border-stone-200 focus:border-amber-300 focus:ring-amber-200"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isTyping || !user}
            className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
