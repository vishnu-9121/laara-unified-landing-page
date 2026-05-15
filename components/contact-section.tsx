"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

import apiClient from "@/lib/api-client"
import { toast } from "sonner"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiClient.post("/contact", {
        ...formData,
        subject: `Message from ${formData.name} via Contact Section`,
      })
      toast.success("Message sent successfully!")
      setFormData({ name: "", mobile: "", email: "", message: "" })
    } catch (error: any) {
      toast.error(error.message || "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="relative py-20 border-t border-border/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-10 text-center">Contact us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-40 h-40"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logofinal1.png-r71MeNA0JTGhtlTkfaz9Rj1wKEwOp7.jpeg"
                  alt="Laara Innovations"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-card border-border focus:border-primary"
                  required
                />
                <Input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="bg-card border-border focus:border-primary"
                  required
                />
              </div>
              
              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="bg-card border-border focus:border-primary"
                required
              />
              
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                required
              />
              
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                {loading ? "Sending..." : (
                  <>
                    <Send className="w-4 h-4" />
                    Send msg
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
