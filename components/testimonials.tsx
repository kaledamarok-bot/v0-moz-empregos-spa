"use client"

import { CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Artur",
    location: "Maputo",
    job: "Motorista",
    message: "Consegui vaga de Motorista em 3 dias!",
  },
  {
    name: "Fátima",
    location: "Beira",
    job: "Recepcionista",
    message: "Meu primeiro emprego! Muito grata.",
  },
  {
    name: "Carlos",
    location: "Nampula",
    job: "Segurança",
    message: "Plataforma simples e eficiente.",
  },
  {
    name: "Ana",
    location: "Maputo",
    job: "Caixa",
    message: "Em 1 semana já estava trabalhando!",
  },
]

export function Testimonials() {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-foreground mb-2">Quem conseguiu vaga</h2>
          <p className="text-muted-foreground text-sm">
            Histórias reais de moçambicanos que encontraram emprego
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground text-sm">
                        {testimonial.name}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {testimonial.location} - {testimonial.job}
                    </p>
                    <p className="text-sm text-foreground/80 italic">
                      {`"${testimonial.message}"`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              +2.500 pessoas já conseguiram emprego
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
