"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { submitForm } from "@/app/actions/cms"

export function DynamicForm({ formBlock }: { formBlock: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const content = JSON.parse(formBlock.content)
  const fields = content.fields || []

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data: Record<string, string> = {}
    fields.forEach((field: any) => {
      data[field.label] = formData.get(field.id) as string
    })

    try {
      const result = await submitForm(formBlock.id, formBlock.title, data)
      if (result.error) {
        toast.error(result.error)
      } else {
        setIsSubmitted(true)
        toast.success("Response submitted successfully!")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 glass-card rounded-3xl border border-green-500/20"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4 text-green-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-400">Your information has been received.</p>
        <Button 
          variant="link" 
          onClick={() => setIsSubmitted(false)}
          className="text-primary mt-4"
        >
          Send another response
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8 rounded-3xl border border-white/10">
      <div className="space-y-2 mb-8">
        <h3 className="text-2xl font-bold text-white">{formBlock.title}</h3>
        <p className="text-sm text-gray-500">Please fill out the form below.</p>
      </div>

      <div className="space-y-4">
        {fields.map((field: any) => (
          <div key={field.id} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.id}
                required={field.required}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-primary outline-none min-h-[120px] transition-all"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            ) : (
              <input
                type={field.type}
                name={field.id}
                required={field.required}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-primary text-black font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
        {loading ? "Submitting..." : "Submit Response"}
      </Button>
    </form>
  )
}
