import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getNavLinks, getSystemConfig } from "@/app/actions/cms"
import { NotFoundUI } from "@/components/not-found-ui"

export default async function NotFound() {
  const [navLinks, config] = await Promise.all([
    getNavLinks(),
    getSystemConfig()
  ])

  return (
    <main className="min-h-screen bg-[#020202] text-white overflow-hidden relative">
      <Navigation customLinks={navLinks} config={config} />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
      </div>

      <NotFoundUI />

      <Footer config={config} />
    </main>
  )
}
