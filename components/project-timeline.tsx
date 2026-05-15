"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react"

const milestones = [
  {
    id: 1,
    title: "Concept Development",
    description: "Initial design parameters and theoretical framework",
    status: "completed",
    date: "Q1 2024",
  },
  {
    id: 2,
    title: "Computational Modeling",
    description: "CFD simulations and aerodynamic analysis",
    status: "completed",
    date: "Q2 2024",
  },
  {
    id: 3,
    title: "Material Selection",
    description: "Testing composite materials for optimal performance",
    status: "completed",
    date: "Q3 2024",
  },
  {
    id: 4,
    title: "Prototype Manufacturing",
    description: "First physical prototypes in production",
    status: "in-progress",
    date: "Q4 2024",
  },
  {
    id: 5,
    title: "Wind Tunnel Testing",
    description: "Real-world aerodynamic validation",
    status: "upcoming",
    date: "Q1 2025",
  },
  {
    id: 6,
    title: "Field Trials",
    description: "Live drone testing and performance optimization",
    status: "upcoming",
    date: "Q2 2025",
  },
]

export function ProjectTimeline() {
  return (
    <div className="relative">
      {/* Horizontal scroll container */}
      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-4 min-w-max px-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex-shrink-0 w-64"
            >
              {/* Connector line */}
              {index < milestones.length - 1 && (
                <div className="absolute top-6 left-[calc(100%+8px)] w-4 h-0.5 bg-border">
                  <ArrowRight className="absolute -right-2 -top-1.5 h-4 w-4 text-border" />
                </div>
              )}

              {/* Card */}
              <div
                className={`relative p-5 rounded-xl border transition-smooth ${
                  milestone.status === "in-progress"
                    ? "bg-primary/10 border-primary glow-primary"
                    : milestone.status === "completed"
                    ? "bg-card border-border"
                    : "bg-card/50 border-border/50"
                }`}
              >
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      milestone.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : milestone.status === "in-progress"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.date}
                  </span>
                  {milestone.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : milestone.status === "in-progress" ? (
                    <Clock className="h-5 w-5 text-primary animate-pulse" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <h4
                  className={`text-sm font-semibold mb-2 ${
                    milestone.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {milestone.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>

                {/* Progress bar for in-progress */}
                {milestone.status === "in-progress" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary font-medium">67%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "67%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  )
}
