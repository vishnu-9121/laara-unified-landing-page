import nextDynamic from "next/dynamic"
const Navigation = nextDynamic(() => import("@/components/navigation").then(mod => mod.Navigation), { ssr: true })
import { BlockRenderer } from "@/components/block-renderer"
import { VisionSection } from "@/components/vision-section"
import { EventsSection } from "@/components/events-section"
import { SegmentsSection } from "@/components/segments-section"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { getBlocks, getNavLinks, getSystemConfig } from "@/app/actions/cms"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [blocks, navLinks, config] = await Promise.all([
    getBlocks(),
    getNavLinks(),
    getSystemConfig()
  ])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation customLinks={navLinks} config={config} />
      {/* Render only Hero first if exists */}
      <BlockRenderer blocks={blocks.filter((b: any) => b.type === "HERO")} />
      
      <VisionSection />
      <EventsSection />
      
      {/* Render Segments then others (excluding contact) */}
      <BlockRenderer blocks={blocks.filter((b: any) => b.type === "FEATURE_CARDS")} />
      <BlockRenderer blocks={blocks.filter((b: any) => !["HERO", "FEATURE_CARDS", "CONTACT_FORM", "SYSTEM_CONFIG", "NAV_LINKS", "FOOTER_LINKS"].includes(b.type))} />
      
      {/* Explicitly render Contact Form above footer */}
      <section id="contact" className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black tracking-tighter text-white mb-4">Let's Build <span className="text-primary">Together</span></h2>
            <p className="text-gray-400">Have a project in mind? Reach out to our team.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer config={config} />
    </main>
  )
}
