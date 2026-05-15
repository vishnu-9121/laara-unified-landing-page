"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GraduationCap, FlaskConical, Code2, ArrowRight, Drone } from "lucide-react"

const segments = [
  {
    id: "research ",
    title: "Research Programs",
    description: "Advanced R&D initiatives in propeller aerodynamics, materials science, and autonomous systems.",
    icon: Drone,
    href: "/drone-rd",
    color: "accent",
  },
  {
    id: "Digital Services",
    title: "Digital Services",
    description: "Full-stack development, Google Maps Optimization, CRM Development and SaaS solutions for businesses.",
    icon: Code2,
    href: "/software",
    color: "tertiary",
  },
  {
    id: "Hands on Training Programs",
    title: "Hands on Training Programs",
    description: "Practical workshops and certification courses in drone technology, programming, and emerging tech skills.",
    icon: GraduationCap,
    href: "/edutech",
    color: "primary",
  },


]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function SegmentsSection() {
  return (
    <section className="relative py-20 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black tracking-tighter text-foreground mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Our Segments</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {segments.map((segment) => (
            <motion.div key={segment.id} variants={itemVariants}>
              <Link href={segment.href} className="group block h-full">
                <div className="relative h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${segment.color === "primary" ? "bg-primary/10 text-primary" :
                    segment.color === "accent" ? "bg-accent/10 text-accent" :
                      "bg-tertiary/10 text-tertiary"
                    }`}>
                    <segment.icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {segment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {segment.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
