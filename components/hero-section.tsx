import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import React, { Suspense } from "react"
import { ChevronRight, Zap, Shield, Cpu } from "lucide-react"

const DroneViewer = dynamic(() => import("./drone-viewer").then(mod => mod.DroneViewer), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-primary/5 animate-pulse rounded-full" />
})

export function HeroSection() {
  const mouse = React.useRef<[number, number]>([0, 0])

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1
    mouse.current = [x, y]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
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
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-background text-foreground overflow-hidden flex items-center"
    >
      {/* Background radial effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/2 blur-[120px] rounded-full opacity-30" />
      </div>

      {/* Full Screen 3D Blended Background (Offset to Right) */}
      <div className="absolute inset-0 z-10">
        <div className="w-full h-full relative">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[70%] mt-20 lg:mt-0 h-[50vh] lg:h-full">
            <Suspense fallback={null}>
              <DroneViewer mouse={mouse} />
            </Suspense>
          </div>
          {/* Gradient Overlays to blend 3D into UI */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10" />
        </div>
      </div>

      {/* Brand Text Overlay (Positioned Left) */}
      <div className="relative z-20 container mx-auto px-6 sm:px-10 lg:px-24 pointer-events-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.h1 
            className="font-black tracking-[-0.02em] leading-[0.85] text-left flex flex-col font-oxanium"
          >
            <span className="inline-block overflow-hidden pb-4 text-4xl sm:text-7xl md:text-9xl lg:text-[10rem]">
              {"LAARA".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-1"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <span className="inline-block overflow-hidden py-2 relative whitespace-nowrap text-2xl sm:text-5xl md:text-7xl lg:text-[7rem]">
              {"INNOVATIONS".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + (i * 0.05),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(21,229,196,0.3)] px-1"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </motion.div>
      </div>

    </section>
  )
}

function Feature({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors shrink-0">
        {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5 text-primary" })}
      </div>
      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{label}</span>
    </div>
  )
}
