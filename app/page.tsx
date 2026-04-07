"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Search, MapPin, Briefcase, Phone, Mail, User, FileText, MessageCircle, Clock, DollarSign, Star, X, Loader2 } from "lucide-react"
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
    foto: "/photos/artur.jpg"
  },
  {
    nome: "Fatima Nhaca",
    cargo: "Recepcionista",
    texto: "O gerador de curriculo me ajudou muito. Agora trabalho no melhor hotel da cidade! Obrigada MozEmpregos!",
    foto: "/photos/fatima.jpg"
  },
  {
    nome: "Carlos Sitoe",
    cargo: "Auxiliar de Limpeza",
    texto: "Estava desempregado ha 6 meses. Gracas ao MozEmpregos, voltei ao mercado e posso sustentar minha familia.",
    foto: "/photos/carlos.jpg"
  },
  {
    nome: "Ana Mondlane",
    cargo: "Atendente",
    texto: "Plataforma simples e eficiente. Recomendo a todos os jovens que buscam o primeiro emprego!",
    foto: "/photos/ana.jpg"
  },
  {
    nome: "Joao Tembe",
    cargo: "Seguranca",
    texto: "Nunca pensei que seria tao facil encontrar emprego. Em uma semana ja estava trabalhando! Muito grato.",
    foto: "/photos/joao.jpg"
  },
  {
    nome: "Maria Cossa",
    cargo: "Caixa",
    texto: "O MozEmpregos mudou minha vida. Sai do desemprego e agora tenho uma carreira estavel. Recomendo muito!",
    foto: "/photos/maria.jpg"
  },
  {
    nome: "Pedro Matusse",
    cargo: "Vendedor",
    texto: "Encontrei a vaga perfeita para mim. A comissao e excelente e o ambiente de trabalho e otimo!",
    foto: "/photos/pedro.jpg"
  },
  {
    nome: "Teresa Langa",
    cargo: "Recepcionista",
    texto: "Meu curriculo ficou muito profissional com o gerador do MozEmpregos. Foi isso que me destacou na entrevista!",
    foto: "/photos/teresa.jpg"
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
  const [isSaving, setIsSaving] = useState(false)
  
  // Modal de candidatura
  const [modalCandidatura, setModalCandidatura] = useState(false)
  const [vagaSelecionada, setVagaSelecionada] = useState(null)

  const filteredVagas = vagas.filter(v => {
    const matchSearch = v.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       v.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    const matchProvincia = selectedProvincia === "Todas as Províncias" || 
                          v.local.toLowerCase().includes(selectedProvincia.toLowerCase().replace(" cidade", "").replace(" província", ""))
    return matchSearch && matchProvincia
  })

  const gerarPDF = async () => {
    if (!nome || !vaga || !telefone || !email) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    setIsSaving(true)

    try {
      // 1. ENVIA OS DADOS PARA O E-MAIL VIA FORMSPREE
      const response = await fetch("https://formspree.io/f/mqaebrjr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          nome_completo: nome,
          vaga_desejada: vaga,
          telefone: telefone,
          email: email,
          qualificacoes: qualificacoes,
          _subject: `Nova Candidatura: ${nome} - ${vaga}`
        })
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar os dados para o e-mail.")
      }

      console.log("Dados enviados com sucesso para o e-mail!")

      // 2. GERA O PDF
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
    } catch (err) {
      console.error("Erro inesperado:", err)
      alert("Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente.")
    } finally {
      setIsSaving(false)
    }
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
                    className="pl-10 h-12 text-black"
                  />
                </div>
                <Select value={selectedProvincia} onValueChange={setSelectedProvincia}>
                  <SelectTrigger className="w-full md:w-[220px] h-12 text-black">
                    <SelectValue placeholder="Província" />
                  </SelectTrigger>
                  <SelectContent>
                    {provincias.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="h-12 px-8 bg-[#10b981] hover:bg-[#059669] font-bold">
                  BUSCAR
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Vagas Section */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#1e40af]">Vagas em Destaque</h2>
              <span className="text-muted-foreground">{filteredVagas.length} vagas encontradas</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVagas.map((v) => (
                <Card key={v.id} className="hover:shadow-lg transition-shadow border-blue-100">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <Briefcase className="w-6 h-6 text-[#1e40af]" />
                      </div>
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">
                        {v.tipo}
                      </span>
                    </div>
                    <CardTitle className="text-xl mt-4">{v.titulo}</CardTitle>
                    <p className="text-muted-foreground font-medium">{v.empresa}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {v.local}, Moçambique
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {v.salario}
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2 mb-6">
                      {v.descricao}
                    </p>
                    <Button 
                      onClick={() => {
                        setVagaSelecionada(v)
                        setVaga(v.titulo)
                        setModalCandidatura(true)
                      }}
                      className="w-full bg-white text-[#1e40af] border-2 border-[#1e40af] hover:bg-blue-50 font-bold"
                    >
                      VER DETALHES
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1e40af] mb-12">Quem usou, aprovou!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {depoimentos.map((d, i) => (
                <Card key={i} className="bg-blue-50 border-none shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{d.nome}</p>
                        <p className="text-xs text-muted-foreground">{d.cargo}</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-sm italic text-slate-600">"${d.texto}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Floating */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        >
          <MessageCircle className="w-8 h-8" />
        </a>
      </main>

      <footer className="bg-[#1e3a8a] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-6 w-6" />
                <span className="text-xl font-bold">MozEmpregos</span>
              </div>
              <p className="text-blue-100 text-sm">
                A maior plataforma de empregos para o primeiro trabalho em Moçambique.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><a href="#" className="hover:text-white">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white">Vagas Recentes</a></li>
                <li><a href="#" className="hover:text-white">Gerador de Currículo</a></li>
                <li><a href="#" className="hover:text-white">Dicas de Entrevista</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contato@mozempregos.co.mz</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +258 84 000 0000</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Maputo, Moçambique</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-sm text-blue-200">
            <p>© 2026 MozEmpregos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Candidatura */}
      {modalCandidatura && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-none">
            <CardHeader className="bg-[#1e40af] text-white sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">Gerador de Currículo</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setModalCandidatura(false)}
                  className="text-white hover:bg-blue-700"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <p className="text-blue-100 text-sm">Preencha seus dados para gerar o PDF e se candidatar.</p>
            </CardHeader>
            <CardContent className="pt-6">
              {!cvGerado ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="nome" 
                          placeholder="Ex: Artur Machava" 
                          className="pl-10"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vaga">Vaga Desejada *</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="vaga" 
                          placeholder="Ex: Repositor de Mercadorias" 
                          className="pl-10"
                          value={vaga}
                          onChange={(e) => setVaga(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="telefone" 
                          placeholder="Ex: +258 84 000 0000" 
                          className="pl-10"
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Ex: artur@email.com" 
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualificacoes">Resumo de Qualificações / Experiência</Label>
                    <Textarea 
                      id="qualificacoes" 
                      placeholder="Conte um pouco sobre suas habilidades e onde já trabalhou..." 
                      className="min-h-[120px] resize-none"
                      value={qualificacoes}
                      onChange={(e) => setQualificacoes(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={gerarPDF}
                    disabled={isSaving}
                    className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-6 text-lg font-bold shadow-lg"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando candidatura...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Gerar Currículo e Enviar Candidatura
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600">Sucesso!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Seu currículo foi gerado e sua candidatura foi enviada com sucesso para o e-mail.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={() => setCvGerado(false)}
                      variant="outline"
                      className="w-full"
                    >
                      Editar Informações
                    </Button>
                    <Button 
                      onClick={() => setModalCandidatura(false)}
                      className="w-full bg-[#1e40af] hover:bg-[#1e3a8a]"
                    >
                      Voltar para as Vagas
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
