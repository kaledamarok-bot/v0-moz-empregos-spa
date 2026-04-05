"use client"

import { Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onPublishClick: () => void
}

export function Header({ onPublishClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">MozEmpregos</span>
        </div>
        <Button 
          onClick={onPublishClick}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          Publicar Vaga
        </Button>
      </div>
    </header>
  )
}
