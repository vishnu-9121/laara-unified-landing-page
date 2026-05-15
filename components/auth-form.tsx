"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, User, Loader2, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { signUp, login } from "@/app/actions/auth"

export function AuthForm({ type }: { type: "login" | "signup" }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    occupation: "" 
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (type === "signup") {
        const result = await signUp(formData)
        if (result.error) {
          toast.error(result.error)
        } else {
          toast.success("Account created successfully!")
          router.push(`/login${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`)
        }
      } else {
        const result = await login(formData, callbackUrl)
        if (result?.error) {
          toast.error(result.error)
        }
        // No success toast here because the redirect will happen
      }
    } catch (error: any) {
      // If it's a redirect error (next-auth/next/navigation), don't show toast
      if (error.message === "NEXT_REDIRECT") {
        throw error
      }
      console.error("Auth error:", error)
      toast.error("Authentication failed. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-8 glass-card rounded-3xl relative overflow-hidden">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white text-glow">
          {type === "login" ? "Sign In" : "Register"}
        </h1>
        <p className="text-gray-400 text-sm">
          {type === "login" 
            ? "Enter your credentials to access your dashboard." 
            : "Create your account to join Laara Innovations."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "signup" && (
          <>
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Full Name"
                  className="pl-10 bg-white/5 border-white/10 text-white focus:border-primary"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Occupation (e.g. Student, Researcher)"
                  className="pl-10 bg-white/5 border-white/10 text-white focus:border-primary"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  required
                />
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="email"
              placeholder="Email address"
              className="pl-10 bg-white/5 border-white/10 text-white focus:border-primary"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 bg-white/5 border-white/10 text-white focus:border-primary"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-black font-bold py-6 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (type === "login" ? "Sign In" : "Register")}
        </Button>
      </form>

      <div className="text-center text-sm text-gray-500">
        {type === "login" ? (
          <p>Don't have an account? <a href="/signup" className="text-primary hover:underline transition-all">Sign Up</a></p>
        ) : (
          <p>Already have an account? <a href="/login" className="text-primary hover:underline transition-all">Log In</a></p>
        )}
      </div>
    </div>
  )
}
