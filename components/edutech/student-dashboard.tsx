"use client"

import { motion } from "framer-motion"
import { Play, Clock, BookOpen, Users, Trophy, Target, Sparkles, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { VideoPlayer } from "@/components/video-player"
import { ProgressTracker } from "@/components/progress-tracker"
import { AssignmentsTable } from "@/components/assignments-table"
import { CourseCards } from "@/components/course-cards"

export function StudentDashboard() {
  const { data: session } = useSession()

  return (
    <div className="p-6 lg:p-12 space-y-12">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tighter text-white mb-2"
          >
            Welcome Back, {session?.user?.name?.split(' ')[0] || "Student"} <span className="inline-block animate-bounce ml-2 text-3xl">👋</span>
          </motion.h1>
          <p className="text-gray-500 font-medium">You have 2 lessons to complete today to stay on track.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Daily Streak</p>
              <p className="text-sm font-black text-white">12 Days</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">XP Earned</p>
              <p className="text-sm font-black text-white">2,450</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="xl:col-span-2 space-y-12">
          {/* Continue Watching */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">Continue Watching</h2>
              </div>
              <Button variant="ghost" className="text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold">
                See History
              </Button>
            </div>
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 relative">
              <VideoPlayer />
            </div>
          </section>

          {/* Assignments Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">Assignments</h2>
              </div>
            </div>
            <div className="glass-card rounded-[2rem] p-6 border border-white/5">
              <AssignmentsTable />
            </div>
          </section>
        </div>

        {/* Right Column - Stats & Sidebar content */}
        <div className="space-y-8">
          {/* Progress Overview */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">My Progress</h2>
            </div>
            <div className="glass-card rounded-[2rem] p-8 border border-white/5">
              <ProgressTracker />
            </div>
          </section>

          {/* Enrolled Courses */}
          <section className="space-y-6">
             <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">My Courses</h2>
            </div>
            <div className="space-y-4">
              <CourseCards />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
