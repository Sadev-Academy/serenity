"use client"

import * as React from "react"
import { Clock, Sparkles } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/BookingModal"
import { cn } from "@/lib/utils"

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  imageUrl: string
}

interface Staff {
  id: string
  name: string
  role: string
  imageUrl: string | null
}

interface ServiceMenuProps {
  services: Service[]
  staffList: Staff[]
}

export function ServiceMenu({ services, staffList }: ServiceMenuProps) {
  const [activeCategory, setActiveCategory] = React.useState("Massage")
  const [selectedService, setSelectedService] = React.useState<Service | null>(null)
  const [isBookingOpen, setIsBookingOpen] = React.useState(false)


  const handleBookClick = (service: Service) => {
    setSelectedService(service)
    setIsBookingOpen(true)
  }

  const categories = ["Massage", "Facial", "Body Treatments"]

  return (
    <section id="services" className="py-24 bg-background" aria-label="Spa Service Menu">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3 inline-block">
            Our Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-foreground mb-4">
            Curated Wellness Experiences
          </h2>
          <div className="h-[1px] w-24 bg-primary/35 mx-auto mb-6" />
          <p className="text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
            Every therapy is tailored to your unique needs, combining ancient wisdom with modern techniques to restore perfect balance.
          </p>
        </div>

        {/* Categories Tab Toggle - Only visible on mobile */}
        <div className="flex justify-center mb-12 md:hidden">
          <Tabs 
            value={activeCategory} 
            onValueChange={setActiveCategory} 
            className="w-full max-w-md"
            aria-label="Filter services by category"
          >
            <TabsList className="grid w-full grid-cols-3">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  aria-label={`Show ${cat} services`}
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((service) => {
              const isInactive = service.category.toLowerCase() !== activeCategory.toLowerCase()
              return (
                <Card 
                  key={service.id} 
                  className={cn(
                    "group overflow-hidden flex flex-col justify-between border border-border/40 hover:border-border/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card/50 backdrop-blur-xs",
                    isInactive && "hidden md:flex"
                  )}
                >
                  <div className="relative h-60 w-full overflow-hidden bg-muted">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  </div>

                  <CardHeader className="p-6 pb-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{service.category}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground/90 bg-muted/40 px-2.5 py-1 rounded-full border border-border/20">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground/70" aria-hidden="true" />
                        <span>{service.duration} mins</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="font-serif text-xl font-medium tracking-wide text-foreground group-hover:text-primary transition-colors leading-snug">
                        {service.name}
                      </CardTitle>
                      <div className="flex flex-col items-end shrink-0 select-none">
                        <div className="flex items-start font-serif text-2xl font-bold tracking-tight text-amber-800 dark:text-amber-400">
                          <span className="text-sm font-normal align-top mt-0.5 mr-0.5">$</span>
                          <span>{service.price}</span>
                        </div>
                        <span className="text-[9px] text-muted-foreground/75 uppercase tracking-widest mt-0.5 whitespace-nowrap">
                          incl. spa access
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-2 pb-6 flex-grow">
                    <p className="text-sm text-muted-foreground/90 leading-relaxed font-sans line-clamp-3">
                      {service.description}
                    </p>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 border-t border-border/30 bg-muted/20">
                    <Button
                      onClick={() => handleBookClick(service)}
                      className="w-full rounded-full font-serif text-xs tracking-widest uppercase py-5"
                      aria-label={`Book ${service.name} for ${service.duration} minutes at $${service.price}`}
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              )
            })
          ) : (
            <div className="col-span-full text-center py-16 border border-dashed rounded-2xl border-border/60">
              <p className="text-muted-foreground">No services found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Dialog Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        service={selectedService}
        staffList={staffList}
      />
    </section>
  )
}
