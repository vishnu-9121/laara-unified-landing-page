"use client"

import { motion } from "framer-motion"
import { TrendingUp, Clock, Award, BookOpen } from "lucide-react"

const stats = [
  {
    label: "Overall Progress",
    value: "67%",
    icon: TrendingUp,
    change: "+12% this week",
    color: "text-primary",
  },
  {
    label: "Hours Learned",
    value: "48.5",
    icon: Clock,
    change: "5.2 hrs this week",
    color: "text-green-400",
  },
  {
    label: "Certificates",
    value: "3",
    icon: Award,
    change: "1 pending",
    color: "text-yellow-400",
  },
  {
    label: "Active Courses",
    value: "4",
    icon: BookOpen,
    change: "2 in progress",
    color: "text-blue-400",
  },
]

const courseProgress = [
  { name: "Drone Fundamentals", progress: 100, status: "completed" },
  { name: "Advanced Navigation", progress: 67, status: "in-progress" },
  { name: "AI & Machine Learning", progress: 34, status: "in-progress" },
  { name: "Software Architecture", progress: 12, status: "started" },
]

export function ProgressTracker() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-secondary`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Course Progress Bars */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Course Progress</h3>
        <div className="space-y-4">
          {courseProgress.map((course, index) => (
            <div key={course.name} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground">{course.name}</span>
                <span className={`text-sm font-medium ${
                  course.status === "completed" ? "text-green-400" : "text-primary"
                }`}>
                  {course.progress}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full transition-smooth group-hover:brightness-110 ${
                    course.status === "completed" ? "bg-green-500" : "bg-primary"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
