"use client"

import { useState } from "react"
import jsPDF from "jspdf"
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
  { id: 1, titulo: "Repositor", empresa: "Supermercado Central", local: "Maputo", salario: "15.000 MT", tipo: "Tempo Integral", descricao: "Reposição de produtos nas prateleiras e organização do estoque." },
  { id: 2, titulo: "Recepcionista", empresa: "Hotel Polana", local: "Maputo", salario: "18.000 MT", tipo: "Tempo Integral", descricao: "Atendimento ao cliente, gestão de reservas e suporte administrativo." },
  { id: 3, titulo: "Auxiliar de Limpeza", empresa: "Clínica Saúde+", local: "Beira", salario: "12.000 MT", tipo: "Tempo Integral", descricao: "Limpeza e higienização das instalações da clínica." },
  { id: 4, titulo: "Caixa", empresa: "Loja ModaStyle", local: "Maputo", salario: "14.000 MT", tipo: "Tempo Integral", descricao: "Operação de caixa, atendimento ao cliente e fechamento diário." },
  { id: 5, titulo: "Segurança", empresa: "Centro Comercial Maputo", local: "Maputo", salario: "16.000 MT", tipo: "Tempo Integral", descricao: "Vigilância patrimonial, controle de acesso e rondas de segurança." },
  { id: 6, titulo: "Vendedor", empresa: "TechStore Moçambique", local: "Nampula", salario: "13.000 MT + Comissão", tipo: "Tempo Integral", descricao: "Vendas de produtos eletrônicos, atendimento ao cliente e metas mensais." },
]

// Depoimentos
const depoimentos = [
  { nome: "Artur Machava", cargo: "Repositor", texto: "Consegui meu primeiro emprego em apenas 2 semanas usando o MozEmpregos!", foto: "/photos/artur.jpg" },
  { nome: "Fatima Nhaca", cargo: "Recepcionista", texto: "O gerador de currículo me ajudou muito. Agora trabalho no melhor hotel!", foto: "/photos/fatima.jpg" },
  { nome: "Carlos Sitoe", cargo: "Auxiliar de Limpeza", texto: "Estava desempregado há 6 meses. Graças ao MozEmpregos, voltei ao mercado.", foto: "/photos/carlos.jpg" },
  { nome: "Ana Mondlane", cargo: "Atendente", texto: "Plataforma simples e eficiente. Recomendo a todos!", foto: "/photos/ana.jpg" },
]

