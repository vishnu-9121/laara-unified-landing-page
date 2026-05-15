"use client"

import { motion } from "framer-motion"
import { Play, Clock, BookOpen, Users, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const courses = [
  {
    id: 1,
    title: "Drone Aerodynamics & Propeller Design",
    description: "Master the principles of lift, drag, and thrust. Design high-efficiency propellers using computational fluid dynamics.",
    lessons: 32,
    duration: "12 hours",
    students: "1.2k+",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800",
    category: "Engineering",
    color: "from-blue-600 to-cyan-500"
  },
  {
    id: 2,
    title: "Autonomous Navigation with AI",
    description: "Implement computer vision and pathfinding algorithms for fully autonomous drone operations.",
    lessons: 28,
    duration: "10 hours",
    students: "850+",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1527430295725-49952e1b0923?auto=format&fit=crop&q=80&w=800",
    category: "Software",
    color: "from-primary to-secondary"
  },
  {
    id: 3,
    title: "Full-Stack Software Architecture",
    description: "Learn to build scalable cloud infrastructures and real-time control dashboards for IoT devices.",
    lessons: 45,
    duration: "18 hours",
    students: "2.1k+",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    category: "Development",
    color: "from-purple-600 to-pink-500"
  },
  {
    id: 4,
    title: "Robotics & Embedded Systems",
    description: "Hands-on guide to Arduino, Raspberry Pi, and custom PCB design for next-gen hardware.",
    lessons: 24,
    duration: "8 hours",
    students: "600+",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    category: "Hardware",
    color: "from-orange-500 to-red-600"
  }
]

export function CourseCatalog() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleAccess = (courseId: number) => {
    if (!session) {
      router.push(`/login?callbackUrl=/edutech/course/${courseId}`)
    } else {
      router.push(`/edutech/course/${courseId}`)
    }
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Hero for Catalog */}
      <section className="relative py-20 px-4 overflow-hidden rounded-[3rem] bg-card border border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-6"
          >
            Master the Skills of <span className="text-primary">Tomorrow</span>
          </motion.h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Choose from our industry-leading certification programs in Drone Tech, 
            Software Engineering, and Robotics.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group glass-card rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 flex flex-col md:flex-row h-full"
          >
            <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-primary text-black text-[10px] font-bold uppercase tracking-widest">
                  {course.category}
                </span>
              </div>
            </div>

            <div className="flex-1 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-white">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">{course.description}</p>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    {course.lessons} Lessons
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleAccess(course.id)}
                className="w-full h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary hover:text-black transition-all group/btn flex items-center justify-between px-6"
              >
                <span className="font-bold">Start Learning</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
