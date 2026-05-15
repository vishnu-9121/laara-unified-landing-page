"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Search, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotFoundUI() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {/* Glitch Effect Number */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative group mb-8"
      >
        <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none select-none">
          <span className="bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">4</span>
          <motion.span 
            animate={{ 
              rotate: [12, 15, 12],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-primary inline-block transform rotate-12 mx-[-2rem] md:mx-[-4rem]"
          >
            0
          </motion.span>
          <span className="bg-gradient-to-t from-white to-white/20 bg-clip-text text-transparent">4</span>
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <Compass className="w-24 h-24 md:w-32 md:h-32 text-primary/10 animate-[spin_10s_linear_infinite]" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Lost in <span className="text-primary">Innovation?</span></h2>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-lg mx-auto">
            The page you are looking for has drifted off the radar or moved to a new set of coordinates.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/">
            <Button size="lg" className="h-14 px-8 rounded-2xl bg-primary text-black font-black hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 group">
              <Home className="w-5 h-5 mr-2" />
              Back to Mission Control
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 transition-all text-white font-bold group">
              <Search className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
              Report a Disruption
            </Button>
          </Link>
        </motion.div>

        {/* Shortcut Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-12 border-t border-white/5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">Popular Destinations</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {["Drone R&D", "Software", "Portfolio", "Edutech"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase().replace(" ", "-").replace("&", "rd")}`}
                className="text-sm font-bold text-gray-400 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
