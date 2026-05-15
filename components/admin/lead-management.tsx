"use client"

import { useState } from "react"
import { format } from "date-fns"
import { 
  Mail, MessageSquare, Building2, Calendar, 
  ChevronDown, CheckCircle2, Clock, Trash2 
} from "lucide-react"
import { updateLeadStatus } from "@/app/actions/leads"
import { toast } from "sonner"

interface Lead {
  id: string
  name: string
  email: string
  company: string | null
  projectType: string | null
  budget: string | null
  message: string
  status: string
  createdAt: Date
}

export function LeadManagement({ leads: initialLeads }: { leads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads)

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const result = await updateLeadStatus(id, newStatus)
    if (result.success) {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l))
      toast.success("Lead status updated")
    } else {
      toast.error("Failed to update status")
    }
  }

  return (
    <div className="space-y-4">
      {leads.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No inquiries received yet.</p>
        </div>
      ) : (
        leads.map((lead) => (
          <div key={lead.id} className="glass-card rounded-3xl p-6 hover:border-primary/30 transition-all border border-white/5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    lead.status === "NEW" ? "bg-primary/10 text-primary" : 
                    lead.status === "CONTACTED" ? "bg-secondary/10 text-secondary" : 
                    "bg-gray-500/10 text-gray-500"
                  }`}>
                    {lead.status}
                  </div>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(lead.createdAt), "MMM d, yyyy")}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{lead.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      {lead.email}
                    </div>
                    {lead.company && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Building2 className="w-3.5 h-3.5 text-secondary" />
                        {lead.company}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-gray-300 italic">
                  "{lead.message}"
                </div>

                {lead.projectType && (
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400">
                      Project: {lead.projectType}
                    </span>
                    {lead.budget && (
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400">
                        Budget: {lead.budget}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-row md:flex-col gap-2">
                <button 
                  onClick={() => handleStatusUpdate(lead.id, "CONTACTED")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-secondary/20 hover:text-secondary transition-all"
                >
                  <Clock className="w-4 h-4" />
                  Mark Contacted
                </button>
                <button 
                  onClick={() => handleStatusUpdate(lead.id, "CLOSED")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-primary/20 hover:text-primary transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Close Inquiry
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
