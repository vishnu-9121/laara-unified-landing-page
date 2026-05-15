import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Settings, User, Bell, Shield, Palette } from "lucide-react"

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-glow">Settings</h1>
        
        <div className="space-y-6">
          <SettingsSection 
            icon={<User />} 
            title="Profile Information" 
            description="Manage your account details and public profile."
          />
          <SettingsSection 
            icon={<Bell />} 
            title="Notifications" 
            description="Configure how you receive alerts and updates."
          />
          <SettingsSection 
            icon={<Shield />} 
            title="Security" 
            description="Update your password and security preferences."
          />
          <SettingsSection 
            icon={<Palette />} 
            title="Appearance" 
            description="Customize the look and feel of your dashboard."
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}

function SettingsSection({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all flex items-start gap-6">
      <div className="p-3 rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all">
        Edit
      </button>
    </div>
  )
}
