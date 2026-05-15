"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 border-t border-border/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">About</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Laara Innovations is a multi-disciplinary technology company at the forefront of 
              innovation across drone research, educational technology, and digital services. 
              Founded with a vision to bridge the gap between cutting-edge research and practical 
              applications, we deliver solutions that transform industries.
            </p>
            <p>
              Our team of engineers, researchers, and educators work collaboratively to push 
              boundaries and create meaningful impact. From advanced propeller designs to 
              immersive learning platforms, every project we undertake is driven by our 
              commitment to excellence and innovation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
