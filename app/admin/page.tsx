import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getLeads } from "@/app/actions/leads"
import { getApplications } from "@/app/actions/careers"
import { AdminLayout } from "@/components/admin/admin-layout"
import { getBlocks } from "@/app/actions/cms"

export default async function AdminDashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const userRole = (session.user as any).role
  if (userRole !== "ADMIN" && userRole !== "MASTER") {
    redirect("/")
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { auditLogs: { take: 5, orderBy: { createdAt: "desc" } } }
  })

  const auditLogs = await prisma.auditLog.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    include: { user: true }
  })

  const leads = await getLeads()
  const applications = await getApplications()
  const blocks = await getBlocks()
  
  let submissions = []
  try {
    submissions = await (prisma as any).formSubmission.findMany({ orderBy: { createdAt: "desc" } })
  } catch (e) {
    console.warn("FormSubmission model not found in Prisma Client. Please run 'prisma generate'.")
  }
  
  const configBlock = blocks.find((b: any) => b.type === "SYSTEM_CONFIG")
  const navBlock = blocks.find((b: any) => b.type === "NAV_LINKS")
  const eventsBlock = blocks.find((b: any) => b.type === "TEXT_BLOCK" && b.title === "Global Events Configuration")
  const forms = blocks.filter((b: any) => b.type === "FORM_BUILDER")

  return (
    <AdminLayout 
      users={users}
      auditLogs={auditLogs}
      leads={leads}
      applications={applications}
      configBlock={configBlock}
      navBlock={navBlock}
      eventsBlock={eventsBlock}
      forms={forms}
      submissions={submissions}
      currentUserId={session.user.id!}
      currentUserRole={userRole}
    />
  )
}
