import { AuthForm } from "@/components/auth-form"
import { Navigation } from "@/components/navigation"
import { Suspense } from "react"

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Navigation />
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <AuthForm type="signup" />
      </Suspense>
    </main>
  )
}
