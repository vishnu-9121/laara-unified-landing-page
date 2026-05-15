"use client"

import React, { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Briefcase, Send, User, Phone, Mail, GraduationCap, Award, FileText } from "lucide-react"
import { submitApplication } from "@/app/actions/careers"
import { toast } from "sonner"

export default function CareersPage({ navLinks, config }: any) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    qualification: "",
    interestedRole: "",
    resumeUrl: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await submitApplication(formData)
      if (result.success) {
        toast.success("Application submitted successfully!")
        setFormData({ name: "", mobile: "", email: "", qualification: "", interestedRole: "", resumeUrl: "" })
      } else {
        toast.error(result.error || "Submission failed")
      }
    } catch (e) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation customLinks={navLinks} config={config} />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Content side */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Careers</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-glow">
              Join the <span className="text-primary">Future</span> of Tech
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're looking for passionate innovators, dreamers, and doers to help us build 
              the next generation of software, drone technology, and educational tools.
            </p>
            
            <div className="space-y-6 pt-8">
              <FeatureItem 
                icon={<Award className="w-5 h-5 text-secondary" />} 
                title="Innovation First" 
                desc="Work on cutting-edge R&D projects that push industry boundaries."
              />
              <FeatureItem 
                icon={<GraduationCap className="w-5 h-5 text-accent" />} 
                title="Growth Mindset" 
                desc="Continuous learning opportunities and mentorship from industry experts."
              />
            </div>
          </div>

          {/* Form side */}
          <div className="glass-card rounded-3xl p-8 border border-white/5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative space-y-6">
              <h2 className="text-2xl font-bold">Apply Now</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <CareerInput 
                  icon={<User />} label="Full Name" 
                  value={formData.name} onChange={(val) => setFormData({...formData, name: val})} 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CareerInput 
                    icon={<Phone />} label="Mobile Number" 
                    value={formData.mobile} onChange={(val) => setFormData({...formData, mobile: val})} 
                  />
                  <CareerInput 
                    icon={<Mail />} label="Email Address" 
                    value={formData.email} onChange={(val) => setFormData({...formData, email: val})} 
                  />
                </div>
                <CareerInput 
                  icon={<GraduationCap />} label="Qualification" 
                  value={formData.qualification} onChange={(val) => setFormData({...formData, qualification: val})} 
                />
                <CareerInput 
                  icon={<Briefcase />} label="Interested Role" 
                  value={formData.interestedRole} onChange={(val) => setFormData({...formData, interestedRole: val})} 
                />
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Upload Resume (PDF/DOC)</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <input 
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setFormData({...formData, resumeUrl: reader.result as string})
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-primary file:text-black hover:file:bg-primary/80"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-primary text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading ? "Submitting..." : (
                    <>
                      Submit Application
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer config={config} />
    </main>
  )
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 mt-1">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function CareerInput({ icon, label, value, onChange }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon && React.cloneElement(icon, { className: "w-4 h-4" })}
        </div>
        <input 
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
        />
      </div>
    </div>
  )
}
