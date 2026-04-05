"use client"

import { AlertTriangle, Briefcase, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Aviso Anti-Burla */}
      <div className="bg-accent/90 py-4 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-accent-foreground shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-accent-foreground text-sm">
                CUIDADO COM BURLAS!
              </p>
              <p className="text-accent-foreground/90 text-sm mt-1">
                Nunca pague por entrevistas ou processos seletivos! A MozEmpregos é 100% gratuita para candidatos. 
                Denuncie tentativas de fraude.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Principal */}
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MozEmpregos</span>
            </div>
            
            <p className="text-background/70 text-sm max-w-md">
              Conectando jovens moçambicanos às melhores oportunidades de emprego. 
              Grátis, rápido e seguro.
            </p>
            
            <div className="flex items-center gap-2 text-sm text-background/60">
              <Shield className="w-4 h-4" />
              <span>Plataforma verificada e segura</span>
            </div>
            
            <div className="border-t border-background/10 pt-4 mt-2 w-full">
              <p className="text-xs text-background/50">
                © 2026 MozEmpregos. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
