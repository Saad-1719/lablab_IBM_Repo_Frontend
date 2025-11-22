"use client"

export default function About() {
  return (
    <section id="about" className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="animate-slide-in-left">
            <img src="/team-collaboration-and-technology.jpg" alt="About Us" className="w-full h-auto rounded-lg shadow-lg" />
          </div>

          {/* Right side - Content */}
          <div className="animate-slide-in-right space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-4 text-balance">About Us</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                We are dedicated to transforming the procurement landscape through innovative technology and intelligent
                automation. Our platform brings together best-in-class solutions to simplify complex procurement
                processes.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                With a focus on efficiency, transparency, and reliability, we empower organizations to make smarter
                procurement decisions and build stronger supplier relationships.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4 pt-4">
              <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <p className="text-foreground/80">Intelligent automation for faster procurement cycles</p>
              </div>
              <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <p className="text-foreground/80">Real-time visibility across all procurement activities</p>
              </div>
              <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  ✓
                </div>
                <p className="text-foreground/80">Secure and compliant solution for enterprise organizations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
