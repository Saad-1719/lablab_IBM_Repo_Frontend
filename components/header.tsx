"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
    const handleCTAClick = () => {
    alert("Please use the chat widget in the bottom right to interact with the agent.")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-primary hidden sm:inline">Supplier IQ</span>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground hover:text-primary transition">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`${isOpen ? "flex" : "hidden"} md:flex absolute md:relative top-16 md:top-auto left-0 md:left-auto right-0 md:right-auto flex-col md:flex-row gap-6 bg-white md:bg-transparent p-6 md:p-0 w-full md:w-auto border-t md:border-0 border-border`}
        >
          <button
            onClick={handleCTAClick}
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Assistant
          </button>
         
        </div>
      </nav>
    </header>
  )
}
