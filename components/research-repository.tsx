"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, FileText, Download, ChevronRight, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const papers = [
  {
    id: 1,
    title: "Aerodynamic Optimization of Quad-Blade Propellers",
    type: "Whitepaper",
    date: "2024-03",
    category: "Aerodynamics",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Carbon Fiber Composite Material Analysis",
    type: "Technical Spec",
    date: "2024-02",
    category: "Materials",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Noise Reduction in High-RPM Propellers",
    type: "Research Paper",
    date: "2024-01",
    category: "Acoustics",
    size: "3.1 MB",
  },
  {
    id: 4,
    title: "Thrust-to-Weight Ratio Benchmarking Study",
    type: "Benchmark Report",
    date: "2023-12",
    category: "Performance",
    size: "4.2 MB",
  },
  {
    id: 5,
    title: "Graphene-Enhanced Blade Manufacturing Process",
    type: "Technical Spec",
    date: "2023-11",
    category: "Manufacturing",
    size: "2.9 MB",
  },
]

const categories = ["All", "Aerodynamics", "Materials", "Acoustics", "Performance", "Manufacturing"]

export function ResearchRepository() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || paper.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Research Repository</h3>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search papers and specifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-smooth ${
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Papers List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {filteredPapers.map((paper) => (
            <motion.div
              key={paper.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-smooth cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-smooth">
                    {paper.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{paper.type}</span>
                    <span className="text-xs text-muted-foreground">{paper.date}</span>
                    <span className="text-xs text-muted-foreground">{paper.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{papers.length}</p>
          <p className="text-xs text-muted-foreground">Documents</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">12</p>
          <p className="text-xs text-muted-foreground">Active Projects</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">3</p>
          <p className="text-xs text-muted-foreground">Patents Filed</p>
        </div>
      </div>
    </div>
  )
}
