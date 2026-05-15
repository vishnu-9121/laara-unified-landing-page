import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getNavLinks, getSystemConfig } from "@/app/actions/cms"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { VideoPlayer } from "@/components/video-player"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Play, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const [navLinks, config, session] = await Promise.all([
    getNavLinks(),
    getSystemConfig(),
    auth()
  ])

  if (!session) {
    redirect(`/login?callbackUrl=/edutech/course/${params.id}`)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation customLinks={navLinks} config={config} />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link href="/edutech" className="inline-flex items-center text-sm text-primary mb-8 hover:underline group">
          <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 bg-black/40 aspect-video flex items-center justify-center">
              <VideoPlayer />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tighter text-white mb-4">Course Content: Module {params.id}</h1>
              <p className="text-gray-400 leading-relaxed">
                Welcome to this comprehensive module. Here you will find all the materials, 
                video lectures, and interactive assignments needed to master this topic.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Module Curriculum</h3>
              {[1, 2, 3, 4].map((lesson) => (
                <div key={lesson} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                      {lesson === 1 ? <Play className="w-4 h-4 fill-current" /> : <CheckCircle className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-bold text-white">Lesson {lesson}: Introduction to Advanced Concepts</span>
                  </div>
                  <span className="text-xs text-gray-500">12:45</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="glass-card rounded-[2rem] p-8 border border-white/5 bg-white/5">
              <h4 className="text-lg font-bold text-white mb-6">Course Resources</h4>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-white/10 h-12">
                  <FileText className="w-4 h-4 text-primary" />
                  Lecture Notes (PDF)
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-white/10 h-12">
                  <FileText className="w-4 h-4 text-secondary" />
                  Technical Dataset
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8 border border-white/5 bg-primary/5">
              <h4 className="text-lg font-bold text-white mb-2">Need Help?</h4>
              <p className="text-xs text-gray-400 mb-6">Our instructors are available for 1-on-1 sessions.</p>
              <Button className="w-full rounded-xl bg-primary text-black font-bold h-12">
                Book a Mentor
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer config={config} />
    </main>
  )
}
