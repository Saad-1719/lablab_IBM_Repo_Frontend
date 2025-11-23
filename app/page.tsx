"use client"
import Header from "../components/header"
import Hero from "../components/hero"
import About from "../components/about"
import Footer from "../components/footer"
import Page from "@/components/csv-component"
export default function Home() {
  return (
    <main className="w-full bg-background">
      <Header />
      <Hero />
      <About />
      <Page/>
      <Footer />
    </main>
  )
}
