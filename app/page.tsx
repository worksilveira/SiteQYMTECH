'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Globe, 
  CheckCircle2, 
  Phone, 
  Clock, 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  Layers, 
  AlertTriangle,
  FileSpreadsheet,
  Settings,
  Users,
  Database,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Cpu,
  Smartphone,
  Check,
  Send,
  Sparkles,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom Logo Component
const LogoSVG = ({ className = "h-10 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Hexagon icon with Navy background and Gold stroke */}
    <path d="M30 6 L52 18.5 L52 43.5 L30 56 L8 43.5 L8 18.5 Z" fill="#1A2E4A" stroke="#C9A227" strokeWidth="2" />
    {/* Hebrew letter מ */}
    <text x="30" y="35" fill="#C9A227" fontSize="24" fontWeight="bold" fontFamily="serif" textAnchor="middle" dominantBaseline="middle">
      מ
    </text>
    {/* Text Logo: QYM TECH */}
    <text x="75" y="36" fill="#1A2E4A" fontSize="22" fontWeight="800" fontFamily="sans-serif" letterSpacing="1.5">
      QYM
    </text>
    <text x="135" y="36" fill="#C9A227" fontSize="22" fontWeight="800" fontFamily="sans-serif" letterSpacing="1.5">
      TECH
    </text>
  </svg>
);

// Stepper Interface
interface Step {
  title: string;
  subtitle: string;
  desc: string;
  highlight: string;
}

const STEPS: Step[] = [
  {
    title: "1. Recebimento",
    subtitle: "Inventário e Coleta",
    desc: "Coleta segura de todo o acervo legislativo disponível no município, incluindo livros físicos, pastas de documentos, arquivos em Word e PDFs soltos.",
    highlight: "Processamento seguro e catalogação inicial de 100% dos documentos recebidos."
  },
  {
    title: "2. Digitalização & OCR",
    subtitle: "Conversão Tecnológica",
    desc: "Tratamento digital avançado das imagens e documentos através de OCR (Reconhecimento Óptico de Caracteres), convertendo papel em arquivos digitais totalmente pesquisáveis.",
    highlight: "Transformação de documentos escaneados antigos em textos modernos editáveis."
  },
  {
    title: "3. Compilação Técnica",
    subtitle: "Consolidação Jurídica",
    desc: "Nossa equipe de especialistas correlaciona emendas, revogações explícitas ou tácitas, e alterações textuais ao longo dos anos, gerando uma versão única e consolidada de cada lei.",
    highlight: "Exclusão de redundâncias e eliminação de inseguranças jurídicas nos textos oficiais."
  },
  {
    title: "4. Publicação",
    subtitle: "Acesso à Sociedade",
    desc: "Integração automática e imediata no Portal de Busca da Legislação Municipal, permitindo que servidores e cidadãos acessem as leis atualizadas em tempo real.",
    highlight: "Conformidade total com a Lei de Acesso à Informação e facilitação do controle social."
  }
];

export default function Home() {
  // Navigation active states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stepper state
  const [activeStep, setActiveStep] = useState(0);

  // Interactive Diagnostic Simulator state
  const [municipality, setMunicipality] = useState('');
  const [stateAbbr, setStateAbbr] = useState('PE');
  const [currentPublishing, setCurrentPublishing] = useState('pdf');
  const [simLoading, setSimLoading] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [score, setScore] = useState(0);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('Servidor');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCity, setContactCity] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Handle Diagnostic Simulation
  const handleRunDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!municipality.trim()) return;
    
    setSimLoading(true);
    setTimeout(() => {
      // Calculate a fun custom score based on their selection
      let calculatedScore = 30;
      if (currentPublishing === 'physical') calculatedScore = 15;
      else if (currentPublishing === 'pdf') calculatedScore = 40;
      else if (currentPublishing === 'gazette') calculatedScore = 60;
      else if (currentPublishing === 'system') calculatedScore = 80;

      setScore(calculatedScore);
      setSimLoading(false);
      setShowDiagnostic(true);
    }, 1200);
  };

  // Handle Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;

    setContactSuccess(true);
    // Prepare custom message link for WhatsApp
    const whatsappText = encodeURIComponent(
      `Olá QYM Tech! Meu nome é ${contactName} (${contactRole}) do município de ${contactCity || 'nossa cidade'}. Fiz a simulação no site e gostaria de solicitar uma demonstração do Portal de Legislação Municipal.`
    );
    setTimeout(() => {
      window.open(`https://wa.me/5519994494386?text=${whatsappText}`, '_blank');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans text-[#1A1A2E] selection:bg-[#C9A227]/30 selection:text-[#1A2E4A]">
      
      {/* GLOBAL TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1A2E4A] text-white py-2 px-4 text-center text-xs font-medium border-b border-[#C9A227]/20 flex items-center justify-center space-x-2">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Tecnologia GovTech B2G — Modernização, Compilação e Publicação da Legislação Municipal</span>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#F7F8FA]/90 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo container */}
          <div className="flex items-center">
            <LogoSVG />
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-[#1A2E4A]">
            <a href="#problema" className="hover:text-[#C9A227] transition-colors">O Problema</a>
            <a href="#solucao" className="hover:text-[#C9A227] transition-colors">A Solução</a>
            <a href="#funcionamento" className="hover:text-[#C9A227] transition-colors">Como Funciona</a>
            <a href="#funcionalidades" className="hover:text-[#C9A227] transition-colors">Funcionalidades</a>
            <a href="#para-quem-e" className="hover:text-[#C9A227] transition-colors">Para Quem É</a>
            <a href="#diagnostico" className="hover:text-[#C9A227] transition-colors px-3 py-1 bg-[#1A2E4A]/5 rounded-md border border-[#1A2E4A]/10 text-xs">Simulador</a>
          </nav>

          {/* Contact CTA */}
          <div className="hidden sm:flex items-center space-x-4">
            <a 
              href="https://wa.me/5519994494386"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-xs font-bold bg-[#1A2E4A] hover:bg-[#111F33] text-white border border-[#C9A227]/30 transition-all duration-200 flex items-center space-x-2 shadow-sm"
              id="cta-nav-whatsapp"
            >
              <Phone size={13} className="text-[#C9A227]" />
              <span>Fale Conosco</span>
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1A2E4A] hover:text-[#C9A227] focus:outline-none"
            aria-label="Menu principal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 pt-2 pb-6 space-y-3 text-base font-semibold text-[#1A2E4A]">
                <a href="#problema" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-100">O Problema</a>
                <a href="#solucao" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-100">A Solução</a>
                <a href="#funcionamento" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-100">Como Funciona</a>
                <a href="#funcionalidades" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-100">Funcionalidades</a>
                <a href="#para-quem-e" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-gray-100">Para Quem É</a>
                <a href="#diagnostico" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#C9A227] border-b border-gray-100">Simulador de Maturidade</a>
                
                <div className="pt-2">
                  <a 
                    href="https://wa.me/5519994494386"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-lg text-center font-bold bg-[#1A2E4A] text-white text-sm flex items-center justify-center space-x-2"
                  >
                    <Phone size={14} className="text-[#C9A227]" />
                    <span>WhatsApp: (19) 99944-9438</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative py-16 lg:py-24 overflow-hidden border-b border-gray-200 bg-gradient-to-b from-[#F7F8FA] via-white to-[#F7F8FA]">
        
        {/* Subtle decorative elements matching the visual identity guidelines */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#1A2E4A]/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C9A227]/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 bg-[#1A2E4A]/5 border border-[#1A2E4A]/10 px-3.5 py-1.5 rounded-full text-xs text-[#1A2E4A] font-bold tracking-wide">
                <Sparkles size={13} className="text-[#C9A227]" />
                <span>TECNOLOGIA EXCLUSIVA PARA MUNICÍPIOS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A2E4A] font-serif leading-tight sm:leading-none">
                Modernização Legislativa: A Tecnologia que Conecta <span className="text-[#C9A227]">Câmaras Municipais</span> ao Futuro da Transparência.
              </h1>

              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Simplifique a gestão, a compilação técnica e a publicação das leis municipais com a plataforma especializada GovTech da QYM Tech. Uma solução projetada para a eficiência do setor público e segurança jurídica absoluta.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
                <a 
                  href="https://wa.me/5519994494386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1A2E4A] hover:bg-[#111F33] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-2.5 shadow-lg shadow-[#1A2E4A]/20 border-b-2 border-[#C9A227]"
                  id="btn-hero-cta"
                >
                  <Phone size={16} className="text-[#C9A227]" />
                  <span>Fale Conosco via WhatsApp</span>
                </a>
                
                <a 
                  href="#diagnostico" 
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-gray-50 text-[#1A2E4A] border border-gray-300 font-bold text-sm transition duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Análise de Maturidade Digital</span>
                  <ArrowRight size={14} className="text-[#C9A227]" />
                </a>
              </div>

              {/* Minimalist Trust Badges */}
              <div className="pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-4 text-xs font-semibold text-gray-500">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck size={16} className="text-[#C9A227]" />
                  <span>Segurança Jurídica Absoluta</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Award size={16} className="text-[#1A2E4A]" />
                  <span>Conformidade com a LAI e LC 95</span>
                </div>
              </div>

            </div>

            {/* Hero Right Visual: High-Fidelity Platform Interface Mockup */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xl overflow-hidden">
                
                {/* Visual Glass Header of the Mockup */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3.5">
                  <div className="flex items-center space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                    portal_publico_legislativo.gov
                  </span>
                </div>

                {/* Simulated Platform Content */}
                <div className="bg-[#F8F9FC] rounded-xl p-4 border border-gray-100 space-y-4">
                  
                  {/* Fake header with QYM Logo */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="h-6 w-6 rounded bg-[#1A2E4A] flex items-center justify-center">
                        <span className="text-[10px] text-[#C9A227] font-bold">מ</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#1A2E4A]">Portal Legislativo Oficial</span>
                    </div>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      Online
                    </span>
                  </div>

                  {/* Simulated Search Box */}
                  <div className="bg-white rounded-lg p-2.5 shadow-xs border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-400 flex-1">
                      <Search size={14} className="text-[#1A2E4A]/70" />
                      <span>Buscar leis, decretos, emendas...</span>
                    </div>
                    <button className="bg-[#1A2E4A] hover:bg-[#111F33] text-white text-[10px] font-bold px-3 py-1 rounded-md transition-colors">
                      Buscar
                    </button>
                  </div>

                  {/* Quick Filters */}
                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[9px] font-semibold text-gray-500">
                    <span className="bg-[#C9A227]/10 text-[#1A2E4A] px-2.5 py-1 rounded border border-[#C9A227]/20 whitespace-nowrap">
                      Lei Orgânica
                    </span>
                    <span className="bg-white px-2.5 py-1 rounded border border-gray-200 whitespace-nowrap">
                      Plano Diretor
                    </span>
                    <span className="bg-white px-2.5 py-1 rounded border border-gray-200 whitespace-nowrap">
                      Código Tributário
                    </span>
                  </div>

                  {/* Laws List Mockup */}
                  <div className="space-y-2">
                    
                    {/* Item 1 */}
                    <div className="bg-white p-3 rounded-lg border border-gray-200/60 shadow-xs hover:border-[#C9A227]/40 transition duration-150">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-mono text-gray-400">LEI Nº 1.482/2026</span>
                        <span className="text-[8px] bg-[#C9A227]/10 text-[#1A2E4A] font-bold px-1.5 py-0.5 rounded">
                          Texto Compilado
                        </span>
                      </div>
                      <h4 className="text-[10px] font-bold text-[#1A2E4A] mt-1">
                        Dispõe sobre as diretrizes orçamentárias do município para o exercício financeiro.
                      </h4>
                      <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between items-center text-[8px] text-gray-400">
                        <span>Atualizado há 2 dias</span>
                        <span className="text-[#1A2E4A] font-bold flex items-center">
                          Visualizar Lei <ChevronRight size={8} className="ml-0.5" />
                        </span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white p-3 rounded-lg border border-gray-200/60 shadow-xs">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-mono text-gray-400">DECRETO LEGISLATIVO Nº 482/2025</span>
                        <span className="text-[8px] bg-gray-100 text-gray-600 font-bold px-1.5 py-0.5 rounded">
                          Vigente
                        </span>
                      </div>
                      <h4 className="text-[10px] font-bold text-[#1A2E4A] mt-1">
                        Aprova as contas anuais da Mesa Diretora do Poder Legislativo Municipal.
                      </h4>
                    </div>

                  </div>

                </div>

                {/* Hover overlay badge */}
                <div className="absolute bottom-6 left-4 bg-[#1A2E4A] text-white p-3.5 rounded-xl border border-[#C9A227]/30 shadow-lg max-w-[180px] space-y-1 z-20">
                  <div className="flex items-center space-x-1 text-[#C9A227]">
                    <Sparkles size={12} />
                    <span className="text-[9px] font-extrabold uppercase tracking-wider">Busca de Alta Performance</span>
                  </div>
                  <p className="text-[10px] text-gray-200 font-medium">Encontre qualquer lei em milissegundos.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. O PROBLEMA SECTION */}
      <section id="problema" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest bg-[#C9A227]/10 px-3 py-1 rounded-full">
              Os Desafios Reais
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A2E4A]">
              Obstáculos Críticos no Gerenciamento das Leis Municipais
            </h2>
            <div className="h-1 w-20 bg-[#C9A227] mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed pt-2">
              A desorganização legislativa afeta diretamente a eficiência operacional da Câmara, gera riscos regulatórios sérios e prejudica o acesso do cidadão às leis vigentes.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-[#F7F8FA] border border-gray-200 hover:border-[#1A2E4A]/30 p-8 rounded-2xl transition duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center text-red-700 font-bold group-hover:scale-105 transition duration-300">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#1A2E4A] font-serif">Leis Dispersas e Fragmentadas</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Leis publicadas de forma descentralizada ao longo de décadas. Acervos em arquivos físicos obsoletos, pastas perdidas no computador ou em PDFs desconexos sem ferramentas de busca adequadas.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200/60 text-[11px] font-bold text-[#1A2E4A] flex items-center">
                <span>Insegurança na localização de documentos</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F7F8FA] border border-gray-200 hover:border-[#1A2E4A]/30 p-8 rounded-2xl transition duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold group-hover:scale-105 transition duration-300">
                  <FileText size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#1A2E4A] font-serif">Ausência de Texto Compilado</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Dificuldade extrema em manter o texto das leis atualizado conforme novas emendas são aprovadas. Servidores e vereadores consultam versões desatualizadas de leis que já sofreram alterações profundas.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200/60 text-[11px] font-bold text-[#1A2E4A] flex items-center">
                <span>Risco alto de nulidade em decisões oficiais</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F7F8FA] border border-gray-200 hover:border-[#1A2E4A]/30 p-8 rounded-2xl transition duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-yellow-100 flex items-center justify-center text-[#C9A227] font-bold group-hover:scale-105 transition duration-300">
                  <Globe size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#1A2E4A] font-serif">Falta de Transparência Pública</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Inexistência de um portal amigável de busca para os cidadãos. Dificuldade de conformidade total com a Lei de Acesso à Informação (LAI), afastando o cidadão do controle social.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200/60 text-[11px] font-bold text-[#1A2E4A] flex items-center">
                <span>Passível de questionamentos pelo MP e TCE</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. A SOLUÇÃO SECTION */}
      <section id="solucao" className="py-20 bg-[#F7F8FA] border-t border-b border-gray-200 relative overflow-hidden">
        
        {/* Subtle background graphics */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#C9A227]/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column (Left on Large screens) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xl space-y-6">
                
                <h3 className="text-xl font-bold text-[#1A2E4A] font-serif">O Novo Padrão de Eficiência</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  A QYM Tech entrega muito mais que um software de computador. Nós fazemos a curadoria completa da sua base de leis.
                </p>

                {/* Visual Comparative indicators */}
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-start space-x-3">
                    <div className="h-5 w-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</div>
                    <div>
                      <span className="text-xs font-bold text-red-900 block">Modelo Antigo / Convencional</span>
                      <span className="text-[11px] text-red-700">PDFs bagunçados, leis desatualizadas, busca lenta e insegurança jurídica constante.</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start space-x-3">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</div>
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block">Padrão Tecnológico QYM Tech</span>
                      <span className="text-[11px] text-emerald-700">Legislação totalmente compilada, sistema de busca intuitivo, transparência em 100%.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-center p-4 bg-[#1A2E4A]/5 rounded-xl border border-[#1A2E4A]/10">
                    <span className="text-2xl font-bold text-[#1A2E4A] block">20x Mais Rápido</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Na localização de leis por servidores públicos</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Description Column (Right on Large screens) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              
              <div className="inline-block bg-[#1A2E4A]/5 border border-[#1A2E4A]/10 px-3.5 py-1.5 rounded-full text-xs text-[#1A2E4A] font-bold tracking-wide">
                <span>CONHEÇA A SOLUÇÃO</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A2E4A] leading-tight">
                A Revolução na Gestão da Legislação de Forma Simples e Definitiva
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Nós transformamos o acervo histórico da sua Câmara de Vereadores ou Prefeitura em um ecossistema digital seguro, indexado e de acesso rápido, seguindo as diretrizes constitucionais federais.
              </p>

              {/* Solucao points */}
              <div className="space-y-4 pt-2">
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200 text-[#C9A227] shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A2E4A]">Digitalização Profissional com OCR</h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Convertemos o acervo físico de leis e documentos antigos em formatos digitais pesquisáveis por computador, aplicando inteligência artificial para o tratamento do texto.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200 text-[#C9A227] shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A2E4A]">Compilação Jurídica Especializada</h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Nossa equipe técnica especializada analisa a base legal para cruzar emendas, atualizações e revogações, unificando e gerando textos compilados transparentes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200 text-[#C9A227] shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A2E4A]">Publicação Integrada e Amigável</h4>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Disponibilizamos o Portal Público do Cidadão, uma interface moderna, rápida e otimizada para celulares, permitindo buscas instantâneas por qualquer termo das leis.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. COMO FUNCIONA SECTION */}
      <section id="funcionamento" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest bg-[#C9A227]/10 px-3 py-1 rounded-full">
              Do Físico ao Digital
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A2E4A]">
              Uma Jornada Metódica Rumo ao Futuro Digital
            </h2>
            <div className="h-1 w-20 bg-[#C9A227] mx-auto mt-4 rounded-full" />
            <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed pt-2">
              Seguimos um protocolo técnico rigoroso que garante a integridade de todas as informações legislativas do município.
            </p>
          </div>

          {/* Stepper Interactive Component */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Stepper list selector (Left column) */}
            <div className="lg:col-span-5 space-y-4">
              {STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center space-x-4 cursor-pointer ${
                    activeStep === idx 
                      ? 'bg-[#1A2E4A] border-[#C9A227] text-white shadow-lg' 
                      : 'bg-[#F7F8FA] border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`h-9 w-9 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${
                    activeStep === idx 
                      ? 'bg-[#C9A227] text-[#1A2E4A] border-[#C9A227]' 
                      : 'bg-white text-[#1A2E4A] border-gray-300'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <span className={`text-xs font-bold block ${activeStep === idx ? 'text-[#C9A227]' : 'text-[#1A2E4A]'}`}>
                      Etapa {idx + 1}
                    </span>
                    <span className="text-sm font-bold block leading-tight">{step.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Stepper detail presentation (Right column) */}
            <div className="lg:col-span-7 bg-[#F7F8FA] p-8 rounded-2xl border border-gray-200 min-h-[300px] flex flex-col justify-between shadow-xs">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A227]">
                    Detalhamento do Processo
                  </span>
                  <span className="text-xs bg-[#1A2E4A] text-white font-bold px-2.5 py-0.5 rounded-full">
                    Ativo
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1A2E4A]">
                  {STEPS[activeStep].title}: {STEPS[activeStep].subtitle}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {STEPS[activeStep].desc}
                </p>
              </div>

              {/* Informative highlight block inside stepper detail */}
              <div className="mt-8 p-4 bg-white rounded-xl border-l-4 border-[#C9A227] shadow-xs flex items-start space-x-3">
                <div className="p-1 rounded-full bg-[#1A2E4A]/5 text-[#C9A227] shrink-0">
                  <Sparkles size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1A2E4A] block">Garantia QYM Tech</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {STEPS[activeStep].highlight}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. FUNCIONALIDADES SECTION */}
      <section id="funcionalidades" className="py-20 bg-[#F7F8FA] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold text-[#1A2E4A] uppercase tracking-widest bg-[#1A2E4A]/5 border border-[#1A2E4A]/10 px-3 py-1 rounded-full">
              Recursos da Plataforma
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A2E4A]">
              Tecnologia Completa Feita para a Gestão Pública Moderna
            </h2>
            <div className="h-1 w-20 bg-[#C9A227] mx-auto mt-4 rounded-full" />
            <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed pt-2">
              Uma ferramenta integrada sob demanda com as necessidades de assessores jurídicos, secretários e munícipes.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#1A2E4A]/20 hover:shadow-md transition-all duration-300 space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#1A2E4A]/5 text-[#C9A227] flex items-center justify-center border border-[#1A2E4A]/10">
                <Search size={18} />
              </div>
              <h3 className="text-base font-bold text-[#1A2E4A] font-serif">Portal de Busca Pública</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Mecanismo de busca de altíssima velocidade, permitindo aos cidadãos localizarem leis por palavras-chave, ano, número, assunto, tipo ou autor em frações de segundos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#1A2E4A]/20 hover:shadow-md transition-all duration-300 space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#1A2E4A]/5 text-[#C9A227] flex items-center justify-center border border-[#1A2E4A]/10">
                <FileText size={18} />
              </div>
              <h3 className="text-base font-bold text-[#1A2E4A] font-serif">Editor Jurídico Especializado</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ambiente de edição inteligente com sugestões automáticas de formatação em conformidade com as regras de redação oficiais da Lei Complementar Federal nº 95/1998.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#1A2E4A]/20 hover:shadow-md transition-all duration-300 space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#1A2E4A]/5 text-[#C9A227] flex items-center justify-center border border-[#1A2E4A]/10">
                <Settings size={18} />
              </div>
              <h3 className="text-base font-bold text-[#1A2E4A] font-serif">Painel Administrativo</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Painel simples e intuitivo para os servidores da Câmara gerenciarem com facilidade a inserção, aprovação, categorização e publicação de novos atos oficiais.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#1A2E4A]/20 hover:shadow-md transition-all duration-300 space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#1A2E4A]/5 text-[#C9A227] flex items-center justify-center border border-[#1A2E4A]/10">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-base font-bold text-[#1A2E4A] font-serif">Trilha de Auditoria Segura</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Histórico imutável de todas as modificações e inserções efetuadas no sistema. Segurança jurídica inabalável para respaldar o município em caso de questionamentos externos.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#1A2E4A]/20 hover:shadow-md transition-all duration-300 space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#1A2E4A]/5 text-[#C9A227] flex items-center justify-center border border-[#1A2E4A]/10">
                <Users size={18} />
              </div>
              <h3 className="text-base font-bold text-[#1A2E4A] font-serif">Gestão Multi-Município</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Perfeito para consórcios intermunicipais ou agências reguladoras regionais que precisam consolidar bases legislativas de múltiplos territórios sob uma mesma governança.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#1A2E4A]/20 hover:shadow-md transition-all duration-300 space-y-4">
              <div className="h-10 w-10 rounded-lg bg-[#1A2E4A]/5 text-[#C9A227] flex items-center justify-center border border-[#1A2E4A]/10">
                <Database size={18} />
              </div>
              <h3 className="text-base font-bold text-[#1A2E4A] font-serif">Backup & Sincronização</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Armazenamento seguro em nuvem redundante com backups automáticos recorrentes, garantindo a preservação eterna do patrimônio legislativo da sua cidade.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. PARA QUEM É SECTION */}
      <section id="para-quem-e" className="py-20 bg-white relative overflow-hidden">
        
        {/* Subtle right accent background decoration */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#C9A227]/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-block bg-[#1A2E4A]/5 border border-[#1A2E4A]/10 px-3.5 py-1.5 rounded-full text-xs text-[#1A2E4A] font-bold tracking-wide">
                <span>MODERNIZAÇÃO INTEGRAL</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#1A2E4A] leading-tight">
                Tecnologia Eficiente para a Modernização Legislativa Municipal
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                A QYM Tech nasceu para suprir a demanda urgente de modernização das câmaras municipais, provendo tecnologia robusta, acessível e segura de compilação e publicação de leis para municípios que buscam excelência em maturidade digital e transparência.
              </p>

              {/* Specific features for small towns */}
              <div className="space-y-4 pt-2">
                
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 rounded-full bg-[#1A2E4A]/5 text-[#C9A227] mt-1 shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#1A2E4A] block">Zero Necessidade de Infraestrutura Local</span>
                    <p className="text-xs text-gray-500">Tudo roda em nuvem de alto desempenho. Seu município não gasta com servidores caros ou equipes técnicas locais.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1.5 rounded-full bg-[#1A2E4A]/5 text-[#C9A227] mt-1 shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#1A2E4A] block">Treinamento Humanizado de Servidores</span>
                    <p className="text-xs text-gray-500">Capacitamos servidores locais passo a passo, respeitando o tempo de adaptação de cada colaborador ao novo ambiente.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1.5 rounded-full bg-[#1A2E4A]/5 text-[#C9A227] mt-1 shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#1A2E4A] block">Custo Apropriado e Escalável</span>
                    <p className="text-xs text-gray-500">Modelos de contratação sob medida, adequados ao planejamento orçamentário municipal, sem taxas abusivas ocultas.</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Quote Card Block */}
            <div className="lg:col-span-5">
              <div className="relative bg-[#1A2E4A] text-white rounded-2xl p-8 sm:p-10 shadow-xl overflow-hidden border border-[#C9A227]/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <span className="text-5xl font-serif text-[#C9A227]/40 leading-none mb-4 font-extrabold">&ldquo;</span>
                  <p className="text-base sm:text-lg text-gray-100 font-medium italic leading-relaxed font-serif">
                    O verdadeiro papel da tecnologia é levar cidadania digital aos locais mais necessitados de desburocratização administrativa.
                  </p>
                  <div className="mt-8 pt-6 border-t border-[#C9A227]/20 flex items-center space-x-3">
                    <div className="h-1 w-8 bg-[#C9A227] rounded-full" />
                    <span className="text-xs uppercase tracking-widest font-mono text-gray-300 font-bold">Compromisso com a Gestão Pública</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE SIMULATOR SECTION */}
      <section id="diagnostico" className="py-20 bg-[#F7F8FA] border-t border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-[#C9A227] uppercase tracking-widest bg-[#C9A227]/10 px-3 py-1 rounded-full">
              Diagnóstico de Transparência
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1A2E4A]">
              Simulador de Maturidade Digital do seu Município
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
              Analise instantaneamente o nível de transparência da sua câmara ou prefeitura e veja as possíveis inconformidades operacionais de forma automática.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xl">
            
            {!showDiagnostic ? (
              <form onSubmit={handleRunDiagnostic} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs font-bold text-[#1A2E4A] uppercase mb-2">
                      Nome do Município (Câmara ou Prefeitura)
                    </label>
                    <input 
                      type="text" 
                      value={municipality}
                      onChange={(e) => setMunicipality(e.target.value)}
                      placeholder="Ex: Câmara de Juazeiro" 
                      required
                      className="w-full bg-[#F7F8FA] border border-gray-300 rounded-lg p-3 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A2E4A] uppercase mb-2">
                      Estado
                    </label>
                    <select 
                      value={stateAbbr}
                      onChange={(e) => setStateAbbr(e.target.value)}
                      className="w-full bg-[#F7F8FA] border border-gray-300 rounded-lg p-3 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="PE">Pernambuco (PE)</option>
                      <option value="CE">Ceará (CE)</option>
                      <option value="BA">Bahia (BA)</option>
                      <option value="AL">Alagoas (AL)</option>
                      <option value="RN">Rio Grande do Norte (RN)</option>
                      <option value="PB">Paraíba (PB)</option>
                      <option value="PI">Piauí (PI)</option>
                      <option value="SE">Sergipe (SE)</option>
                      <option value="MA">Maranhão (MA)</option>
                      <option value="SP">São Paulo (SP)</option>
                      <option value="MG">Minas Gerais (MG)</option>
                    </select>
                  </div>

                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2E4A] uppercase mb-2">
                    Como a legislação municipal é publicada hoje?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    <label className="flex items-center space-x-3 p-3 bg-[#F7F8FA] border border-gray-200 rounded-lg cursor-pointer hover:border-[#1A2E4A]/30 transition text-xs">
                      <input 
                        type="radio" 
                        name="publishing_method" 
                        value="physical"
                        checked={currentPublishing === 'physical'}
                        onChange={(e) => setCurrentPublishing(e.target.value)}
                        className="text-[#1A2E4A] focus:ring-[#C9A227]"
                      />
                      <span>Mural físico ou livros encadernados na Câmara</span>
                    </label>

                    <label className="flex items-center space-x-3 p-3 bg-[#F7F8FA] border border-gray-200 rounded-lg cursor-pointer hover:border-[#1A2E4A]/30 transition text-xs">
                      <input 
                        type="radio" 
                        name="publishing_method" 
                        value="pdf"
                        checked={currentPublishing === 'pdf'}
                        onChange={(e) => setCurrentPublishing(e.target.value)}
                        className="text-[#1A2E4A] focus:ring-[#C9A227]"
                      />
                      <span>PDFs soltos ou digitalizados sem mecanismo de busca</span>
                    </label>

                    <label className="flex items-center space-x-3 p-3 bg-[#F7F8FA] border border-gray-200 rounded-lg cursor-pointer hover:border-[#1A2E4A]/30 transition text-xs">
                      <input 
                        type="radio" 
                        name="publishing_method" 
                        value="gazette"
                        checked={currentPublishing === 'gazette'}
                        onChange={(e) => setCurrentPublishing(e.target.value)}
                        className="text-[#1A2E4A] focus:ring-[#C9A227]"
                      />
                      <span>Apenas no Diário Oficial Geral, sem filtro jurídico</span>
                    </label>

                    <label className="flex items-center space-x-3 p-3 bg-[#F7F8FA] border border-gray-200 rounded-lg cursor-pointer hover:border-[#1A2E4A]/30 transition text-xs">
                      <input 
                        type="radio" 
                        name="publishing_method" 
                        value="system"
                        checked={currentPublishing === 'system'}
                        onChange={(e) => setCurrentPublishing(e.target.value)}
                        className="text-[#1A2E4A] focus:ring-[#C9A227]"
                      />
                      <span>Sistema online próprio (mas lento ou desatualizado)</span>
                    </label>

                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={simLoading}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1A2E4A] hover:bg-[#111F33] text-white font-bold text-sm transition flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {simLoading ? (
                      <>
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                        <span>Efetuando análise técnica...</span>
                      </>
                    ) : (
                      <>
                        <Cpu size={16} className="text-[#C9A227]" />
                        <span>Gerar Relatório de Maturidade Digital</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Score display block */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-[#1A2E4A] text-white p-6 sm:p-8 rounded-xl border border-[#C9A227]/40 shadow-lg gap-6">
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#C9A227] uppercase">
                      Diagnóstico Oficial Gerado
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif">
                      {municipality} - {stateAbbr}
                    </h3>
                    <p className="text-xs text-gray-300 max-w-sm leading-relaxed">
                      Avaliação automatizada com base nas diretrizes federais da LAI e Lei de Consolidação de Normas.
                    </p>
                  </div>

                  {/* Circular Score visual */}
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full border-4 border-[#C9A227]/40 flex flex-col items-center justify-center bg-[#F7F8FA]/10 shadow-inner">
                      <span className="text-3xl font-extrabold text-[#C9A227]">{score}</span>
                      <span className="text-[9px] uppercase tracking-widest text-gray-300 font-bold">score</span>
                    </div>
                    <span className="text-xs font-bold text-[#C9A227] mt-2 block">
                      {score <= 30 && "Risco Muito Alto"}
                      {score > 30 && score <= 60 && "Transparência Parcial"}
                      {score > 60 && "Nível Regular"}
                    </span>
                  </div>
                </div>

                {/* Roadblocks & Risks Analysis */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-sm font-bold text-[#1A2E4A] uppercase tracking-wider">
                    Análise Crítica de Conformidade
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl space-y-1">
                      <div className="flex items-center space-x-1.5 text-red-800 font-bold text-xs">
                        <AlertTriangle size={14} />
                        <span>Aderência à LAI (Lei 12.527)</span>
                      </div>
                      <p className="text-[11px] text-red-700 leading-relaxed">
                        {currentPublishing === 'physical' || currentPublishing === 'pdf' 
                          ? "Inconformidade crítica por falta de indexação pesquisável para o cidadão."
                          : "Transparência mediana mas ineficiente na busca detalhada por termos."}
                      </p>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-1">
                      <div className="flex items-center space-x-1.5 text-amber-800 font-bold text-xs">
                        <FileText size={14} />
                        <span>Segurança Jurídica dos Textos</span>
                      </div>
                      <p className="text-[11px] text-amber-700 leading-relaxed">
                        Alto risco de inconsistência legal devido à inexistência de compilação contínua e técnica do acervo oficial.
                      </p>
                    </div>

                  </div>
                </div>

                {/* How QYM Tech Solves This */}
                <div className="p-5 bg-[#C9A227]/5 border border-[#C9A227]/25 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-[#1A2E4A] block">
                    Como a QYM Tech pode elevar seu Score para 100/100:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <CheckCircle2 size={14} className="text-[#C9A227] shrink-0" />
                      <span>Digitalização Completa</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <CheckCircle2 size={14} className="text-[#C9A227] shrink-0" />
                      <span>Curadoria Jurídica</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <CheckCircle2 size={14} className="text-[#C9A227] shrink-0" />
                      <span>Portal de Alta Performance</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Simulation actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Olá QYM Tech! Geramos o diagnóstico de maturidade para ${municipality} (${stateAbbr}) com score de ${score}/100 e gostaríamos de um plano de modernização de leis.`
                      );
                      window.open(`https://wa.me/5519994494386?text=${text}`, '_blank');
                    }}
                    className="px-6 py-3 rounded-lg bg-[#1A2E4A] hover:bg-[#111F33] text-white font-bold text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                  >
                    <span>Solicitar Demonstração via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDiagnostic(false);
                      setMunicipality('');
                    }}
                    className="px-6 py-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs transition"
                  >
                    Fazer Nova Simulação
                  </button>
                </div>

              </motion.div>
            )}

          </div>

        </div>
      </section>

      {/* 7. CONTATO / CTA FINAL */}
      <section id="contato" className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#1A2E4A] p-8 sm:p-12 rounded-3xl border border-[#C9A227]/40 shadow-2xl relative overflow-hidden text-center text-white space-y-6">
            
            {/* Ambient gold glow matching design constraints */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              
              <span className="text-xs font-bold text-[#C9A227] tracking-widest uppercase block">
                Fale Diretamente Conosco
              </span>

              <h2 className="text-2xl sm:text-4xl font-bold font-serif">
                Pronto para Modernizar o Acervo Legislativo do seu Município?
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                Nossa equipe está pronta para avaliar a situação atual da sua Câmara de Vereadores ou Prefeitura e desenhar um plano de modernização sem custo de adesão inicial.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                
                <a 
                  href="https://wa.me/5519994494386"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-[#C9A227] hover:bg-[#B38E1F] text-[#1A2E4A] font-bold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  id="btn-whatsapp-footer-cta"
                >
                  <Phone size={16} />
                  <span>Chamar no WhatsApp (19) 99944-9438</span>
                </a>

                <a 
                  href="tel:5519994494386"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm transition duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Ligar para Nós</span>
                </a>

              </div>

            </div>

          </div>

          {/* Interactive Demonstração Form Card */}
          <div className="bg-white border border-gray-200 shadow-xl p-6 sm:p-8 rounded-2xl mt-12 space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block">
                Formulário Oficial de Interesse
              </span>
              <h3 className="text-lg font-bold font-serif text-[#1A2E4A] mt-1">
                Solicite uma Reunião ou Demonstração Completa
              </h3>
            </div>

            {contactSuccess ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 space-y-3"
              >
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-base font-bold text-[#1A2E4A]">Demonstração Solicitada com Sucesso!</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Estamos abrindo seu WhatsApp corporativo para sincronizar o atendimento de forma prioritária em instantes...
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1A2E4A] uppercase mb-1.5">Seu Nome</label>
                    <input 
                      type="text" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ex: Carlos Oliveira" 
                      required
                      className="w-full bg-[#F7F8FA] border border-gray-300 rounded-lg p-2.5 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#1A2E4A] uppercase mb-1.5">Cargo / Função</label>
                    <select 
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      className="w-full bg-[#F7F8FA] border border-gray-300 rounded-lg p-2.5 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#C9A227]"
                    >
                      <option value="Servidor">Servidor Público</option>
                      <option value="Vereador">Vereador</option>
                      <option value="Prefeito">Prefeito / Vice</option>
                      <option value="Procurador">Procurador Municipal</option>
                      <option value="Assessor">Assessor Parlamentar</option>
                      <option value="Outro">Outros</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-bold text-[#1A2E4A] uppercase mb-1.5">WhatsApp / Celular</label>
                    <input 
                      type="tel" 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Ex: (19) 99944-9438" 
                      required
                      className="w-full bg-[#F7F8FA] border border-gray-300 rounded-lg p-2.5 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-bold text-[#1A2E4A] uppercase mb-1.5">E-mail Institucional</label>
                    <input 
                      type="email" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Ex: carlos@camara.gov.br" 
                      className="w-full bg-[#F7F8FA] border border-gray-300 rounded-lg p-2.5 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-bold text-[#1A2E4A] uppercase mb-1.5">Município / Estado</label>
                    <input 
                      type="text" 
                      value={contactCity}
                      onChange={(e) => setContactCity(e.target.value)}
                      placeholder="Ex: Cabrobó - PE" 
                      className="w-full bg-[#F7F8FA] border border-gray-300 rounded-lg p-2.5 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#C9A227]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1A2E4A] uppercase mb-1.5">Mensagem / Observação (Opcional)</label>
                  <textarea 
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Quais são suas principais dores tecnológicas ou de posicionamento?"
                    className="w-full h-20 bg-[#F7F8FA] border border-gray-300 rounded-lg p-2.5 text-xs text-[#1A1A2E] focus:outline-none focus:border-[#C9A227] resize-none"
                  />
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#1A2E4A] hover:bg-[#111F33] text-white font-bold text-xs transition flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <Send size={12} className="text-[#C9A227]" />
                    <span>Enviar e Prosseguir para Demonstração</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A2E4A] text-white pt-16 pb-8 border-t border-[#C9A227]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Main Footer grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Identity & Description */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center">
                <LogoSVG />
              </div>
              
              <p className="text-xs text-gray-300 leading-normal max-w-md">
                Criando sistemas robustos, compilando históricos normativos e elevando a transparência digital municipal sob demanda para impulsionar a cidadania e segurança jurídica.
              </p>
            </div>

            {/* Column 2: Legal Corporate Info */}
            <div className="md:col-span-6 space-y-4 md:text-right">
              <h4 className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">
                Informações Institucionais
              </h4>
              
              <div className="text-xs text-gray-300 space-y-1.5">
                <p className="font-semibold text-white">QYM Tecnologia e Consultoria</p>
                <p>CNPJ: 68.004.772/0001-35</p>
                <p>Telefone comercial: (19) 99944-9438</p>
                <p>E-mail: contato@qymtech.com.br</p>
              </div>
            </div>

          </div>

          {/* Bottom line with copyright */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-400 gap-4">
            <div>
              &copy; {new Date().getFullYear()} QYM Tecnologia e Consultoria. Todos os direitos reservados. Projetado e desenvolvido com orgulho nacional.
            </div>
            
            <div className="flex space-x-6">
              <a href="#problema" className="hover:text-white transition">O Problema</a>
              <a href="#solucao" className="hover:text-white transition">A Solução</a>
              <a href="#funcionamento" className="hover:text-white transition">Como Funciona</a>
              <a href="#funcionalidades" className="hover:text-white transition">Funcionalidades</a>
              <a href="#para-quem-e" className="hover:text-white transition">Para Quem É</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
