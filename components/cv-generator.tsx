"use client"

import { useState } from "react"
import { FileText, Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface FormData {
  nome: string
  contacto: string
  email: string
  provincia: string
  objetivo: string
  educacao: string
  habilidades: string
  experiencia: string
}

export function CVGenerator() {
  const [open, setOpen] = useState(false)
  const [isFirstJob, setIsFirstJob] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    contacto: "",
    email: "",
    provincia: "",
    objetivo: "",
    educacao: "",
    habilidades: "",
    experiencia: "",
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generatePDF = async () => {
    setIsGenerating(true)
    
    try {
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()
      
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 20
      const contentWidth = pageWidth - margin * 2
      let yPos = 20

      // Header com nome
      doc.setFillColor(37, 99, 235) // Azul Royal
      doc.rect(0, 0, pageWidth, 45, "F")
      
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.setFont("helvetica", "bold")
      doc.text(formData.nome || "Seu Nome", pageWidth / 2, 25, { align: "center" })
      
      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      const contactInfo = `${formData.contacto} | ${formData.email} | ${formData.provincia}`
      doc.text(contactInfo, pageWidth / 2, 37, { align: "center" })
      
      yPos = 60
      doc.setTextColor(37, 99, 235)
      
      // Função auxiliar para adicionar seção
      const addSection = (title: string, content: string) => {
        if (!content.trim()) return
        
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(37, 99, 235)
        doc.text(title, margin, yPos)
        yPos += 2
        
        doc.setDrawColor(37, 99, 235)
        doc.setLineWidth(0.5)
        doc.line(margin, yPos, margin + contentWidth, yPos)
        yPos += 8
        
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(60, 60, 60)
        
        const lines = doc.splitTextToSize(content, contentWidth)
        doc.text(lines, margin, yPos)
        yPos += lines.length * 6 + 10
      }

      // Objetivo
      addSection("OBJETIVO PROFISSIONAL", formData.objetivo)
      
      // Educação
      addSection("EDUCAÇÃO", formData.educacao)
      
      // Habilidades
      addSection("HABILIDADES", formData.habilidades)
      
      // Experiência (apenas se não for primeiro emprego)
      if (!isFirstJob && formData.experiencia) {
        addSection("EXPERIÊNCIA PROFISSIONAL", formData.experiencia)
      }
      
      // Rodapé
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text("Currículo gerado por MozEmpregos - www.mozempregos.co.mz", pageWidth / 2, 285, { align: "center" })
      
      doc.save(`curriculo-${formData.nome.replace(/\s+/g, "-").toLowerCase() || "meu-curriculo"}.pdf`)
    } catch {
      console.error("Erro ao gerar PDF")
    } finally {
      setIsGenerating(false)
    }
  }

  const isFormValid = formData.nome && formData.contacto && formData.email && formData.provincia

  return (
    <section className="py-8 px-4 bg-secondary">
      <div className="container mx-auto max-w-3xl">
        <Card className="bg-card border-border">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl text-foreground">Crie seu Currículo Grátis</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Preencha seus dados e baixe um currículo profissional em PDF
            </p>
          </CardHeader>
          <CardContent>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12">
                  Criar Meu Currículo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-foreground">
                    <FileText className="w-5 h-5 text-primary" />
                    Gerador de Currículo
                  </DialogTitle>
                </DialogHeader>
                
                <form className="flex flex-col gap-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="nome" className="text-foreground">Nome Completo *</Label>
                    <Input
                      id="nome"
                      placeholder="Ex: João Manuel Silva"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contacto" className="text-foreground">Contacto (+258) *</Label>
                    <Input
                      id="contacto"
                      placeholder="Ex: +258 84 123 4567"
                      value={formData.contacto}
                      onChange={(e) => handleInputChange("contacto", e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-foreground">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ex: joao.silva@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="provincia" className="text-foreground">Província *</Label>
                    <Select 
                      value={formData.provincia} 
                      onValueChange={(value) => handleInputChange("provincia", value)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Selecione sua província" />
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
                  
                  <div className="flex items-center justify-between py-3 px-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex flex-col">
                      <Label htmlFor="first-job" className="text-foreground font-medium">
                        É meu primeiro emprego?
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        Foque em objetivo e educação
                      </span>
                    </div>
                    <Switch
                      id="first-job"
                      checked={isFirstJob}
                      onCheckedChange={setIsFirstJob}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="objetivo" className="text-foreground">Objetivo Profissional</Label>
                    <Textarea
                      id="objetivo"
                      placeholder="Ex: Busco uma oportunidade para desenvolver minhas habilidades e contribuir para o crescimento da empresa."
                      value={formData.objetivo}
                      onChange={(e) => handleInputChange("objetivo", e.target.value)}
                      className="bg-background min-h-[80px]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="educacao" className="text-foreground">Educação</Label>
                    <Textarea
                      id="educacao"
                      placeholder="Ex: Ensino Médio Completo - Escola Secundária de Maputo (2020)"
                      value={formData.educacao}
                      onChange={(e) => handleInputChange("educacao", e.target.value)}
                      className="bg-background min-h-[80px]"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="habilidades" className="text-foreground">Habilidades</Label>
                    <Textarea
                      id="habilidades"
                      placeholder="Ex: Comunicação, Trabalho em equipe, Informática básica, Atendimento ao cliente"
                      value={formData.habilidades}
                      onChange={(e) => handleInputChange("habilidades", e.target.value)}
                      className="bg-background min-h-[80px]"
                    />
                  </div>
                  
                  {!isFirstJob && (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="experiencia" className="text-foreground">Experiência Profissional</Label>
                      <Textarea
                        id="experiencia"
                        placeholder="Ex: Atendente de Loja - Loja XYZ (2021-2023)&#10;- Atendimento ao cliente&#10;- Organização de produtos"
                        value={formData.experiencia}
                        onChange={(e) => handleInputChange("experiencia", e.target.value)}
                        className="bg-background min-h-[100px]"
                      />
                    </div>
                  )}
                  
                  <Button
                    type="button"
                    onClick={generatePDF}
                    disabled={!isFormValid || isGenerating}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12 mt-2"
                  >
                    {isGenerating ? (
                      "Gerando..."
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        BAIXAR CURRÍCULO EM PDF
                      </>
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
