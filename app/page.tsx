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
import { supabase } from '@/lib/supabase'


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
  const [vagaSelecionada, setVagaSelecionada] = useState<typeof vagas[0] | null>(null)

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
      // SALVAR NO SUPABASE (CORRIGIDO)
      const { error } = await supabase
        .from('Sol')
        .insert([
          { 
            nome_completo: nome, 
            vaga_desejada: vaga, 
            telefone: telefone, 
            email: email, // Corrigido de "e-mail" para "email"
            qualificacoes: qualificacoes 
          }
        ])

      if (error) {
        console.error("Erro no Supabase:", error.message)
        alert("Erro ao salvar no Supabase: " + error.message + "\n\nVerifique se as Políticas (RLS) estão habilitadas no painel do Supabase.")
      } else {
        console.log("Dados salvos com sucesso no Supabase!")
      }
    } catch (err) {
      console.error("Erro inesperado:", err)
    } finally {
      setIsSaving(false)
    }

    // GERAÇÃO DO PDF
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

        {/* Vagas Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="w-6 h-6 text-[#1e40af]" />
                Vagas Recentes
              </h2>
              <span className="text-muted-foreground text-sm">{filteredVagas.length} vagas encontradas</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVagas.map((v) => (
                <Card key={v.id} className="hover:shadow-lg transition-shadow border-t-4 border-t-[#1e40af]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{v.titulo}</CardTitle>
                      <span className="bg-blue-100 text-[#1e40af] text-xs font-bold px-2 py-1 rounded">
                        {v.tipo}
                      </span>
                    </div>
                    <p className="text-[#10b981] font-semibold">{v.empresa}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {v.local}
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {v.salario}
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        setVagaSelecionada(v)
                        setVaga(v.titulo)
                        setModalCandidatura(true)
                      }}
                      className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white"
                    >
                      Ver Detalhes
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
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quem usou, aprovou!</h2>
              <p className="text-muted-foreground">Milhares de jovens moçambicanos já conseguiram emprego através da nossa plataforma.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {depoimentos.map((d, i) => (
                <Card key={i} className="bg-muted/20 border-none shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm italic mb-6">"{d.texto}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1e40af] flex items-center justify-center text-white font-bold">
                        {d.nome[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{d.nome}</p>
                        <p className="text-xs text-muted-foreground">{d.cargo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#10b981] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-balance">Dúvidas? Fale conosco pelo WhatsApp</h2>
            <p className="text-xl mb-8 opacity-90">Atendimento grátis para ajudar você a conseguir sua vaga.</p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#10b981] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Chamar no WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-6 w-6" />
                <span className="text-xl font-bold">MozEmpregos</span>
              </div>
              <p className="text-blue-200 text-sm">
                A maior plataforma de empregos para jovens em Moçambique. Nosso objetivo é reduzir o desemprego e criar oportunidades.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><button onClick={() => setModalCandidatura(true)} className="hover:text-white">Gerar Currículo</button></li>
                <li><a href="#" className="hover:text-white">Vagas em Maputo</a></li>
                <li><a href="#" className="hover:text-white">Vagas na Beira</a></li>
                <li><a href="#" className="hover:text-white">Vagas em Nampula</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contato@mozempregos.co.mz</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +258 84 000 0000</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Av. 25 de Setembro, Maputo</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-sm text-blue-300">
            <p>© {new Date().getFullYear()} MozEmpregos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Candidatura / Gerador de CV */}
      {modalCandidatura && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setModalCandidatura(false)}
              className="absolute right-4 top-4 p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="w-6 h-6 text-[#1e40af]" />
                {vagaSelecionada ? `Candidatar-se para: ${vagaSelecionada.titulo}` : "Gerar Meu Currículo Grátis"}
              </CardTitle>
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
                        Salvando dados...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        Gerar Currículo e Enviar Candidatura
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Ao clicar em gerar, seus dados serão enviados para a empresa e um arquivo PDF será baixado no seu dispositivo.
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600">Sucesso!</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Seu currículo foi gerado e sua candidatura foi enviada com sucesso para o banco de dados.
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
