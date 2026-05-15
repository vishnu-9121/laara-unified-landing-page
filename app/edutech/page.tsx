import { Navigation } from "@/components/navigation"
import { getNavLinks, getSystemConfig } from "@/app/actions/cms"
import { auth } from "@/auth"
import { CourseCatalog } from "@/components/edutech/course-catalog"
import { StudentDashboard } from "@/components/edutech/student-dashboard"

export default async function EdutechPage() {
  const [navLinks, config, session] = await Promise.all([
    getNavLinks(),
    getSystemConfig(),
    auth()
  ])

  return (
    <main className="min-h-screen bg-background">
      {!session && <Navigation customLinks={navLinks} config={config} />}
      
      <div className={session ? "" : "pt-24"}>
        {session ? (
          <StudentDashboard />
        ) : (
          <CourseCatalog />
        )}
      </div>
    </main>
  )
}