const provincias = [
  "Todas as Províncias", "Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambézia", "Nampula", "Cabo Delgado", "Niassa"
]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvincia, setSelectedProvincia] = useState("Todas as Províncias")
  const [nome, setNome] = useState("")
  const [vaga, setVaga] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [qualificacoes, setQualificacoes] = useState("")
  const [cvGerado, setCvGerado] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [modalCandidatura, setModalCandidatura] = useState(false)

  const filteredVagas = vagas.filter(v => {
    const matchSearch = v.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || v.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    const matchProvincia = selectedProvincia === "Todas as Províncias" || v.local.toLowerCase().includes(selectedProvincia.toLowerCase().replace(" cidade", "").replace(" província", ""))
    return matchSearch && matchProvincia
  })

  const gerarPDF = async () => {
    if (!nome || !vaga || !telefone || !email) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    setIsSaving(true)

    try {
      await fetch("https://formspree.io/f/mqaebrjr", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ nome_completo: nome, vaga_desejada: vaga, telefone, email, qualificacoes, _subject: `Nova Candidatura: ${nome}` })
      })

      const doc = new jsPDF()
      doc.setFillColor(30, 64, 175); doc.rect(0, 0, 210, 40, "F")
      doc.setTextColor(255, 255, 255); doc.setFontSize(24); doc.setFont("helvetica", "bold"); doc.text(nome.toUpperCase(), 105, 25, { align: "center" })
      doc.setFillColor(16, 185, 129); doc.rect(0, 40, 210, 3, "F")
      doc.setTextColor(30, 64, 175); doc.setFontSize(11); doc.setFont("helvetica", "normal"); doc.text(`Telefone: ${telefone} | E-mail: ${email}`, 105, 52, { align: "center" })
      doc.setTextColor(0, 0, 0); doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.text("VAGA DESEJADA", 20, 70)
      doc.setFontSize(12); doc.setFont("helvetica", "normal"); doc.text(vaga, 20, 82)
      if (qualificacoes) {
        doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.text("QUALIFICAÇÕES", 20, 100)
        doc.setFontSize(11); doc.setFont("helvetica", "normal")
        const linhas = doc.splitTextToSize(qualificacoes, 170); doc.text(linhas, 20, 112)
      }
      doc.save(`curriculo-${nome.toLowerCase().replace(/\s+/g, "-")}.pdf`)
      setCvGerado(true)
    } catch (err) {
      alert("Erro ao enviar. Tente novamente.")
    } finally {
      setIsSaving(false)
    }
  }

  const whatsappNumber = "5531996202522"
  const whatsappMsg = encodeURIComponent("Olá! Vim pelo MozEmpregos e gostaria de informações sobre vagas.")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-[#1e40af] text-white shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2"><Briefcase className="h-7 w-7" /><span className="text-xl font-bold">MozEmpregos</span></div>
          <Button onClick={() => setModalCandidatura(true)} className="bg-[#10b981] hover:bg-[#059669] text-white"><FileText className="w-4 h-4 mr-2" />Candidatar-se</Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-[#1e40af] to-[#1e3a8a] text-white py-12 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Encontre Seu Emprego em Moçambique</h1>
            <div className="max-w-3xl mx-auto bg-white rounded-xl p-4 shadow-xl flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Buscar vaga..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 text-black h-12" />
              </div>
              <Select value={selectedProvincia} onValueChange={setSelectedProvincia}>
                <SelectTrigger className="w-full md:w-[220px] text-black h-12"><SelectValue placeholder="Província" /></SelectTrigger>
                <SelectContent>{provincias.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
              <Button className="h-12 px-8 bg-[#10b981] font-bold">BUSCAR</Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#1e40af] mb-8">Vagas em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVagas.map((v) => (
                <Card key={v.id} className="hover:shadow-lg border-blue-100">
                  <CardHeader>
                    <div className="flex justify-between items-start"><div className="bg-blue-50 p-2 rounded-lg"><Briefcase className="w-6 h-6 text-[#1e40af]" /></div><span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded">{v.tipo}</span></div>
                    <CardTitle className="text-xl mt-4">{v.titulo}</CardTitle>
                    <p className="text-muted-foreground font-medium">{v.empresa}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4 space-y-1">
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{v.local}</div>
                      <div className="flex items-center gap-2"><DollarSign className="w-4 h-4" />{v.salario}</div>
                    </div>
                    <Button onClick={() => { setVaga(v.titulo); setModalCandidatura(true); }} className="w-full border-2 border-[#1e40af] text-[#1e40af] bg-transparent hover:bg-blue-50 font-bold">DETALHES</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-[#1e40af] mb-12">Quem usou, aprovou!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {depoimentos.map((d, i) => (
                <Card key={i} className="bg-blue-50 border-none">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <div><p className="font-bold text-sm">{d.nome}</p><p className="text-xs text-muted-foreground">{d.cargo}</p></div>
                    </div>
                    <p className="text-sm italic text-slate-600">"{d.texto}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"><MessageCircle className="w-8 h-8" /></a>
      </main>

      <footer className="bg-[#1e3a8a] text-white py-12 text-center text-sm">
        <p>© 2026 MozEmpregos. Todos os direitos reservados.</p>
      </footer>

      {modalCandidatura && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-[#1e40af] text-white">
              <div className="flex justify-between items-center"><CardTitle>Gerador de Currículo</CardTitle><Button variant="ghost" onClick={() => setModalCandidatura(false)} className="text-white"><X /></Button></div>
            </CardHeader>
            <CardContent className="pt-6">
              {!cvGerado ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1"><Label>Nome Completo *</Label><Input value={nome} onChange={(e) => setNome(e.target.value)} /></div>
                    <div className="space-y-1"><Label>Vaga Desejada *</Label><Input value={vaga} onChange={(e) => setVaga(e.target.value)} /></div>
                    <div className="space-y-1"><Label>Telefone *</Label><Input value={telefone} onChange={(e) => setTelefone(e.target.value)} /></div>
                    <div className="space-y-1"><Label>E-mail *</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                  </div>
                  <div className="space-y-1"><Label>Resumo de Qualificações</Label><Textarea value={qualificacoes} onChange={(e) => setQualificacoes(e.target.value)} /></div>
                  <Button onClick={gerarPDF} disabled={isSaving} className="w-full bg-[#10b981] py-6 font-bold">{isSaving ? <Loader2 className="animate-spin" /> : "Gerar e Enviar"}</Button>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <h3 className="text-2xl font-bold text-green-600">Sucesso!</h3>
                  <p>Candidatura enviada com sucesso para o e-mail.</p>
                  <Button onClick={() => setModalCandidatura(false)} className="bg-[#1e40af]">Voltar para as Vagas</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

