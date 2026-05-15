"use client"

import { motion } from "framer-motion"

export function OdometerCounter({ suffix = "" }: { value?: number, suffix?: string }) {
  // Define a continuous animation for each digit column
  const digitVariants = {
    animate: {
      y: ["0%", "-90%"], // Scroll from 0 to 9
      transition: {
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        },
      },
    },
  }

  // Create columns with different speeds for a more dynamic feel
  const columns = [
    { id: 0, duration: 1.5 },
    { id: 1, duration: 0.8 },
    { id: 2, duration: 2.2 },
  ]

  return (
    <div className="flex items-center overflow-hidden font-mono h-[1.2em]">
      {columns.map((col) => (
        <div key={col.id} className="relative w-[0.65em]">
          <motion.div
            animate={{
              y: ["0%", "-90%"],
            }}
            transition={{
              duration: col.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-col"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <span key={n} className="flex justify-center h-[1.2em]">
                {n}
              </span>
            ))}
          </motion.div>
        </div>
      ))}
      <span className="ml-1 font-sans">{suffix}</span>
    </div>
  )
}
