"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import apiClient from "@/lib/api-client"

const categories = ["All", "Web Apps", "Mobile", "SaaS", "E-Commerce"]

const STATIC_PROJECTS = [
  {
    id: 1,
    title: "Google maps optimization",
    description: "Maximizes local visibility to attract nearby customers.",
    category: "Web Apps",
    tags: ["SEO", "Maps", "Local"],
    image: "/projects/google_maps.png",
    gradient: "from-primary/40 to-cyan-600/40",
    featured: true,
  },
  {
    id: 2,
    title: "LearnHub Platform",
    description: "Enterprise LMS with AI-powered course recommendations",
    category: "SaaS",
    tags: ["Education", "LMS", "AI"],
    image: "/projects/learnhub.png",
    gradient: "from-violet-600/40 to-primary/40",
    featured: false,
  },
  {
    id: 3,
    title: "TechMart Store",
    description: "High-performance e-commerce platform with 99.9% uptime",
    category: "E-Commerce",
    tags: ["E-Commerce", "Next.js", "Stripe"],
    image: "/projects/techmart.png",
    gradient: "from-emerald-600/40 to-teal-600/40",
    featured: false,
  },
  {
    id: 4,
    title: "Human Resource Management System",
    description: "Centralizes employee data and automates HR workflows.",
    category: "SaaS",
    tags: ["HRMS", "Automation", "Internal"],
    image: "/projects/hrms.png",
    gradient: "from-orange-600/40 to-red-600/40",
    featured: false,
  },
  {
    id: 5,
    title: "customer relationship management",
    description: "Centralizes customer data to build better relationships.",
    category: "SaaS",
    tags: ["CRM", "Sales", "Data"],
    image: "/projects/crm.png",
    gradient: "from-primary/40 to-indigo-600/40",
    featured: true,
  },
  {
    id: 6,
    title: "Food Delivery App",
    description: "Turn Your Restaurant Into a Brand.",
    category: "Web Apps",
    tags: ["Delivery", "Restaurant", "Mobile"],
    image: "/projects/webdev.png",
    gradient: "from-green-600/40 to-emerald-600/40",
    featured: false,
  },
]

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [projects, setProjects] = useState<any[]>(STATIC_PROJECTS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get("/projects")
        if (response.data && response.data.length > 0) {
          setProjects(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        // Fallback to static projects is already handled by initial state
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Heading */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Capabilities</span>
        </motion.div>
        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-white mb-6">
          Our Digital <span className="text-primary">Services</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
          Transforming complex challenges into seamless digital experiences through
          cutting-edge engineering and human-centric design.
        </p>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`break-inside-avoid group ${project.featured ? "sm:row-span-2" : ""}`}
            >
              <div className="relative rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-smooth">
                {/* Image/Gradient Area */}
                <div className={`relative ${project.featured ? "h-64" : "h-48"} overflow-hidden`}>
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                  )}
                  <div className="absolute inset-0 circuit-pattern opacity-20" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <p className="text-white text-sm font-medium mb-2">Interested in this service?</p>
                    <Link href="/contact" className="w-full max-w-[160px]">
                      <Button variant="default" className="w-full bg-primary text-black font-bold rounded-full gap-2">
                        Enquire Now
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/90 text-xs font-medium text-primary-foreground">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
