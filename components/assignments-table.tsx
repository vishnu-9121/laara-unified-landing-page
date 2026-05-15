"use client"

import { FileText, Download, Eye, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const assignments = [
  {
    id: 1,
    title: "Drone Flight Path Analysis",
    type: "PDF",
    course: "Advanced Navigation",
    dueDate: "2024-12-15",
    status: "submitted",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "ML Model Implementation Guide",
    type: "PDF",
    course: "AI & Machine Learning",
    dueDate: "2024-12-20",
    status: "pending",
    size: "5.1 MB",
  },
  {
    id: 3,
    title: "System Architecture Diagram",
    type: "PDF",
    course: "Software Architecture",
    dueDate: "2024-12-22",
    status: "overdue",
    size: "1.8 MB",
  },
  {
    id: 4,
    title: "Propeller Physics Workbook",
    type: "PDF",
    course: "Drone Fundamentals",
    dueDate: "2024-12-10",
    status: "completed",
    size: "3.2 MB",
  },
]

const getStatusConfig = (status: string) => {
  switch (status) {
    case "completed":
      return { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10", label: "Completed" }
    case "submitted":
      return { icon: Clock, color: "text-primary", bg: "bg-primary/10", label: "Submitted" }
    case "pending":
      return { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10", label: "Pending" }
    case "overdue":
      return { icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10", label: "Overdue" }
    default:
      return { icon: Clock, color: "text-muted-foreground", bg: "bg-muted", label: status }
  }
}

export function AssignmentsTable() {
  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div className="col-span-5">Resource</div>
        <div className="col-span-2">Course</div>
        <div className="col-span-2">Due Date</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {assignments.map((assignment) => {
          const statusConfig = getStatusConfig(assignment.status)
          const StatusIcon = statusConfig.icon

          return (
            <div
              key={assignment.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 hover:bg-secondary/30 transition-smooth"
            >
              {/* Resource */}
              <div className="sm:col-span-5 flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {assignment.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {assignment.type} • {assignment.size}
                  </p>
                </div>
              </div>

              {/* Course - Mobile Label */}
              <div className="sm:col-span-2 flex items-center">
                <span className="sm:hidden text-xs text-muted-foreground mr-2">Course:</span>
                <span className="text-sm text-muted-foreground">{assignment.course}</span>
              </div>

              {/* Due Date */}
              <div className="sm:col-span-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground sm:hidden" />
                <span className="text-sm text-muted-foreground">
                  {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Status */}
              <div className="sm:col-span-2 flex items-center">
                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                  <StatusIcon className="h-3 w-3" />
                  {statusConfig.label}
                </span>
              </div>

              {/* Actions */}
              <div className="sm:col-span-1 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
