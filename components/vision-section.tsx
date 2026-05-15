"use client"

import { motion } from "framer-motion"

export function VisionSection() {
  return (
    <section className="relative py-20 border-t border-border/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black tracking-tighter text-foreground mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Our Vision</h2>
          <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-medium">
            <p><i>
              Our vision is to build a thriving ecosystem where cutting-edge technological innovation and human potential converge.
              We strive to push the boundaries of what is possible—from engineering future-facing hardware like drones and robotics
              to crafting tailored digital software solutions that elevate businesses.</i>
            </p>
            <p><i>
              But our ultimate goal extends beyond the products we build; it is about the minds we shape. By transforming traditional
              learning into an immersive, real-world incubator, we are dedicated to cultivating the next generation of engineers.
              We envision a future where our training academy bridges the gap between classroom theory and industry reality,
              empowering eager students to become the architects, developers, and innovators of tomorrow.</i>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
