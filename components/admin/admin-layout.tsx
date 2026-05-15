"use client"

import { useState } from "react"
import { 
  Shield, Users, LayoutDashboard, FileText, Activity, 
  Bell, Globe, Mail, Settings, LogOut, ChevronRight, Briefcase, ClipboardList
} from "lucide-react"
import { AdminManagement } from "./admin-management"
import { LeadManagement } from "./lead-management"
import { ApplicationManagement } from "./application-management"
import { ModularCMSManager } from "./modular-cms"
import { SystemEditor } from "./system-editor"
import { EventEditor } from "./event-editor"
import { FormManagement } from "./form-management"
import { format } from "date-fns"
import Link from "next/link"

export function AdminLayout({ users, auditLogs, leads, applications, configBlock, navBlock, eventsBlock, forms, submissions, currentUserId, currentUserRole }: any) {
  const [activeTab, setActiveTab] = useState("overview")
  const [cmsMode, setCmsMode] = useState("modular")

  const sidebarLinks = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard /> },
    { id: "personnel", label: "Personnel", icon: <Users /> },
    { id: "leads", label: "Leads", icon: <Mail /> },
    { id: "applications", label: "Applications", icon: <Briefcase /> },
    { id: "forms", label: "Forms", icon: <ClipboardList /> },
    { id: "cms", label: "CMS Hub", icon: <FileText /> },
    { id: "audit", label: "Audit Logs", icon: <Activity /> },
  ]

  return (
    <div className="min-h-screen bg-[#020202] text-white flex">
      {/* Premium Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-[#050505] flex flex-col sticky top-0 h-screen p-8">
        <div className="flex items-center gap-3 mb-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-tech rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight">Open Portal</div>
              <div className="text-[10px] text-primary font-bold uppercase tracking-widest">Master Control</div>
            </div>
          </Link>
        </div>

        <nav className="space-y-1.5 flex-1">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 mb-4">Core Systems</div>
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all group ${
                activeTab === link.id 
                  ? "bg-primary text-black shadow-lg shadow-primary/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={activeTab === link.id ? "text-black" : "text-gray-500 group-hover:text-primary transition-colors"}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </div>
              {activeTab === link.id && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <Link 
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-all rounded-xl hover:bg-white/5"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <Link 
            href="/help"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-all rounded-xl hover:bg-white/5"
          >
            <Shield className="w-5 h-5" />
            <span>Help & Support</span>
          </Link>
          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[11px] truncate">Admin Active</div>
                <div className="text-[9px] text-primary uppercase font-bold tracking-tighter">Secure Session</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Experience */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-glow capitalize">
              {activeTab} Management
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === "overview" && "High-level metrics and system status."}
              {activeTab === "personnel" && "Manage authorized personnel and access roles."}
              {activeTab === "leads" && "Review and manage incoming business inquiries."}
              {activeTab === "applications" && "Review job applications and talent submissions."}
              {activeTab === "cms" && "Modify website content and modular structures."}
              {activeTab === "audit" && "Review system events and security logs."}
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right mr-4">
                <div className="text-sm font-bold">Master Admin</div>
                <div className="text-[10px] text-primary font-bold uppercase tracking-widest">Active Now</div>
             </div>
             <button className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-all border border-white/10">
                <Bell className="w-5 h-5 text-gray-400" />
             </button>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Total Users" value={users.length} change="+12%" trend="up" />
              <StatCard label="Total Leads" value={leads.length} change="+5%" trend="up" />
              <StatCard label="System Health" value="100%" change="Stable" trend="up" />
              
              <div className="md:col-span-3 space-y-6">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <div className="glass-card rounded-3xl p-6">
                   <p className="text-gray-500 text-sm">System is performing optimally. No critical alerts detected.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "personnel" && (
            <AdminManagement 
              users={users} 
              currentUserId={currentUserId} 
              currentUserRole={currentUserRole} 
            />
          )}

          {activeTab === "leads" && (
            <LeadManagement leads={leads} />
          )}

          {activeTab === "applications" && (
            <ApplicationManagement applications={applications} />
          )}

          {activeTab === "forms" && (
            <FormManagement forms={forms} submissions={submissions} />
          )}

          {activeTab === "cms" && (
            <div className="space-y-8">
              <div className="flex gap-4 border-b border-white/5 pb-4">
                <button 
                  onClick={() => setCmsMode("modular")}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${cmsMode === "modular" ? "bg-primary text-black" : "text-gray-500 hover:text-white"}`}
                >
                  Modular Blocks
                </button>
                <button 
                  onClick={() => setCmsMode("system")}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${cmsMode === "system" ? "bg-secondary text-black" : "text-gray-500 hover:text-white"}`}
                >
                  Core Systems
                </button>
                <button 
                  onClick={() => setCmsMode("events")}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${cmsMode === "events" ? "bg-accent text-white" : "text-gray-500 hover:text-white"}`}
                >
                  Events Management
                </button>
              </div>
              
              {cmsMode === "modular" && <ModularCMSManager />}
              {cmsMode === "system" && <SystemEditor configBlock={configBlock} navBlock={navBlock} />}
              {cmsMode === "events" && <EventEditor eventsBlock={eventsBlock} />}
            </div>
          )}

          {activeTab === "audit" && (
            <div className="glass-card rounded-3xl p-8">
              <div className="space-y-6">
                {auditLogs.map((log: any) => (
                  <div key={log.id} className="flex gap-4 group border-b border-white/5 pb-4 last:border-0">
                    <div className="relative mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary ring-4 ring-primary/10" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{log.action}</span>
                        <span className="text-[10px] text-gray-500">
                          {format(new Date(log.createdAt), "MMM d, HH:mm")}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{log.user?.email || "System"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value, change, trend }: any) {
  return (
    <div className="glass-card p-8 rounded-3xl group border border-white/5 hover:border-primary/20 transition-all">
      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">{label}</div>
      <div className="flex items-end justify-between">
        <div className="text-4xl font-bold text-white group-hover:text-glow transition-all">{value}</div>
        <div className={`text-[10px] font-bold px-3 py-1 rounded-full ${
          trend === "up" ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"
        }`}>
          {change}
        </div>
      </div>
    </div>
  )
}
