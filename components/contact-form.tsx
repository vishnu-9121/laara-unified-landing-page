"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createLead } from "@/app/actions/leads"

const projectTypes = [
  "Web Application",
  "Mobile App",
  "E-Commerce",
  "SaaS Platform",
  "Other",
]

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
]

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
    }

    try {
      const result = await createLead(data)
      if (result.error) {
        toast.error(result.error)
      } else {
        setIsSubmitted(true)
        toast.success("Inquiry received! We'll reach out soon.")
        formRef.current?.reset()
        setTimeout(() => setIsSubmitted(false), 5000)
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl bg-card border border-border p-6 lg:p-8"
    >
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Message Sent!
          </h3>
          <p className="text-muted-foreground">
            We&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                className="peer w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
                placeholder="Your Name"
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
              <label
                htmlFor="name"
                className={`absolute left-4 transition-all duration-200 pointer-events-none
                  ${focusedField === "name" || false
                    ? "-top-2.5 text-xs bg-card px-1 text-primary"
                    : "top-3 text-sm text-muted-foreground"
                  }
                  peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-card peer-focus:px-1 peer-focus:text-primary
                  peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:px-1
                `}
              >
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="peer w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
                placeholder="Email Address"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-200 pointer-events-none
                  peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-card peer-focus:px-1 peer-focus:text-primary
                  peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:px-1
                  ${focusedField === "email"
                    ? "-top-2.5 text-xs bg-card px-1 text-primary"
                    : "top-3 text-sm text-muted-foreground"
                  }
                `}
              >
                Email Address
              </label>
            </div>
          </div>

          {/* Company */}
          <div className="relative">
            <input
              type="text"
              id="company"
              name="company"
              className="peer w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth"
              placeholder="Company Name"
              onFocus={() => setFocusedField("company")}
              onBlur={() => setFocusedField(null)}
            />
            <label
              htmlFor="company"
              className={`absolute left-4 transition-all duration-200 pointer-events-none
                peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-card peer-focus:px-1 peer-focus:text-primary
                peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:px-1
                ${focusedField === "company"
                  ? "-top-2.5 text-xs bg-card px-1 text-primary"
                  : "top-3 text-sm text-muted-foreground"
                }
              `}
            >
              Company Name (Optional)
            </label>
          </div>


          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={10}
              required
              className="peer w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-smooth resize-none"
              placeholder="Project Details"
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
            />
            <label
              htmlFor="message"
              className={`absolute left-4 transition-all duration-200 pointer-events-none
                peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-card peer-focus:px-1 peer-focus:text-primary
                peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-card peer-[:not(:placeholder-shown)]:px-1
                ${focusedField === "message"
                  ? "-top-2.5 text-xs bg-card px-1 text-primary"
                  : "top-3 text-sm text-muted-foreground"
                }
              `}
            >
              your message
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {loading ? "Sending..." : "Send Message"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to our privacy policy. We&apos;ll never share your data.
          </p>
        </form>
      )}
    </motion.div>
  )
}
