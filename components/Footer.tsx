import { Leaf, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/40 bg-muted/30 py-16 text-sm font-sans" aria-label="Spa Directory Footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="font-serif text-lg tracking-widest text-foreground uppercase">Serenity</span>
            </div>
            <p className="text-muted-foreground/90 leading-relaxed max-w-xs">
              A premium wellness sanctuary dedicated to restoring your natural harmony through holistic therapies and serene experiences.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Follow Serenity Spa on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Follow Serenity Spa on Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Follow Serenity Spa on Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Hours Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-base tracking-wider text-foreground">Hours of Serenity</h3>
            <ul className="space-y-2.5 text-muted-foreground" aria-label="Opening Hours">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-medium text-foreground">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium text-foreground">10:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-base tracking-wider text-foreground">Quick Links</h3>
            <ul className="space-y-2.5" aria-label="Quick links navigation">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Browse our spa services">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Learn about our spa philosophy">
                  About the Sanctuary
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Read client reviews">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Book a wellness treatment">
                  Book an Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-base tracking-wider text-foreground">Contact Us</h3>
            <ul className="space-y-3.5 text-muted-foreground" aria-label="Contact Information">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">123 Wellness Way, Suite 100, Serene Valley, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <a href="mailto:appointments@serenityspa.com" className="hover:text-primary transition-colors" aria-label="Email appointments at serenityspa.com">
                  appointments@serenityspa.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Serenity Spa. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors" aria-label="Read our privacy policy">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="Read our terms of service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
