import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { ServiceMenu } from "@/components/ServiceMenu"
import { Footer } from "@/components/Footer"
import { Metadata } from "next"

// Homepage SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Serenity Spa | Luxury Wellness, Massages & Holistic Relaxation",
    description: "Rejuvenate your senses at Serenity Spa. Book customized Swedish, Deep Tissue, and Hot Stone massages, organic facials, and body treatments online.",
    openGraph: {
      title: "Serenity Spa | Luxury Wellness, Massages & Holistic Relaxation",
      description: "Rejuvenate your senses at Serenity Spa. Book customized Swedish, Deep Tissue, and Hot Stone massages, organic facials, and body treatments online.",
      url: "https://serenity-spa.vercel.app",
      siteName: "Serenity Spa",
      images: [
        {
          url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200&h=630",
          width: 1200,
          height: 630,
          alt: "Serenity Spa - Luxury Wellness Sanctuary",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Serenity Spa | Luxury Wellness & Holistic Relaxation",
      description: "Rejuvenate your senses at Serenity Spa. Book customized massages, organic facials, and body treatments online.",
      images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200&h=630"],
    },
  }
}

export default async function HomePage() {
  let services = []
  let staffList = []
  
  try {
    const rawServices = await prisma.service.findMany({
      orderBy: { name: "asc" },
    })
    // Map Prisma Decimal objects to standard numbers for client serialization
    services = rawServices.map(s => ({
      ...s,
      price: Number(s.price),
    }))
    
    staffList = await prisma.staff.findMany({
      orderBy: { name: "asc" },
    })
  } catch (error) {
    console.error("Failed to fetch homepage data from database, using fallback data:", error)
    
    // Fallback data allows the website to load before database migrations are run
    services = [
      {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Swedish Massage",
        description: "A classic full-body massage using long, gliding strokes to improve circulation and melt away daily stress.",
        price: 120,
        duration: 60,
        category: "Massage",
        imageUrl: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        name: "Radiance Facial",
        description: "A custom botanical treatment designed to restore natural glow, deeply cleanse, and hydrate the skin.",
        price: 130,
        duration: 60,
        category: "Facial",
        imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
      },
      {
        id: "33333333-3333-3333-3333-333333333333",
        name: "Organic Sugar Scrub",
        description: "A full-body exfoliation with organic cane sugar and essential oils, leaving your skin silky smooth and radiant.",
        price: 115,
        duration: 60,
        category: "Body Treatments",
        imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
      }
    ]
    
    staffList = [
      {
        id: "staff-1",
        name: "Sarah Jenkins",
        role: "Lead Massage Therapist",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "staff-2",
        name: "Michael Chen",
        role: "Senior Esthetician",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
      },
      {
        id: "staff-3",
        name: "Elena Rostova",
        role: "Holistic Body Practitioner",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      }
    ]
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Accessible Navigation Bar */}
      <Navbar />
      
      <main className="flex-grow">
        {/* Serene Hero Section */}
        <Hero />
        
        {/* Dynamic Service Menu with Booking Modal */}
        <ServiceMenu services={services} staffList={staffList} />
        
        {/* Philosophy & About Section */}
        <section id="about" className="py-24 bg-muted/25 border-t border-b border-border/40" aria-label="Our Philosophy">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border/40 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1000" 
                    alt="Aromatic oils and lavender flowers in a serene spa setting" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 hidden sm:block w-56 aspect-square overflow-hidden rounded-2xl border border-border/40 shadow-md bg-background p-3">
                  <img 
                    src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=500" 
                    alt="Therapeutic hot stone massage" 
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase block">
                  Our Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-foreground leading-tight">
                  A Sanctuary Created For Absolute Serenity
                </h2>
                <div className="h-[1px] w-16 bg-primary/35 mb-4" />
                <p className="text-muted-foreground font-sans leading-relaxed text-sm sm:text-base">
                  At Serenity, we believe that true wellness comes from aligning the mind, body, and spirit. Tucked away from the noise of daily life, our luxury sanctuary offers a space to breathe, release, and renew.
                </p>
                <p className="text-muted-foreground font-sans leading-relaxed text-sm sm:text-base font-light">
                  Our therapists combine organic botanicals, therapeutic essential oils, and highly personalized techniques to deliver treatments that are as restoring as they are indulgent.
                </p>
                <div className="pt-4">
                  <blockquote className="border-l-2 border-primary pl-4 italic text-foreground font-serif text-base sm:text-lg">
                    &ldquo;Relaxation is not a luxury, it is a vital part of living a balanced and healthy life.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-background" aria-label="Client Testimonials">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-3 inline-block">
                Testimonials
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-foreground">
                Stories of Restoration
              </h2>
              <div className="h-[1px] w-24 bg-primary/35 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The Deep Tissue Massage was transformative. The atmosphere immediately slows your heart rate down. An absolute sanctuary.",
                  author: "Evelyn V.",
                  treatment: "Deep Tissue Massage"
                },
                {
                  quote: "My skin has never felt more radiant. The esthetician was incredibly knowledgeable and tailored the botanical facial perfectly for me.",
                  author: "Marcus K.",
                  treatment: "Radiance Facial"
                },
                {
                  quote: "The Hot Stone Therapy is pure heaven. Heated basalt stones combined with therapeutic oils dissolved months of tension.",
                  author: "Clara M.",
                  treatment: "Hot Stone Therapy"
                }
              ].map((t, i) => (
                <div key={i} className="rounded-2xl border border-border/40 p-8 bg-card/30 backdrop-blur-xs flex flex-col justify-between hover:border-border/85 hover:shadow-xs transition-all duration-300">
                  <p className="text-muted-foreground font-sans leading-relaxed italic mb-6 text-sm">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.author}</p>
                    <p className="text-xs text-primary font-semibold tracking-widest uppercase pt-1">{t.treatment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Accessible Footer */}
      <Footer />
    </div>
  )
}
