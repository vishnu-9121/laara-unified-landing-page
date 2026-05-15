import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getNavLinks, getSystemConfig } from "@/app/actions/cms"
import { CourseCatalog } from "@/components/edutech/course-catalog"

export default async function CoursesPage() {
  const [navLinks, config] = await Promise.all([
    getNavLinks(),
    getSystemConfig()
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navigation customLinks={navLinks} config={config} />
      <div className="pt-24 pb-20">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-4">Our <span className="text-primary">Courses</span></h1>
            <p className="text-gray-400 max-w-2xl">
              Explore our full curriculum of professional certifications and hands-on technical trainings.
            </p>
          </div>
          <CourseCatalog />
        </div>
      </div>
      <Footer config={config} />
    </main>
  )
}
