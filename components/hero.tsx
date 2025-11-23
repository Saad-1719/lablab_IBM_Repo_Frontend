export default function Hero() {


  return (
    <section className="w-full bg-white">
      <div className="relative w-full h-96 sm:h-[500px] overflow-hidden bg-linear-to-b from-primary to-primary/80 animate-fade-in-up">
        <img
          src="/professional-procurement-office-workspace-with-ana.jpg"
          alt="Procurement Hub Banner"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-r from-primary/90 to-primary/70"></div>
        <div className="absolute inset-0 flex items-center justify-start max-w-7xl mx-auto">
          <div className="text-left text-white px-4 sm:px-12 lg:px-16 animate-scale-in max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-balance leading-tight">Procurement Hub</h1>
            <p className="text-xl sm:text-2xl font-semibold mb-4 opacity-95 text-balance">
              Empowering Organizations with Smart Orchestration
            </p>
            <p className="text-base sm:text-lg opacity-90 text-pretty leading-relaxed">
              Experience seamless procurement management with our advanced orchestration platform. Automate workflows,
              optimize sourcing, and accelerate procurement cycles with intelligent decision-making at every step.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
