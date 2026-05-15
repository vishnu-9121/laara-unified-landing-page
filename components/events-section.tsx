"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const events = [
  {
    id: 1,
    title: "Drone Tech Summit 2026",
    date: "June 15-17, 2026",
    location: "Bengaluru, India",
    description: "Join us for three days of workshops, keynotes, and hands-on demonstrations showcasing the latest in drone propulsion technology.",
    type: "Conference",
    href: "/events/drone-tech-summit-2026"
  },
  {
    id: 2,
    title: "EdTech Innovation Workshop",
    date: "July 8, 2026",
    location: "Virtual Event",
    description: "A deep dive into AI-powered learning platforms and the future of personalized education. Open to educators and developers.",
    type: "Workshop",
    href: "/events/edtech-innovation-workshop"
  },
]

export function EventsSection() {
  return (
    <section className="relative py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-4">
                Upcoming <span className="text-primary">Events</span>
              </h2>
              <p className="text-gray-400 max-w-xl font-medium">
                Connect with our community and explore the future of innovation at our upcoming summits and workshops.
              </p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl gap-2">
                View All Events <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Event type badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
                    <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                    {event.type}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed font-medium">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500 mb-8 pb-8 border-b border-white/5">
                    <div className="flex items-center gap-2 group/info">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover/info:border-primary/30 transition-colors">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 group/info">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover/info:border-accent/30 transition-colors">
                        <MapPin className="w-4 h-4 text-accent" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <Link href={event.href}>
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-white hover:bg-transparent group/btn font-bold text-base flex items-center gap-2">
                      Full Event Details 
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-black transition-all duration-300">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </div>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
