"use client"

import { motion } from "framer-motion"
import { Play, Clock, BookOpen, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const courses = [
  {
    id: 1,
    title: "Drone Fundamentals",
    description: "Complete introduction to drone technology and flight principles",
    progress: 100,
    lessons: 24,
    duration: "8 hours",
    students: 1240,
    thumbnail: "from-blue-600 to-cyan-500",
    completed: true,
  },
  {
    id: 2,
    title: "Advanced Navigation Systems",
    description: "GPS waypoint navigation and autonomous flight paths",
    progress: 67,
    lessons: 18,
    duration: "6 hours",
    students: 856,
    thumbnail: "from-primary to-cyan-400",
    completed: false,
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    description: "Implement ML models for real-time object detection",
    progress: 34,
    lessons: 32,
    duration: "12 hours",
    students: 2100,
    thumbnail: "from-violet-600 to-primary",
    completed: false,
  },
  {
    id: 4,
    title: "Software Architecture",
    description: "Design scalable systems for drone control software",
    progress: 12,
    lessons: 28,
    duration: "10 hours",
    students: 654,
    thumbnail: "from-emerald-600 to-teal-500",
    completed: false,
  },
]

export function CourseCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-smooth"
        >
          {/* Thumbnail */}
          <div className={`relative h-32 bg-gradient-to-br ${course.thumbnail}`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
              <Button size="icon" className="h-12 w-12 rounded-full bg-white/90 text-slate-900 hover:bg-white">
                <Play className="h-5 w-5 ml-0.5" />
              </Button>
            </div>
            {course.completed && (
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-green-500/90 text-xs font-medium text-white">
                Completed
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
              {course.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {course.description}
            </p>

            {/* Progress */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className={`font-medium ${course.completed ? "text-green-400" : "text-primary"}`}>
                  {course.progress}%
                </span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-smooth group-hover:brightness-110 ${
                    course.completed ? "bg-green-500" : "bg-primary"
                  }`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                <span>{course.lessons}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{course.students}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
