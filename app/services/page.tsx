import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            title="Software Development" 
            description="Custom enterprise solutions built with modern technologies."
          />
          <ServiceCard 
            title="Drone R&D" 
            description="Cutting-edge propeller design and aerodynamic research."
          />
          <ServiceCard 
            title="Edutech Platform" 
            description="Empowering the next generation with digital learning tools."
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}

function ServiceCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
