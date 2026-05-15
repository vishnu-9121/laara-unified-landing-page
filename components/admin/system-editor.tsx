"use client"

import { useState } from "react"
import { Save, Globe, Link as LinkIcon, Mail } from "lucide-react"
import { updateBlock } from "@/app/actions/cms"
import { toast } from "sonner"

export function SystemEditor({ configBlock, navBlock }: any) {
  const [config, setConfig] = useState(JSON.parse(configBlock?.content || "{}"))
  const [nav, setNav] = useState(JSON.parse(navBlock?.content || "[]"))
  const [loading, setLoading] = useState(false)

  const handleSaveConfig = async () => {
    setLoading(true)
    try {
      await updateBlock(configBlock.id, { content: JSON.stringify(config) })
      toast.success("System configuration updated")
    } catch (e) {
      toast.error("Failed to update config")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNav = async () => {
    setLoading(true)
    try {
      await updateBlock(navBlock.id, { content: JSON.stringify(nav) })
      toast.success("Navigation links updated")
    } catch (e) {
      toast.error("Failed to update navigation")
    } finally {
      setLoading(false)
    }
  }

  const addNavLink = () => {
    setNav([...nav, { href: "/", label: "New Link" }])
  }

  const removeNavLink = (index: number) => {
    setNav(nav.filter((_: any, i: number) => i !== index))
  }

  return (
    <div className="space-y-12">
      {/* Site Identity */}
      <section className="glass-card rounded-3xl p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Site Identity</h3>
          </div>
          <button 
            onClick={handleSaveConfig}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-black font-bold hover:scale-105 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Site Name</label>
            <input 
              value={config.siteName}
              onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Support Email</label>
            <input 
              value={config.contactEmail}
              onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Logo URL</label>
            <input 
              value={config.siteLogo}
              onChange={(e) => setConfig({ ...config, siteLogo: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none"
            />
          </div>
        </div>
      </section>

      {/* Navigation Editor */}
      <section className="glass-card rounded-3xl p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
              <LinkIcon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Primary Navigation</h3>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={addNavLink}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all"
            >
              Add Link
            </button>
            <button 
              onClick={handleSaveNav}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-secondary text-black font-bold hover:scale-105 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Links
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {nav.map((link: any, index: number) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-gray-500">Label</label>
                <input 
                  value={link.label}
                  onChange={(e) => {
                    const newNav = [...nav]
                    newNav[index].label = e.target.value
                    setNav(newNav)
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold text-gray-500">HREF / Slug</label>
                <input 
                  value={link.href}
                  onChange={(e) => {
                    const newNav = [...nav]
                    newNav[index].href = e.target.value
                    setNav(newNav)
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none"
                />
              </div>
              <button 
                onClick={() => removeNavLink(index)}
                className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all mb-1"
              >
                <Save className="w-4 h-4 rotate-45" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
