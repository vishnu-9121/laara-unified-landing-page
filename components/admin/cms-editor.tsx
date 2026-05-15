"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { saveContent } from '@/app/actions/content'
import { Loader2, Save, FileText, Globe, Settings } from 'lucide-react'
import { toast } from 'sonner'

export function CMSEditor({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
    ],
    content: initialData?.body || "<p>Start editing your content here...</p>",
  })

  const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
    if (!title || !slug) {
      toast.error("Title and Slug are required")
      return
    }

    setLoading(true)
    try {
      await saveContent({
        title,
        slug,
        body: editor?.getJSON(),
        status,
      })
      toast.success(`Content saved as ${status}`)
    } catch (error: any) {
      toast.error(error.message || "Failed to save content")
    } finally {
      setLoading(false)
    }
  }

  if (!editor) return null

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6 bg-card border border-border rounded-2xl shadow-xl">
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">No-Code Editor</h1>
            <p className="text-sm text-gray-400">Build and publish content instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => handleSave("DRAFT")}
            disabled={loading}
            className="border-white/10 text-white hover:bg-white/5"
          >
            Save Draft
          </Button>
          <Button 
            onClick={() => handleSave("PUBLISHED")}
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
            Publish Live
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Page Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Home Page Hero"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">URL Slug</label>
          <input 
            type="text" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g., home-hero"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
          />
        </div>
      </div>

      <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
        <div className="bg-white/5 border-b border-white/10 p-2 flex gap-2 flex-wrap">
          {/* Editor Toolbar */}
          <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-white/10' : ''}>B</Button>
          <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-white/10' : ''}>I</Button>
          <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-white/10' : ''}>H2</Button>
          <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-white/10' : ''}>List</Button>
        </div>
        <div className="p-6 min-h-[400px]">
          <EditorContent editor={editor} className="prose prose-invert max-w-none focus:outline-none" />
        </div>
      </div>
    </div>
  )
}
