import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Search, MessageCircle, FileText, LifeBuoy } from "lucide-react"

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
          <div className="max-w-xl mx-auto relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for articles, guides..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <HelpCategory 
            icon={<FileText />} 
            title="Documentation" 
            links={["Getting Started", "API Reference", "Integrations"]}
          />
          <HelpCategory 
            icon={<MessageCircle />} 
            title="Community" 
            links={["User Forum", "Discord Server", "Blog"]}
          />
          <HelpCategory 
            icon={<LifeBuoy />} 
            title="Direct Support" 
            links={["Submit a Ticket", "Live Chat", "Contact Us"]}
          />
        </div>

        <div className="glass-card rounded-3xl p-12 text-center border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-muted-foreground mb-8">Our support team is available 24/7 to assist you with any technical issues.</p>
          <button className="px-8 py-3 rounded-full bg-primary text-black font-bold hover:scale-105 transition-all">
            Contact Support
          </button>
        </div>
      </div>
      <Footer />
    </main>
  )
}

function HelpCategory({ icon, title, links }: { icon: React.ReactNode, title: string, links: string[] }) {
  return (
    <div className="p-8 rounded-2xl bg-card border border-border">
      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map(link => (
          <li key={link}>
            <a href="#" className="text-muted-foreground hover:text-primary transition-all text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
