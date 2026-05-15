"use client"

import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: "Starter",
    description: "Perfect for small projects and MVPs",
    price: "2,500",
    period: "project",
    features: [
      "UI/UX Design Mockups",
      "Up to 5 pages",
      "Responsive Design",
      "Basic SEO Setup",
      "2 Revision Rounds",
      "1 Week Delivery",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description: "Full-stack development for growing businesses",
    price: "8,500",
    period: "project",
    features: [
      "Everything in Starter",
      "Full-Stack Development",
      "Up to 15 pages/screens",
      "Database Integration",
      "Authentication System",
      "API Development",
      "4 Revision Rounds",
      "3 Week Delivery",
    ],
    cta: "Start Project",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large-scale applications",
    price: "Custom",
    period: "",
    features: [
      "Everything in Professional",
      "Unlimited Pages",
      "Custom Integrations",
      "Performance Optimization",
      "Security Audit",
      "DevOps & CI/CD Setup",
      "Dedicated Support",
      "SLA Guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

import Link from "next/link"

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {tiers.map((tier, index) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`relative rounded-2xl p-6 lg:p-8 ${
            tier.popular
              ? "bg-primary/10 border-2 border-primary glow-primary"
              : "bg-card border border-border"
          }`}
        >
          {/* Popular Badge */}
          {tier.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Most Popular
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-1">{tier.name}</h3>
            <p className="text-sm text-muted-foreground">{tier.description}</p>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            {tier.price === "Custom" ? (
              <span className="text-3xl font-bold text-foreground">Custom</span>
            ) : (
              <>
                <span className="text-sm text-muted-foreground">$</span>
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-sm text-muted-foreground">/{tier.period}</span>
              </>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${tier.popular ? "text-primary" : "text-green-400"}`} />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link href="/contact" className="block w-full">
            <Button
              className={`w-full ${
                tier.popular
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {tier.cta}
            </Button>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
