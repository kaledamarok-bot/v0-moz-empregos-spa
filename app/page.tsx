"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Search, MapPin, Briefcase, Phone, Mail, User, FileText, MessageCircle, Clock, DollarSign, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dados das vagas
const vagas = [
  {
    id: 1,
    titulo: "Repositor",
    empresa: "Supermercado Central",
    local: "Maputo",
    salario: "15.000 MT",
    tipo: "Tempo Integral",
    descricao: "Reposição de produtos nas prateleiras e organização do estoque."
  },
  {
    id: 2,
    titulo: "Recepcionista",
    empresa: "Hotel Polana",
    local: "Maputo",
    salario: "18.000 MT",
    tipo: "Tempo Integral",
    descricao: "Atendimento ao cliente, gestão de reservas e suporte administrativo."
  },
  {
    id: 3,
    titulo: "Auxiliar de Limpeza",
    empresa: "Clínica Saúde+",
    local: "Beira",
    salario: "12.000 MT",
    tipo: "Tempo Integral",
    descricao: "Limpeza e higienização das instalações da clínica."
  },
  {
    id: 4,
    titulo: "Caixa",
    empresa: "Loja ModaStyle",
    local: "Maputo",
    salario: "14.000 MT",
    tipo: "Tempo Integral",
    descricao: "Operação de caixa, atendimento ao cliente e fechamento diário."
  },
  {
    id: 5,
    titulo: "Segurança",
    empresa: "Centro Comercial Maputo",
    local: "Maputo",
    salario: "16.000 MT",
    tipo: "Tempo Integral",
    descricao: "Vigilância patrimonial, controle de acesso e rondas de segurança."
  },
  {
    id: 6,
    titulo: "Vendedor",
    empresa: "TechStore Moçambique",
    local: "Nampula",
    salario: "13.000 MT + Comissão",
    tipo: "Tempo Integral",
    descricao: "Vendas de produtos eletrônicos, atendimento ao cliente e metas mensais."
  },
]

