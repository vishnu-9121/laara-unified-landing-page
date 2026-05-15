import nextDynamic from "next/dynamic"
const Navigation = nextDynamic(() => import("@/components/navigation").then(mod => mod.Navigation), { ssr: true })
import { PortfolioGrid } from "@/components/portfolio-grid"
import { PricingCards } from "@/components/pricing-cards"
import { ContactForm } from "@/components/contact-form"
import { getNavLinks, getSystemConfig } from "@/app/actions/cms"

export const metadata = {
  title: "Software & Digital Solutions | NexaTech Labs",
  description: "Full-stack development, UI/UX design, and digital consultancy services for enterprise-grade applications.",
}

export default async function SoftwarePage() {
  const [navLinks, config] = await Promise.all([
    getNavLinks(),
    getSystemConfig()
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navigation customLinks={navLinks} config={config} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 circuit-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">Digital Solutions</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Build <span className="text-primary">Exceptional</span> Software
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
              From concept to deployment, we deliver enterprise-grade solutions 
              with cutting-edge technology and meticulous attention to detail.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore our portfolio of successful web and software projects
            </p>
          </div>
          <PortfolioGrid />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Services & Pricing
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Transparent pricing for all your digital needs
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Start Your Project
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tell us about your vision and we&apos;ll bring it to life
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
