import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { getNavLinks, getSystemConfig } from "@/app/actions/cms"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default async function ContactPage() {
  const [navLinks, config] = await Promise.all([
    getNavLinks(),
    getSystemConfig()
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navigation customLinks={navLinks} config={config} />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Contact Us</span>
            </div>
            <h1 className="text-5xl font-bold mb-8 text-glow">Let&apos;s Build <span className="text-primary">Together</span></h1>
            <p className="text-xl text-muted-foreground mb-12">
              Have a project in mind or just want to say hi? Reach out to our team 
              and we&apos;ll get back to you as soon as possible.
            </p>
            
            <div className="space-y-8">
              <ContactInfoItem 
                icon={<Mail className="text-primary" />} 
                title="Email Us" 
                detail="laarainnovations26@gmail.com" 
              />
              <ContactInfoItem 
                icon={<Phone className="text-secondary" />} 
                title="Call Us" 
                detail="+91 9010906126" 
              />
              <ContactInfoItem 
                icon={<MapPin className="text-accent" />} 
                title="Visit Us" 
                detail="Vijayawada, near Amaravathi, Andhra Pradesh, 521101" 
              />
            </div>
          </div>
          
          <div className="glass-card rounded-3xl p-8 border border-white/5 bg-card/50">
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer config={config} />
    </main>
  )
}

function ContactInfoItem({ icon, title, detail }: any) {
  return (
    <div className="flex gap-6 items-center">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{title}</h4>
        <p className="text-lg font-medium text-white">{detail}</p>
      </div>
    </div>
  )
}
