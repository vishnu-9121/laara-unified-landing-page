import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer({ config }: { config?: any }) {
  const siteName = config?.siteName || "Laara Innovations"
  const contactEmail = config?.contactEmail || "vishnu24.igm@gmail.com"
  return (
    <footer className="border-t border-border/50 bg-card/30 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tighter mb-4 block">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {siteName.toUpperCase()}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We blend advanced hardware and software development with immersive education to actively shape eager students into the skilled engineers and technological architects of tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/drone-rd" className="hover:text-primary transition-colors">Research Programs</Link></li>
              <li><Link href="/edutech" className="hover:text-primary transition-colors">Hands On Trainings</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Digital Services</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>laarainnovations26@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Vijayawada, near Amaravathi,
                  Andhra Pradesh, 521101</span>
              </li>
              <li className="flex gap-4 pt-2">
                <Link href="https://www.linkedin.com/company/laara-innovations/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="https://www.instagram.com/laara_innovations?igsh=dXlpM3YwNTF4ZTV2" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved. Designed with precision.
        </div>
      </div>
    </footer >
  )
}
