"use client"

import { useState } from "react"
import { format } from "date-fns"
import { 
  Briefcase, GraduationCap, Phone, Mail, 
  FileText, Download, CheckCircle2, Clock, Trash2 
} from "lucide-react"
import { updateApplicationStatus } from "@/app/actions/careers"
import { toast } from "sonner"

export function ApplicationManagement({ applications: initialApps }: { applications: any[] }) {
  const [apps, setApps] = useState(initialApps)

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const result = await updateApplicationStatus(id, newStatus)
    if (result.success) {
      setApps(apps.map((a: any) => a.id === id ? { ...a, status: newStatus } : a))
      toast.success("Application updated")
    }
  }

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Mobile", "Qualification", "Role", "Resume", "Status", "Date"]
    const rows = apps.map((a: any) => [
      a.name, a.email, a.mobile, a.qualification, a.interestedRole, a.resumeUrl ? "Has File" : "N/A", a.status, format(new Date(a.createdAt), "yyyy-MM-dd")
    ])
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `applications_${format(new Date(), "yyyyMMdd")}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/10">
        <div>
          <h3 className="text-xl font-bold">Job Applications</h3>
          <p className="text-sm text-gray-500">Track and manage talent acquisition.</p>
        </div>
        <button 
          onClick={downloadCSV}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-black font-bold hover:scale-105 transition-all"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="space-y-4">
        {apps.length === 0 ? (
          <div className="p-12 text-center glass-card rounded-3xl text-gray-500">
            No applications received yet.
          </div>
        ) : (
          apps.map((app: any) => (
            <div key={app.id} className="glass-card rounded-3xl p-6 border border-white/5 hover:border-primary/20 transition-all">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                      app.status === "PENDING" ? "bg-yellow-500/20 text-yellow-500" :
                      app.status === "REVIEWED" ? "bg-secondary/20 text-secondary" :
                      "bg-primary/20 text-primary"
                    }`}>
                      {app.status}
                    </span>
                    <span className="text-xs text-gray-500">{format(new Date(app.createdAt), "MMM d, yyyy")}</span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold">{app.name}</h4>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Mail className="w-3.5 h-3.5" /> {app.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Phone className="w-3.5 h-3.5" /> {app.mobile}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Qualification</div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        {app.qualification}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Interested Role</div>
                      <div className="text-sm font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-secondary" />
                        {app.interestedRole}
                      </div>
                    </div>
                  </div>

                  {app.resumeUrl && (
                    <a 
                      href={app.resumeUrl.startsWith('data:') ? app.resumeUrl : (app.resumeUrl.startsWith('http') ? app.resumeUrl : `https://${app.resumeUrl}`)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      download={app.resumeUrl.startsWith('data:') ? `resume_${app.name.replace(/\s+/g, '_')}.pdf` : undefined}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs hover:text-primary transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      View Resume / Portfolio
                    </a>
                  )}
                </div>

                <div className="flex flex-row md:flex-col gap-2">
                  <button 
                    onClick={() => handleStatusUpdate(app.id, "REVIEWED")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-xs hover:bg-secondary/20 transition-all border border-white/10"
                  >
                    <Clock className="w-4 h-4" />
                    Mark Reviewed
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-xs hover:bg-red-500/20 transition-all border border-white/10"
                  >
                    <Trash2 className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