// Depoimentos
const depoimentos = [
  {
    nome: "Artur Machava",
    cargo: "Repositor",
    texto: "Consegui meu primeiro emprego em apenas 2 semanas usando o MozEmpregos! Agora trabalho no Supermercado Central e estou muito feliz.",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    nome: "Fátima Nhaca",
    cargo: "Recepcionista",
    texto: "O gerador de currículo me ajudou muito. Agora trabalho no melhor hotel da cidade! Obrigada MozEmpregos!",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    nome: "Carlos Sitoe",
    cargo: "Auxiliar de Limpeza",
    texto: "Estava desempregado há 6 meses. Graças ao MozEmpregos, voltei ao mercado e posso sustentar minha família.",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
  },
  {
    nome: "Ana Mondlane",
    cargo: "Atendente",
    texto: "Plataforma simples e eficiente. Recomendo a todos os jovens que buscam o primeiro emprego!",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    nome: "João Tembe",
    cargo: "Segurança",
    texto: "Nunca pensei que seria tão fácil encontrar emprego. Em uma semana já estava trabalhando! Muito grato.",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    nome: "Maria Cossa",
    cargo: "Caixa",
    texto: "O MozEmpregos mudou minha vida. Saí do desemprego e agora tenho uma carreira estável. Recomendo muito!",
    foto: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face"
  },
  {
    nome: "Pedro Matusse",
    cargo: "Vendedor",
    texto: "Encontrei a vaga perfeita para mim. A comissão é excelente e o ambiente de trabalho é ótimo!",
    foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
  },
  {
    nome: "Teresa Langa",
    cargo: "Recepcionista",
    texto: "Meu currículo ficou muito profissional com o gerador do MozEmpregos. Foi isso que me destacou na entrevista!",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
  },
]

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
  "Niassa"
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvincia, setSelectedProvincia] = useState("Todas as Províncias")
  
  // Form do currículo
  const [nome, setNome] = useState("")
  const [vaga, setVaga] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [qualificacoes, setQualificacoes] = useState("")
  const [cvGerado, setCvGerado] = useState(false)
  
  // Modal de candidatura
  const [modalCandidatura, setModalCandidatura] = useState(false)
  const [vagaSelecionada, setVagaSelecionada] = useState<typeof vagas[0] | null>(null)

  const filteredVagas = vagas.filter(v => {
    const matchSearch = v.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       v.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    const matchProvincia = selectedProvincia === "Todas as Províncias" || 
                          v.local.toLowerCase().includes(selectedProvincia.toLowerCase().replace(" cidade", "").replace(" província", ""))
    return matchSearch && matchProvincia
  })

  const gerarPDF = () => {
    if (!nome || !vaga || !telefone || !email) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    const doc = new jsPDF()
    
    // Header
    doc.setFillColor(30, 64, 175) // Royal Blue
    doc.rect(0, 0, 210, 40, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(nome.toUpperCase(), 105, 25, { align: "center" })
    
    // Linha decorativa
    doc.setFillColor(16, 185, 129) // Emerald
    doc.rect(0, 40, 210, 3, "F")
    
    // Informações de contato
    doc.setTextColor(30, 64, 175)
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text(`Telefone: ${telefone}  |  E-mail: ${email}`, 105, 52, { align: "center" })
    
    // Vaga desejada
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("VAGA DESEJADA", 20, 70)
    doc.setFillColor(16, 185, 129)
    doc.rect(20, 72, 40, 1, "F")
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(vaga, 20, 82)
    
    // Qualificações
    if (qualificacoes) {
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("QUALIFICAÇÕES", 20, 100)
      doc.setFillColor(16, 185, 129)
      doc.rect(20, 102, 40, 1, "F")
      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      
      const linhas = doc.splitTextToSize(qualificacoes, 170)
      doc.text(linhas, 20, 112)
    }
    
    // Footer
    doc.setFontSize(9)
    doc.setTextColor(128, 128, 128)
    doc.text("Currículo gerado por MozEmpregos - www.mozempregos.co.mz", 105, 285, { align: "center" })
    
    doc.save(`curriculo-${nome.toLowerCase().replace(/\s+/g, "-")}.pdf`)
    setCvGerado(true)
  }

  const whatsappNumber = "5531996202522"
  const whatsappMessage = encodeURIComponent("Olá! Vim pelo MozEmpregos e gostaria de mais informações sobre vagas de emprego.")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-[#1e40af] text-white shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-7 w-7" />
            <span className="text-xl font-bold">MozEmpregos</span>
          </div>
          <Button 
            onClick={() => {
              setVagaSelecionada(null)
              setModalCandidatura(true)
            }}
            className="bg-[#10b981] hover:bg-[#059669] text-white font-semibold"
          >
            <FileText className="w-4 h-4 mr-2" />
            Candidatar-se
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#1e40af] to-[#1e3a8a] text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Encontre Seu Primeiro Emprego em Moçambique
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto text-pretty">
              Vagas de Repositor, Recepcionista, Segurança e muito mais. Tudo grátis!
            </p>
            
            {/* Busca */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl p-4 shadow-xl">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar vaga ou empresa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-foreground"
                  />
                </div>
                <div className="w-full md:w-56">
                  <Select value={selectedProvincia} onValueChange={setSelectedProvincia}>
                    <SelectTrigger className="h-12 text-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {provincias.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="h-12 px-8 bg-[#1e40af] hover:bg-[#1e3a8a] text-white">
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Vagas */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
              Oportunidades de Emprego
            </h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {filteredVagas.map((vaga) => (
                <Card key={vaga.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-[#1e40af]">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-foreground">{vaga.titulo}</CardTitle>
                        <p className="text-sm text-muted-foreground">{vaga.empresa}</p>
                      </div>
                      <span className="bg-[#10b981]/10 text-[#10b981] text-xs font-semibold px-2 py-1 rounded">
                        Nova
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{vaga.descricao}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {vaga.local}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {vaga.tipo}
                      </span>
                      <span className="flex items-center gap-1 text-[#10b981] font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {vaga.salario}
                      </span>
                    </div>
                    <Button 
                      className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white"
                      onClick={() => {
                        setVagaSelecionada(vaga)
                        setVaga(vaga.titulo)
                        setModalCandidatura(true)
                      }}
                    >
                      Candidatar-se
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVagas.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-lg">Nenhuma vaga encontrada com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </section>

        {/* Gerador de Currículo */}
        <section id="curriculo" className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <FileText className="w-12 h-12 mx-auto text-[#1e40af] mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Gerador de Currículo Grátis
                </h2>
                <p className="text-muted-foreground">
                  Preencha seus dados e baixe um currículo profissional em PDF
                </p>
              </div>

              <Card className="shadow-lg border-t-4 border-t-[#1e40af]">
                <CardContent className="p-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#1e40af]" />
                        Nome Completo *
                      </Label>
                      <Input
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vaga" className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#1e40af]" />
                        Vaga Desejada *
                      </Label>
                      <Input
                        id="vaga"
                        value={vaga}
                        onChange={(e) => setVaga(e.target.value)}
                        placeholder="Ex: Repositor, Recepcionista"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#1e40af]" />
                        Telefone *
                      </Label>
                      <Input
                        id="telefone"
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="+258 84 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#1e40af]" />
                        E-mail *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualificacoes" className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#1e40af]" />
                      Qualificações
                    </Label>
                    <Textarea
                      id="qualificacoes"
                      value={qualificacoes}
                      onChange={(e) => setQualificacoes(e.target.value)}
                      placeholder="Descreva suas habilidades, formação e experiências relevantes..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={gerarPDF}
                    className="w-full h-12 text-lg font-semibold bg-[#10b981] hover:bg-[#059669] text-white"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Baixar Currículo em PDF
                  </Button>

                  {cvGerado && (
                    <p className="text-center text-[#10b981] font-medium">
                      Currículo gerado com sucesso! Verifique seus downloads.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-foreground">
              Historias de Sucesso
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Veja o que nossos candidatos dizem sobre o MozEmpregos
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {depoimentos.map((dep, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={dep.foto} 
                        alt={`Foto de ${dep.nome}`}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#1e40af]"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{dep.nome}</p>
                        <p className="text-sm text-[#10b981] font-medium">{dep.cargo}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm italic">&ldquo;{dep.texto}&rdquo;</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Aviso Anti-Burla */}
        <section className="py-8 bg-red-50 border-y border-red-200">
          <div className="container mx-auto px-4 text-center">
            <p className="text-red-700 font-semibold text-lg">
              Nunca pague por entrevistas ou processos seletivos! O MozEmpregos é 100% gratuito.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e40af] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="h-6 w-6" />
            <span className="text-lg font-bold">MozEmpregos</span>
          </div>
          <p className="text-blue-200 text-sm">
            Conectando jovens moçambicanos ao mercado de trabalho desde 2024
          </p>
          <p className="text-blue-300 text-xs mt-4">
            &copy; 2024 MozEmpregos. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* WhatsApp Flutuante */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Falar pelo WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Modal Candidatura */}
      {modalCandidatura && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalCandidatura(false)
          }}
        >
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="bg-background rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 id="modal-title" className="text-xl font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#1e40af]" />
                  {vagaSelecionada ? `Candidatura: ${vagaSelecionada.titulo}` : "Preencher Currículo"}
                </h3>
                <button 
                  onClick={() => setModalCandidatura(false)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p id="modal-description" className="text-muted-foreground text-sm mb-6">
                {vagaSelecionada 
                  ? `Preencha seus dados para se candidatar à vaga de ${vagaSelecionada.titulo} na ${vagaSelecionada.empresa}.`
                  : "Preencha seus dados e baixe seu currículo em PDF para se candidatar às vagas."
                }
              </p>
              
              {vagaSelecionada && (
                <div className="bg-[#1e40af]/5 border border-[#1e40af]/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{vagaSelecionada.titulo}</p>
                      <p className="text-sm text-muted-foreground">{vagaSelecionada.empresa} - {vagaSelecionada.local}</p>
                    </div>
                    <span className="text-[#10b981] font-semibold text-sm">{vagaSelecionada.salario}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#1e40af]" />
                    Nome Completo *
                  </Label>
                  <Input 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome completo" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#1e40af]" />
                    Vaga Desejada *
                  </Label>
                  <Input 
                    value={vaga}
                    onChange={(e) => setVaga(e.target.value)}
                    placeholder="Ex: Repositor, Recepcionista" 
                  />
                </div>
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#1e40af]" />
                      Telefone *
                    </Label>
                    <Input 
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="+258 84 123 4567" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#1e40af]" />
                      E-mail *
                    </Label>
                    <Input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#1e40af]" />
                    Qualificações
                  </Label>
                  <Textarea 
                    value={qualificacoes}
                    onChange={(e) => setQualificacoes(e.target.value)}
                    placeholder="Descreva suas habilidades, formação e experiências relevantes..." 
                    rows={4} 
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setModalCandidatura(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white"
                    onClick={() => {
                      gerarPDF()
                      setModalCandidatura(false)
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Baixar Currículo
                  </Button>
                </div>

                {cvGerado && (
                  <p className="text-center text-[#10b981] font-medium">
                    Currículo gerado com sucesso! Verifique seus downloads.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
