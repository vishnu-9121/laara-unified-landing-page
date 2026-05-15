import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getEvents, getNavLinks, getSystemConfig } from "@/app/actions/cms"
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Events | Laara Innovations",
  description: "Stay updated with the latest summits, workshops, and tech events hosted by Laara Innovations.",
}

const DUMMY_EVENTS = [
  {
    id: "1",
    title: "Drone Tech Summit 2026",
    date: "June 15-17, 2026",
    location: "Bengaluru, India",
    description: "Join us for three days of workshops, keynotes, and hands-on demonstrations showcasing the latest in drone propulsion technology.",
    type: "Conference",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "2",
    title: "EdTech Innovation Workshop",
    date: "July 8, 2026",
    location: "Virtual Event",
    description: "A deep dive into AI-powered learning platforms and the future of personalized education. Open to educators and developers.",
    type: "Workshop",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "3",
    title: "Robotics & AI Expo",
    date: "September 12, 2026",
    location: "Hyderabad, India",
    description: "Exploring the convergence of robotics and artificial intelligence in industrial automation and consumer electronics.",
    type: "Expo",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2000"
  }
]

export default async function EventsPage() {
  const [cmsEvents, navLinks, config] = await Promise.all([
    getEvents(),
    getNavLinks(),
    getSystemConfig()
  ])

  // Combine CMS events with dummy data if CMS is empty, or just use CMS if populated
  const events = cmsEvents.length > 0 ? cmsEvents : DUMMY_EVENTS

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-primary selection:text-black">
      <Navigation customLinks={navLinks} config={config} />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/10 blur-[120px] rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Innovation Calendar</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Upcoming <span className="text-primary">Events</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-medium">
            Join the architects of tomorrow. From global tech summits to intimate innovation workshops, 
            explore where Laara Innovations is shaping the future.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {events.map((event: any, index: number) => (
              <div 
                key={event.id}
                className="group relative flex flex-col rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={event.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
                      {event.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                    {event.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      {event.date}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-secondary/30 transition-colors">
                        <MapPin className="w-4 h-4 text-secondary" />
                      </div>
                      {event.location}
                    </div>
                  </div>

                  <Link href={`/events/${event.id}`}>
                    <Button className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary hover:text-black hover:border-primary font-bold transition-all duration-300 group/btn gap-3">
                      View Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[3rem] p-12 lg:p-20 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 border border-white/5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-8 relative z-10">
              Hosting an <span className="text-primary">Event?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-medium relative z-10">
              We collaborate with tech communities and institutions worldwide. 
              Let's explore how we can bring Laara Innovations to your stage.
            </p>
            <Link href="/contact" className="relative z-10">
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-black font-black hover:bg-primary hover:scale-105 transition-all shadow-xl shadow-white/10">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer config={config} />
    </main>
  )
}
