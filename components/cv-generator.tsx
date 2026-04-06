"use client"

import { useState } from "react"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FormData {
  nome: string
  vagaDesejada: string
  telefone: string
  email: string
  qualificacoes: string
}

export function CVGenerator() {
  const [open, setOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    vagaDesejada: "",
    telefone: "",
    email: "",
    qualificacoes: "",
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

      // Header com nome - Azul Royal #1e40af
      doc.setFillColor(30, 64, 175)
      doc.rect(0, 0, pageWidth, 45, "F")
      
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.setFont("helvetica", "bold")
      doc.text(formData.nome || "Seu Nome", pageWidth / 2, 25, { align: "center" })
      
      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      const contactInfo = `${formData.telefone} | ${formData.email}`
      doc.text(contactInfo, pageWidth / 2, 37, { align: "center" })
      
      yPos = 60
      
      // Função auxiliar para adicionar seção
      const addSection = (title: string, content: string) => {
        if (!content.trim()) return
        
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(30, 64, 175) // Azul Royal
        doc.text(title, margin, yPos)
        yPos += 2
        
        doc.setDrawColor(30, 64, 175)
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

      // Vaga Desejada
      addSection("VAGA DESEJADA", formData.vagaDesejada)
      
      // Qualificações
      addSection("QUALIFICAÇÕES", formData.qualificacoes)
      
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

  const isFormValid = formData.nome && formData.vagaDesejada && formData.telefone && formData.email

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
                  <DialogDescription>
                    Preencha seus dados abaixo para gerar e baixar seu currículo em PDF.
                  </DialogDescription>
                </DialogHeader>
                
                <form className="flex flex-col gap-4 mt-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="nome" className="text-foreground">Nome *</Label>
                    <Input
                      id="nome"
                      placeholder="Ex: João Manuel Silva"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="vagaDesejada" className="text-foreground">Vaga Desejada *</Label>
                    <Input
                      id="vagaDesejada"
                      placeholder="Ex: Repositor, Recepcionista, Segurança"
                      value={formData.vagaDesejada}
                      onChange={(e) => handleInputChange("vagaDesejada", e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="telefone" className="text-foreground">Telefone *</Label>
                    <Input
                      id="telefone"
                      placeholder="Ex: +258 84 123 4567"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-foreground">E-mail *</Label>
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
                    <Label htmlFor="qualificacoes" className="text-foreground">Qualificações</Label>
                    <Textarea
                      id="qualificacoes"
                      placeholder="Ex: Ensino Médio Completo, Curso de Informática, Experiência em atendimento ao cliente..."
                      value={formData.qualificacoes}
                      onChange={(e) => handleInputChange("qualificacoes", e.target.value)}
                      className="bg-background min-h-[120px]"
                    />
                  </div>
                  
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
                        Baixar Currículo
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
