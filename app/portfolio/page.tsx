import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { getNavLinks, getSystemConfig } from "@/app/actions/cms"

export default async function PortfolioPage() {
  const [navLinks, config] = await Promise.all([
    getNavLinks(),
    getSystemConfig()
  ])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation customLinks={navLinks} config={config} />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Project Portfolio</h1>
          <p className="text-muted-foreground">A showcase of our innovation across different domains.</p>
        </div>
        <PortfolioGrid />
      </div>
      <Footer config={config} />
    </main>
  )
}
