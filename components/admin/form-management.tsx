"use client"

import { useState } from "react"
import { 
  Plus, Trash2, Save, Eye, ClipboardList, 
  ChevronRight, Layout, CheckCircle, AlertCircle 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { createForm } from "@/app/actions/cms"
import { motion, AnimatePresence } from "framer-motion"

export function FormManagement({ forms, submissions }: any) {
  const [isCreating, setIsCreating] = useState(false)
  const [formName, setFormName] = useState("")
  const [fields, setFields] = useState<any[]>([
    { id: "1", label: "Full Name", type: "text", required: true },
    { id: "2", label: "Email Address", type: "email", required: true }
  ])

  const addField = () => {
    setFields([...fields, { id: Date.now().toString(), label: "New Field", type: "text", required: false }])
  }

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id))
  }

  const updateField = (id: string, updates: any) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const handleCreateForm = async () => {
    if (!formName) {
      toast.error("Please enter a form name")
      return
    }
    const result = await createForm(formName, fields)
    if (result.success) {
      toast.success("Form created successfully!")
      setIsCreating(false)
      setFormName("")
      setFields([{ id: "1", label: "Full Name", type: "text", required: true }])
    } else {
      toast.error("Failed to create form")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Forms & Submissions</h2>
        <Button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-primary text-black font-bold gap-2"
        >
          {isCreating ? <ChevronRight className="rotate-180" /> : <Plus className="w-4 h-4" />}
          {isCreating ? "Back to List" : "Create New Form"}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {isCreating ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-8 rounded-3xl border border-white/10"
          >
            <div className="max-w-2xl space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Form Configuration</label>
                <Input 
                  placeholder="Enter Form Name (e.g., Contact Us, Survey 2026)"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="bg-white/5 border-white/10 text-xl h-14"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Form Fields</label>
                  <Button variant="ghost" onClick={addField} className="text-primary hover:bg-primary/10 text-xs">
                    <Plus className="w-4 h-4 mr-1" /> Add Field
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.id} className="flex gap-4 items-start bg-white/[0.02] p-4 rounded-2xl border border-white/5 group">
                      <div className="flex-1 space-y-3">
                        <Input 
                          value={field.label}
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                          className="bg-transparent border-white/10 h-10"
                          placeholder="Field Label"
                        />
                        <div className="flex gap-4">
                          <select 
                            value={field.type}
                            onChange={(e) => updateField(field.id, { type: e.target.value })}
                            className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg px-3 text-xs outline-none focus:border-primary"
                          >
                            <option value="text">Text Input</option>
                            <option value="email">Email Input</option>
                            <option value="textarea">Text Area</option>
                            <option value="number">Number</option>
                          </select>
                          <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={field.required}
                              onChange={(e) => updateField(field.id, { required: e.target.checked })}
                              className="accent-primary"
                            />
                            Required
                          </label>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeField(field.id)}
                        className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleCreateForm} className="w-full h-14 bg-primary text-black font-bold text-lg rounded-2xl shadow-lg shadow-primary/20">
                <Save className="w-5 h-5 mr-2" />
                Publish Form
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Active Forms */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Layout className="w-4 h-4" /> Active Forms
              </h3>
              <div className="space-y-3">
                {forms?.map((form: any) => (
                  <div key={form.id} className="glass-card p-5 rounded-2xl border border-white/5 flex items-center justify-between hover:border-primary/30 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <ClipboardList className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-primary transition-colors">{form.title}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                          {JSON.parse(form.content).fields.length} Fields • Created {new Date(form.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Eye className="w-4 h-4" /> Recent Submissions
              </h3>
              <div className="glass-card rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
                {submissions?.map((sub: any) => (
                   <div key={sub.id} className="p-4 hover:bg-white/[0.02] transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-primary">{sub.formName}</span>
                        <span className="text-[10px] text-gray-500">{new Date(sub.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-gray-400 line-clamp-1">
                        {Object.entries(JSON.parse(sub.data)).map(([key, val]) => `${key}: ${val}`).join(" • ")}
                      </div>
                   </div>
                ))}
                {!submissions?.length && <div className="p-8 text-center text-gray-500 text-sm italic">No submissions yet</div>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
