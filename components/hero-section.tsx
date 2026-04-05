"use client"

import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const provincias = [
  "Todas as Províncias",
  "Maputo Cidade",
  "Maputo Província",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambézia",
  "Nampula",
  "Cabo Delgado",
  "Niassa",
]

interface HeroSectionProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedProvincia: string
  setSelectedProvincia: (value: string) => void
}

export function HeroSection({
  searchTerm,
  setSearchTerm,
  selectedProvincia,
  setSelectedProvincia,
}: HeroSectionProps) {
  return (
    <section className="bg-primary py-12 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-3 text-balance">
          Encontre seu primeiro emprego em Moçambique
        </h1>
        <p className="text-primary-foreground/90 text-lg mb-8">
          Grátis e Rápido
        </p>
        
        <div className="bg-card rounded-xl p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-background border-input"
              />
            </div>
            <div className="md:w-48">
              <Select value={selectedProvincia} onValueChange={setSelectedProvincia}>
                <SelectTrigger className="h-12 bg-background border-input">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Província" />
                </SelectTrigger>
                <SelectContent>
                  {provincias.map((provincia) => (
                    <SelectItem key={provincia} value={provincia}>
                      {provincia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
