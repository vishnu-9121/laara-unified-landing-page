"use client"

import { useEffect, useState, useRef } from "react"
import { useInView, motion, useSpring, useTransform } from "framer-motion"

export function AnimatedCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  })

  const displayValue = useTransform(spring, (current) => 
    Math.round(current).toLocaleString()
  )

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  )
}
