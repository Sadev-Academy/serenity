import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      className="relative flex h-[85vh] min-h-[600px] w-full items-center justify-center overflow-hidden bg-slate-900"
      aria-label="Welcome to Serenity Spa"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105 transition-transform duration-[15000ms] ease-out hover:scale-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000')`
        }}
        role="img"
        aria-label="Serene spa treatment room with hot stones and flower petals"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/30 to-background" />

      {/* Hero Content */}
      <div className="container relative z-20 mx-auto px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block font-sans text-xs font-semibold tracking-[0.3em] text-accent uppercase">
            A Sanctuary for the Senses
          </span>
          <h1 className="mb-6 font-serif text-4xl font-light tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Elevate Your Well-Being
          </h1>
          <p className="mb-10 font-sans text-base font-light tracking-wide text-stone-200 sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Experience the art of holistic relaxation. Nourish your mind, body, and soul with our bespoke treatments designed to restore harmony.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full font-serif text-xs tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/95 shadow-lg shadow-black/25"
              asChild
            >
              <a href="#services" aria-label="Explore our spa treatment menu and services">Explore Services</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full font-serif text-xs tracking-widest uppercase border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <a href="#about" aria-label="Learn more about our spa philosophy and story">Our Story</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
