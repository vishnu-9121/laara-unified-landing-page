"use client"

import { useState } from "react"
import { Save, Calendar, Plus, Trash2, MapPin, Type, Image as ImageIcon } from "lucide-react"
import { updateBlock, addBlock } from "@/app/actions/cms"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function EventEditor({ eventsBlock }: { eventsBlock: any }) {
  const [events, setEvents] = useState<any[]>(() => {
    try {
      return JSON.parse(eventsBlock?.content || "[]")
    } catch (e) {
      return []
    }
  })
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!eventsBlock) {
      // If no block exists, we might need to create it first
      setLoading(true)
      const res = await addBlock({
        type: "TEXT_BLOCK",
        title: "Global Events Configuration",
        content: JSON.stringify(events),
        order: 99
      })
      if (res.success) {
        toast.success("Event section initialized and saved")
      } else {
        toast.error("Failed to initialize events")
      }
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const res = await updateBlock(eventsBlock.id, { content: JSON.stringify(events) })
      if (res.success) {
        toast.success("Events updated successfully")
      } else {
        toast.error("Failed to save events")
      }
    } catch (e) {
      toast.error("An error occurred while saving")
    } finally {
      setLoading(false)
    }
  }

  const addEvent = () => {
    setEvents([
      ...events,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: "New Tech Event",
        date: "TBD",
        location: "Virtual / TBD",
        description: "Event description goes here...",
        type: "Conference",
        image: ""
      }
    ])
  }

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id))
  }

  const updateEvent = (id: string, updates: any) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...updates } : e))
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Event Management</h3>
            <p className="text-xs text-gray-500">Manage all upcoming summits and workshops</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={addEvent}
            className="border-white/10 hover:bg-white/5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-primary text-black font-bold hover:bg-primary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {events.length === 0 && (
          <div className="py-20 text-center glass-card rounded-[2rem] border-dashed border-2 border-white/10">
            <Calendar className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No events configured. Add your first event to get started.</p>
          </div>
        )}
        
        {events.map((event) => (
          <div key={event.id} className="glass-card rounded-[2rem] p-8 border border-white/5 relative group">
            <button 
              onClick={() => removeEvent(event.id)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Type className="w-3 h-3" /> Event Title
                  </label>
                  <Input 
                    value={event.title}
                    onChange={(e) => updateEvent(event.id, { title: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Date
                    </label>
                    <Input 
                      value={event.date}
                      onChange={(e) => updateEvent(event.id, { date: e.target.value })}
                      className="bg-white/5 border-white/10 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> Location
                    </label>
                    <Input 
                      value={event.location}
                      onChange={(e) => updateEvent(event.id, { location: e.target.value })}
                      className="bg-white/5 border-white/10 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Description</label>
                  <Textarea 
                    value={event.description}
                    onChange={(e) => updateEvent(event.id, { description: e.target.value })}
                    className="bg-white/5 border-white/10 rounded-xl min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon className="w-3 h-3" /> Cover Image URL
                  </label>
                  <Input 
                    value={event.image}
                    onChange={(e) => updateEvent(event.id, { image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="bg-white/5 border-white/10 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Event Category</label>
                  <select 
                    value={event.type}
                    onChange={(e) => updateEvent(event.id, { type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none text-white"
                  >
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Expo">Expo</option>
                    <option value="Summit">Summit</option>
                    <option value="Webinar">Webinar</option>
                  </select>
                </div>

                {event.image && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mt-4">
                    <img src={event.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
