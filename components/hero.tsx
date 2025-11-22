"use client"

export default function Hero() {
  const handleCTAClick = () => {
    alert("Please use the chat widget in the bottom right to interact with the agent.")
  }

  return (
    <section className="w-full bg-white">
      <div className="relative w-full h-96 sm:h-[500px] overflow-hidden bg-gradient-to-b from-primary to-primary/80 animate-fade-in-up">
        <img
          src="/professional-procurement-office-workspace-with-ana.jpg"
          alt="Procurement Hub Banner"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        <div className="absolute inset-0 flex items-center justify-start">
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

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-white animate-fade-in-up">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-foreground text-pretty leading-relaxed mb-8">
            Welcome to our comprehensive procurement platform. We provide intelligent solutions to help manage your
            sourcing and purchasing needs efficiently.
          </p>
          <button
            onClick={handleCTAClick}
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Assistant
          </button>
        </div>
      </div>
    </section>
  )
}
