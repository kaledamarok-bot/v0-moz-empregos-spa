"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { JobList } from "@/components/job-list"
import { CVGenerator } from "@/components/cv-generator"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PublishJobModal } from "@/components/publish-job-modal"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvincia, setSelectedProvincia] = useState("Todas as Províncias")
  const [publishModalOpen, setPublishModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onPublishClick={() => setPublishModalOpen(true)} />
      
      <main className="flex-1">
        <HeroSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedProvincia={selectedProvincia}
          setSelectedProvincia={setSelectedProvincia}
        />
        
        <JobList 
          searchTerm={searchTerm}
          selectedProvincia={selectedProvincia}
        />
        
        <CVGenerator />
        
        <Testimonials />
      </main>
      
      <Footer />
      
      <WhatsAppButton />
      
      <PublishJobModal 
        open={publishModalOpen} 
        onOpenChange={setPublishModalOpen} 
      />
    </div>
  )
}
