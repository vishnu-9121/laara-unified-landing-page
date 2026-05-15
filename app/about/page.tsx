import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getNavLinks, getSystemConfig } from "@/app/actions/cms"
import { Target, Users, Zap, Globe } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"
import { OdometerCounter } from "@/components/odometer-counter"

export default async function AboutPage() {
  const [navLinks, config] = await Promise.all([
    getNavLinks(),
    getSystemConfig()
  ])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation customLinks={navLinks} config={config} />

      <div className="pt-32 pb-20">
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Our Company</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold mb-8 text-glow">
              About <span className="text-primary">Us</span>
            </h1>
            <h2 className="text-2xl font-bold mb-6 text-gray-300">Our Mission to Innovate</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              At Laara Innovations, we believe technology should be accessible, impactful,
              and visionary. We are a multidisciplinary team dedicated to solving complex
              problems through smart software and empowering education.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter value={3} suffix="+" />
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">
                  <OdometerCounter suffix="+" />
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">Global Clients</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/5 border-y border-white/5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AboutCard
              icon={<Target className="text-primary" />}
              title="Precision"
              desc="Meticulous attention to detail in every line of code and every drone flight."
            />
            <AboutCard
              icon={<Users className="text-secondary" />}
              title="Community"
              desc="Building platforms that connect and empower users worldwide."
            />
            <AboutCard
              icon={<Zap className="text-accent" />}
              title="Agility"
              desc="Adapting to the fast-paced tech landscape with rapid prototyping."
            />
            <AboutCard
              icon={<Globe className="text-primary" />}
              title="Vision"
              desc="Seeing beyond the immediate to build the infrastructure of tomorrow."
            />
          </div>
        </section>
      </div>

      <Footer config={config} />
    </main>
  )
}

function AboutCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-3xl glass border border-white/5 hover:border-primary/20 transition-all">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
