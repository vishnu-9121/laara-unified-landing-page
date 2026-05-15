"use client"

import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { DroneViewer } from "@/components/drone-viewer"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChevronRight, Zap, Shield, Cpu } from "lucide-react"

export default function DroneShowcasePage() {
  const mouse = useRef<[number, number]>([0, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouse.current = [x, y]
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any // Custom cubic-bezier for premium feel
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#020202] text-white overflow-hidden selection:bg-primary selection:text-black">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <Navigation />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen w-full">
        {/* Left Side: 3D Interaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-screen sticky top-0"
        >
          <DroneViewer mouse={mouse} />
        </motion.div>

        {/* Right Side: Typography & Brand */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-20 relative z-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Next Gen R&D</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-7xl lg:text-[10rem] font-black tracking-tighter mb-8 leading-[0.82] flex flex-col"
            >
              <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                Laara
              </span>
              <span className="bg-gradient-to-r from-cyan via-secondary to-accent bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(21,229,196,0.4)]">
                Innovations
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 leading-relaxed mb-12 font-medium"
            >
              Pushing the boundaries of aerial technology and autonomous systems.
              Our precision-engineered hardware meets state-of-the-art software
              to redefine what's possible in flight.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8 mb-12">
              <Feature icon={<Zap />} label="Lightning Fast" />
              <Feature icon={<Shield />} label="Ultra Secure" />
              <Feature icon={<Cpu />} label="AI Powered" />
              <Feature icon={<ChevronRight />} label="Scalable Tech" />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <button className="px-8 py-4 rounded-2xl bg-primary text-black font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center gap-3">
                Explore Projects
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                View Documentation
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function Feature({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5 text-primary" })}
      </div>
      <span className="text-sm font-bold text-gray-300 uppercase tracking-wide">{label}</span>
    </div>
  )
}
