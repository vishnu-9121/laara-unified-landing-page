import { EdutechSidebar } from "@/components/edutech-sidebar"
import { auth } from "@/auth"

export default async function EdutechLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      <EdutechSidebar />
      <main className="flex-1 lg:pl-80">
        {children}
      </main>
    </div>
  )
}
