"use client"

import { HeroSection } from "@/components/hero-section"
import { SegmentsSection } from "@/components/segments-section"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { ContactSection } from "@/components/contact-section"

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No content blocks published. Access Admin to build your page.
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {blocks.map((block) => {
        const content = JSON.parse(block.content)
        
        switch (block.type) {
          case "HERO":
            return <HeroSection key={block.id} {...content} />
          case "FEATURE_CARDS":
            return <SegmentsSection key={block.id} {...content} />
          case "PORTFOLIO_GRID":
            return <PortfolioGrid key={block.id} {...content} />
          case "CONTACT_FORM":
            return <ContactSection key={block.id} {...content} />
          case "SYSTEM_CONFIG":
          case "NAV_LINKS":
          case "FOOTER_LINKS":
            return null
          default:
            return <div key={block.id} className="py-20 text-center border border-dashed border-white/5">Unknown Block Type: {block.type}</div>
        }
      })}
    </div>
  )
}
