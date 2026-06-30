"use client"

import * as React from "react"
import { Menu, X, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => setIsOpen(isOpen => !isOpen)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/45 bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" aria-hidden="true" />
          <a 
            href="#" 
            className="font-serif text-xl tracking-widest text-foreground hover:opacity-90 uppercase"
            aria-label="Serenity Spa Home Page"
          >
            Serenity
          </a>
        </div>

        {/* Desktop Nav */}
        <nav 
          className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-muted-foreground/90"
          aria-label="Main Navigation"
        >
          <a href="#services" className="transition-colors hover:text-primary" aria-label="View our spa services">Services</a>
          <a href="#about" className="transition-colors hover:text-primary" aria-label="Read about our spa and wellness philosophy">About</a>
          <a href="#testimonials" className="transition-colors hover:text-primary" aria-label="Read client reviews and testimonials">Testimonials</a>
          <a href="#contact" className="transition-colors hover:text-primary" aria-label="Get our contact information and location">Contact</a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <Button 
            variant="default" 
            asChild
            className="rounded-full font-serif tracking-widest text-xs uppercase"
          >
            <a href="#services" aria-label="Book a spa appointment">Book Now</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden transition-all"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close main menu" : "Open main menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          id="mobile-menu"
          className="border-b border-border bg-background px-6 py-8 md:hidden animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <nav className="flex flex-col gap-5 text-center font-semibold tracking-widest uppercase text-muted-foreground" aria-label="Mobile Navigation">
            <a 
              href="#services" 
              onClick={() => setIsOpen(false)}
              className="py-2 transition-colors hover:text-primary"
              aria-label="View our services"
            >
              Services
            </a>
            <a 
              href="#about" 
              onClick={() => setIsOpen(false)}
              className="py-2 transition-colors hover:text-primary"
              aria-label="Read about our spa"
            >
              About
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setIsOpen(false)}
              className="py-2 transition-colors hover:text-primary"
              aria-label="Client testimonials"
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="py-2 transition-colors hover:text-primary"
              aria-label="Contact and location"
            >
              Contact
            </a>
            <Button 
              variant="default" 
              asChild
              className="mt-4 rounded-full font-serif tracking-widest text-xs uppercase w-full py-6"
            >
              <a 
                href="#services" 
                onClick={() => setIsOpen(false)}
                aria-label="Book an appointment now"
              >
                Book Now
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
