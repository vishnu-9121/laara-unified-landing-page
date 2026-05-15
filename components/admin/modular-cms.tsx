"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, Trash2, Edit3, MoveUp, MoveDown, Save, 
  Layout, LayoutGrid, Type, Send, MousePointer2,
  Sparkles, Users, HelpCircle, ClipboardList, Rocket
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { addBlock, updateBlock, deleteBlock, getBlocks } from "@/app/actions/cms"

const BLOCK_ICONS: Record<string, any> = {
  HERO: Layout,
  FEATURE_CARDS: LayoutGrid,
  PORTFOLIO_GRID: MousePointer2,
  CONTACT_FORM: Send,
  TEXT_BLOCK: Type,
  CTA_SECTION: Rocket,
  FORM_BUILDER: ClipboardList,
  SERVICES_SECTION: Sparkles,
  TESTIMONIALS: Users,
  FAQ_SECTION: HelpCircle
}

export function ModularCMSManager() {
  const [blocks, setBlocks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState("")

  useEffect(() => {
    refreshBlocks()
  }, [])

  const refreshBlocks = async () => {
    setLoading(true)
    const data = await getBlocks()
    setBlocks(data)
    setLoading(false)
  }

  const handleAddBlock = async (type: string) => {
    const res = await addBlock({
      type: type as any,
      title: `New ${type}`,
      content: JSON.stringify({}),
      order: blocks.length
    })
    if (res.success) {
      toast.success("Block added!")
      refreshBlocks()
    }
  }

  const handleDelete = async (id: string) => {
    const res = await deleteBlock(id)
    if (res.success) {
      toast.success("Block removed")
      refreshBlocks()
    }
  }

  const handleUpdateTitle = async (id: string) => {
    const res = await updateBlock(id, { title: editingTitle })
    if (res.success) {
      toast.success("Title updated")
      setEditingId(null)
      refreshBlocks()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Layout className="w-5 h-5 text-primary" />
          Page Builder
        </h3>
        <div className="flex gap-2">
          {Object.keys(BLOCK_ICONS).map((type) => (
            <Button 
              key={type}
              size="sm"
              variant="outline"
              className="border-white/10 hover:bg-white/5 gap-2"
              onClick={() => handleAddBlock(type)}
            >
              <Plus className="w-3 h-3" />
              {type.split("_")[0]}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-gray-500 italic">Loading configuration...</div>
        ) : blocks.length === 0 ? (
          <div className="py-12 text-center glass-card rounded-3xl text-gray-500 border-dashed border-2 border-white/10">
            No blocks found. Start by adding one above.
          </div>
        ) : (
          <div className="grid gap-4">
            {blocks.map((block, index) => {
              const Icon = BLOCK_ICONS[block.type] || Type
              return (
                <motion.div
                  key={block.id}
                  layout
                  className="glass-card p-6 rounded-2xl flex items-center gap-6 border border-white/5 hover:border-primary/20 transition-all group"
                >
                  <div className="p-3 bg-white/5 rounded-xl text-gray-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    {editingId === block.id ? (
                      <div className="flex gap-2">
                        <Input 
                          value={editingTitle} 
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="bg-white/5 border-primary/50 text-sm h-8"
                        />
                        <Button size="sm" onClick={() => handleUpdateTitle(block.id)}>Save</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <>
                        <div className="font-bold text-white flex items-center gap-2">
                          {block.title}
                          <span className="text-[10px] uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded-full">
                            {block.type}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Order Index: {block.order}</div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="hover:bg-white/5"
                      onClick={() => {
                        setEditingId(block.id)
                        setEditingTitle(block.title || "")
                      }}
                    >
                      <Edit3 className="w-4 h-4 text-blue-400" />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:bg-red-500/10" onClick={() => handleDelete(block.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

