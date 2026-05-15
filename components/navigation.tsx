"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { UserAccountNav } from "./user-account-nav"
import { ThemeToggle } from "./theme-toggle"

const defaultNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/drone-rd", label: "Research" },
  { href: "/software", label: "Products" },
  { href: "/contact", label: "Contact Us" },
]

export function Navigation({ customLinks, config }: { customLinks?: any[], config?: any }) {
  const links = customLinks || defaultNavLinks
  const siteName = config?.siteName || "Laara Innovations"
  const siteLogo = config?.siteLogo || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logofinal1.png-r71MeNA0JTGhtlTkfaz9Rj1wKEwOp7.jpeg"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }
    }
  }

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 glass shadow-lg shadow-black/20" : "py-5 bg-transparent"}`}
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-primary/10 p-1 transition-transform duration-300 group-hover:scale-110">
              <img 
                src={siteLogo} 
                alt="Laara Innovations Logo - Drone R&D and Software Excellence" 
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#15E5C4] to-[#00A3FF] bg-clip-text text-transparent">
                {siteName.split(' ')[0]}
              </span>
              <span className="text-foreground ml-2">
                {siteName.split(' ').slice(1).join(' ')}
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10">
              {links.filter((l: any) => l.label !== "Contact Us").map((link: any) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-6 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-6 right-6 h-0.5 bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>

            <div className="ml-4 flex items-center gap-3">
              <ThemeToggle />
              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10 gap-2 rounded-full px-5 font-bold border border-primary/20"
                >
                  Contact Us
                </Button>
              </Link>
              {status === "authenticated" ? (
                <UserAccountNav />
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 gap-2 rounded-full px-5"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      size="sm"
                      className="bg-primary text-black font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2 rounded-full px-6 transition-all hover:scale-105 active:scale-95"
                    >
                      <UserPlus className="h-4 w-4" />
                      Join Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-t border-border/50 p-4 space-y-4 shadow-2xl shadow-black/20"
          >
            <div className="flex items-center justify-between px-4 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            <div className="flex flex-col gap-2">
              {links.map((link: any) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
              {status === "authenticated" ? (
                <div className="flex items-center justify-between px-4 py-2 bg-foreground/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {session?.user?.name?.[0] || session?.user?.email?.[0] || "?"}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{session?.user?.name || "User"}</div>
                      <div className="text-xs text-muted-foreground">{session?.user?.email}</div>
                    </div>
                  </div>
                  <UserAccountNav />
                </div>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-border/50 hover:bg-foreground/5">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-black font-bold">
                      Join Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
