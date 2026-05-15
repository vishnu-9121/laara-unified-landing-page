import nextDynamic from "next/dynamic"
const Navigation = nextDynamic(() => import("@/components/navigation").then(mod => mod.Navigation), { ssr: true })
import { DroneShowcase } from "@/components/drone-showcase"
import { ResearchRepository } from "@/components/research-repository"
import { ProjectTimeline } from "@/components/project-timeline"
import { getNavLinks, getSystemConfig } from "@/app/actions/cms"

export const metadata = {
  title: "Drone Propeller R&D | NexaTech Labs",
  description: "Advanced drone propeller research and development. Explore our cutting-edge designs, technical specifications, and project milestones.",
}

export default async function DroneRDPage() {
  const [navLinks, config] = await Promise.all([
    getNavLinks(),
    getSystemConfig()
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navigation customLinks={navLinks} config={config} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">R&D Division</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
              Propeller <span className="text-primary">Innovation</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground text-pretty">
              Pushing the boundaries of drone propulsion through computational design, 
              advanced materials science, and rigorous aerodynamic testing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - 2 Column Layout */}
      <section id="research" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - 3D Visualization Area */}
            <DroneShowcase />
            
            {/* Right Column - Research Repository */}
            <ResearchRepository />
          </div>
        </div>
      </section>

      {/* Project Milestones Timeline */}
      <section id="milestones" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Project Milestones
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Track our research progress from concept to prototype
            </p>
          </div>
          <ProjectTimeline />
        </div>
      </section>
    </main>
  )
}
