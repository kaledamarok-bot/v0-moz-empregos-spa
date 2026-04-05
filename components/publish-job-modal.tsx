"use client"

import { Building2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const provincias = [
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

interface PublishJobModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PublishJobModal({ open, onOpenChange }: PublishJobModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em produção, aqui enviaria para uma API
    alert("Vaga enviada para análise! Entraremos em contacto em breve.")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Building2 className="w-5 h-5 text-primary" />
            Publicar Nova Vaga
          </DialogTitle>
          <DialogDescription>
            Preencha os dados da vaga. A publicação é gratuita e será analisada antes de ser publicada.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="empresa" className="text-foreground">Nome da Empresa *</Label>
            <Input
              id="empresa"
              placeholder="Ex: Supermercado Modelo"
              required
              className="bg-background"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="cargo" className="text-foreground">Cargo/Função *</Label>
            <Input
              id="cargo"
              placeholder="Ex: Repositor de Mercadoria"
              required
              className="bg-background"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="provincia-vaga" className="text-foreground">Localização *</Label>
            <Select required>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Selecione a província" />
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
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="salario" className="text-foreground">Faixa Salarial</Label>
            <Input
              id="salario"
              placeholder="Ex: 15.000 - 20.000 MZN"
              className="bg-background"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="descricao" className="text-foreground">Descrição da Vaga *</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva as responsabilidades, requisitos e benefícios..."
              required
              className="bg-background min-h-[100px]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="contacto-empresa" className="text-foreground">Contacto da Empresa *</Label>
            <Input
              id="contacto-empresa"
              placeholder="Ex: +258 84 123 4567"
              required
              className="bg-background"
            />
          </div>
          
          <p className="text-xs text-muted-foreground bg-secondary p-3 rounded-lg">
            A publicação de vagas é gratuita e será analisada pela nossa equipa antes de ser publicada.
          </p>
          
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12"
          >
            Enviar Vaga para Análise
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
