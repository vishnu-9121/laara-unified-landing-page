"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(1247) // 20:47 in seconds
  const totalTime = 3600 // 60:00

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (currentTime / totalTime) * 100

  return (
    <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
      {/* Video Area */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Placeholder content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-primary ml-1" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Advanced Drone Navigation Systems
            </h3>
            <p className="text-sm text-muted-foreground">Module 3: Autonomous Flight Paths</p>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="mb-4 group cursor-pointer">
            <div className="relative h-1 bg-white/20 rounded-full overflow-hidden group-hover:h-1.5 transition-all">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="progress"
              />
              {/* Hover preview */}
              <motion.div
                className="absolute top-0 bottom-0 w-1 bg-white rounded-full opacity-0 group-hover:opacity-100"
                style={{ left: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-white/70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalTime)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-white hover:bg-white/20"
                onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-0.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-white hover:bg-white/20"
                onClick={() => setCurrentTime(Math.min(totalTime, currentTime + 10))}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-white hover:bg-white/20"
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-white hover:bg-white/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-medium text-foreground">
              Module 3: Autonomous Flight Paths
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Learn to implement GPS waypoint navigation and obstacle avoidance algorithms
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-sm font-medium text-primary">35% Complete</p>
            <p className="text-xs text-muted-foreground">24 min remaining</p>
          </div>
        </div>
      </div>
    </div>
  )
}
