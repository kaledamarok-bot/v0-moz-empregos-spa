"use client"

import { MapPin, Clock, Banknote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface Job {
  id: number
  title: string
  company: string
  location: string
  type: string
  salary: string
  posted: string
  urgent?: boolean
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Repositor de Mercadoria",
    company: "Supermercado Modelo",
    location: "Maputo Cidade",
    type: "Tempo Integral",
    salary: "15.000 - 20.000 MZN",
    posted: "Há 2 horas",
    urgent: true,
  },
  {
    id: 2,
    title: "Recepcionista",
    company: "Hotel Polana",
    location: "Maputo Cidade",
    type: "Tempo Integral",
    salary: "18.000 - 25.000 MZN",
    posted: "Há 5 horas",
  },
  {
    id: 3,
    title: "Auxiliar de Limpeza",
    company: "Clínica Saúde Plus",
    location: "Beira",
    type: "Meio Período",
    salary: "10.000 - 12.000 MZN",
    posted: "Há 1 dia",
  },
  {
    id: 4,
    title: "Segurança",
    company: "Centro Comercial Maputo",
    location: "Maputo Cidade",
    type: "Tempo Integral",
    salary: "20.000 - 25.000 MZN",
    posted: "Há 1 dia",
    urgent: true,
  },
  {
    id: 5,
    title: "Motorista",
    company: "Transportes Rápido",
    location: "Nampula",
    type: "Tempo Integral",
    salary: "25.000 - 35.000 MZN",
    posted: "Há 2 dias",
  },
  {
    id: 6,
    title: "Caixa de Supermercado",
    company: "Game Stores",
    location: "Maputo Cidade",
    type: "Tempo Integral",
    salary: "12.000 - 15.000 MZN",
    posted: "Há 3 dias",
  },
  {
    id: 7,
    title: "Ajudante de Cozinha",
    company: "Restaurante Sabores",
    location: "Inhambane",
    type: "Tempo Integral",
    salary: "10.000 - 14.000 MZN",
    posted: "Há 3 dias",
  },
  {
    id: 8,
    title: "Atendente de Loja",
    company: "Loja da Moda",
    location: "Maputo Cidade",
    type: "Meio Período",
    salary: "8.000 - 12.000 MZN",
    posted: "Há 4 dias",
  },
]

interface JobListProps {
  searchTerm: string
  selectedProvincia: string
}

export function JobList({ searchTerm, selectedProvincia }: JobListProps) {
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProvincia = selectedProvincia === "Todas as Províncias" || 
      selectedProvincia === "" ||
      job.location.includes(selectedProvincia.replace(" Cidade", "").replace(" Província", ""))
    return matchesSearch && matchesProvincia
  })

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Vagas Populares</h2>
          <span className="text-sm text-muted-foreground">
            {filteredJobs.length} vagas encontradas
          </span>
        </div>
        
        <div className="flex flex-col gap-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-foreground truncate">{job.title}</h3>
                      {job.urgent && (
                        <Badge className="bg-accent text-accent-foreground text-xs">
                          Urgente
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Banknote className="w-4 h-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.posted}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                  >
                    Candidatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhuma vaga encontrada para sua busca.</p>
              <p className="text-sm mt-2">Tente ajustar os filtros ou buscar por outro cargo.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
