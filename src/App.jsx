import logoBrh from './assets/brh-logo.avif';
import logoSeashore from './assets/seashore.avif';
import logoPartner from './assets/partner.avif';
import logoSibup from './assets/sibup-tech.avif';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight, 
  Cpu, 
  LineChart, 
  Globe, 
  Activity, 
  CheckCircle2, 
  Clock,
  ChevronDown
} from 'lucide-react';

const ASSETS = {
  logoBrh: logoBrh,
  logoSeashore: logoSeashore,
  logoPartner: logoPartner,
  logoSibup: logoSibup,
  heroDashboard: "https://via.placeholder.com/800x600?text=Dashboard+Tech",
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={elementRef} className="tabular-nums">{count}{suffix}</span>;
};

const Reveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-red-500/30 selection:text-red-900">
      {/* Navegação */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={ASSETS.logoBrh} alt="BRH Group Logo" className="h-10 w-10 object-contain" />
            <span className="text-slate-900 font-bold text-xl tracking-tight uppercase">BRH <span className="text-red-600 font-black">Group</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {['Serviços', 'Inovação', 'Impacto', 'Processo'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-500 hover:text-red-600 transition-colors text-sm font-bold tracking-widest uppercase">
                {item}
              </a>
            ))}
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-red-600/20 text-sm">
              Falar com Consultor
            </button>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-slate-50 overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl space-y-8">
            <Reveal delay={100}>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-widest uppercase mb-4">
                O Futuro da Inteligência Energética
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Transformando Energia em <span className="text-red-600">Inteligência</span>, Eficiência e Impacto.
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-xl text-slate-600 leading-relaxed">
                Projetamos e implementamos soluções energéticas avançadas através do nosso ecossistema de empresas especialistas, acelerando a transição para um futuro sustentável.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center transition-all shadow-xl shadow-red-600/20">
                  Solicitar Diagnóstico Energético
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200 transition-all shadow-sm">
                  Falar com um Especialista
                </button>
              </div>
            </Reveal>

            {/* SEÇÃO NOSSAS EMPRESAS (RECOMENDAÇÃO - PREPARADA PARA IMAGENS) */}
            <Reveal delay={700}>
              <div className="pt-10 border-t border-slate-200">
                <p className="text-red-600 text-[11px] font-black tracking-[0.4em] mb-12 uppercase opacity-80 text-center lg:text-left">
                  Nossas Empresas
                </p>
                
                <div className="grid grid-cols-3 gap-8 items-center">
                  <div className="flex justify-center lg:justify-start transform hover:scale-105 transition-transform duration-300">
                    <img src={ASSETS.logoSeashore} alt="Seashore" className="h-12 w-auto object-contain" />
                  </div>
                  <div className="flex justify-center border-x border-slate-200 px-4 transform hover:scale-105 transition-transform duration-300">
                    <img src={ASSETS.logoPartner} alt="Partner" className="h-12 w-auto object-contain" />
                  </div>
                  <div className="flex justify-center lg:justify-end transform hover:scale-105 transition-transform duration-300">
                    <img src={ASSETS.logoSibup} alt="Sibup.Tech" className="h-14 w-auto object-contain" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={900}>
            <div className="hidden lg:block relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-800 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-white border border-slate-100 p-8 rounded-3xl shadow-2xl">
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance Consolidada</span>
                       <Activity className="text-red-600 w-5 h-5 animate-pulse" />
                    </div>
                    {/* Placeholder para Dashboard real ou Gráfico Animado */}
                    <div className="h-48 w-full bg-slate-50 rounded-xl overflow-hidden flex items-end px-4 gap-1">
                       {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 85].map((h, i) => (
                          <div key={i} className="flex-1 bg-red-600/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                       ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-tighter">Economia de Rede</p>
                          <p className="text-2xl font-bold text-slate-900">27.4%</p>
                       </div>
                       <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-tighter">Sinergia Operacional</p>
                          <p className="text-2xl font-bold text-red-600">100%</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION SECTION */}
      <section id="serviços" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <Reveal>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 uppercase">
                Engenharia para o Futuro.
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Combinamos excelência técnica, tecnologias inteligentes e visão estratégica para entregar melhorias mensuráveis através das verticais do Brh Group.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-8 h-8 text-red-600" />,
                title: "Consultoria Técnica Avançada",
                desc: "Análise estratégica e engenharia de precisão para desbloquear oportunidades de otimização energética ocultas."
              },
              {
                icon: <Activity className="w-8 h-8 text-slate-700" />,
                title: "Projetos de Eficiência",
                desc: "Design e implementação completa de iniciativas energéticas de alto impacto baseadas em performance."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-red-600" />,
                title: "Gestão Integrada",
                desc: "Monitoramento em tempo real, inteligência de dados e sistemas de controle que maximizam a eficiência."
              }
            ].map((pillar, i) => (
              <Reveal key={i} delay={i * 200}>
                <div className="group p-10 rounded-3xl border border-slate-100 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 hover:-translate-y-1">
                  <div className="mb-8 p-4 w-fit rounded-2xl bg-slate-50 group-hover:bg-red-50 group-hover:scale-110 transition-all duration-500">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{pillar.desc}</p>
                  <a href="#" className="flex items-center text-sm font-bold text-slate-900 hover:text-red-600 transition-colors text-xs tracking-widest uppercase">
                    Saiba mais <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROBLEM → TRANSFORMATION SECTION */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <Reveal>
                <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 backdrop-blur-sm relative">
                  <h4 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-8">Transformação de Sistema</h4>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 text-slate-400 font-bold">
                         !
                      </div>
                      <div>
                        <div className="text-slate-500 text-sm font-medium">INFRAESTRUTURA INEFICIENTE</div>
                        <div className="text-lg font-bold">Monitoramento fragmentado e desperdício silencioso.</div>
                      </div>
                    </div>
                    
                    <div className="h-12 flex items-center justify-center">
                      <div className="w-px h-full bg-gradient-to-b from-slate-700 via-slate-500 to-red-500"></div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center shrink-0">
                         <CheckCircle2 className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <div className="text-red-500 text-sm font-medium">ECOSSISTEMA BRH GROUP</div>
                        <div className="text-lg font-bold">Desempenho otimizado e ROI claro através de dados.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <Reveal>
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight uppercase tracking-tighter">
                  O Desperdício é Invisível — <span className="text-red-600">Até ser Medido.</span>
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed">
                  A maioria das organizações perde recursos significativos devido a sistemas ineficientes e falta de visão integrada. Nós transformamos complexidade em clareza operacional.
                </p>
                
                <div className="grid gap-6 pt-4">
                  {[
                    "Identificamos ineficiências com precisão cirúrgica.",
                    "Projetamos ecossistemas inteligentes e escaláveis.",
                    "Implementamos mudanças mensuráveis de alto impacto."
                  ].map((text, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-red-600"></div>
                      </div>
                      <span className="text-lg text-slate-200">{text}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY & INNOVATION SECTION */}
      <section id="inovação" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 uppercase tracking-tighter">
                Tecnologia & Inovação.
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                Nossas soluções utilizam analytics avançado, automação e modelagem preditiva para garantir que a eficiência energética do Brh Group seja um ativo permanente.
              </p>
              
              <div className="space-y-4">
                {[
                  "Monitoramento em tempo real (Real-time Analytics)",
                  "Análise de performance preditiva",
                  "Sistemas de otimização automatizados",
                  "Integração de infraestrutura inteligente",
                  "Frameworks de sustentabilidade escaláveis"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                    <div className="w-2 h-2 rounded-full bg-red-600 group-hover:scale-150 transition-transform"></div>
                    <span className="font-bold text-slate-800 tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[80px] -mr-32 -mt-32 rounded-full"></div>
                 
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center space-x-4">
                      <Globe className="text-red-500 w-8 h-8" />
                      <span className="text-slate-500 font-mono text-xs font-bold tracking-widest">ECOSSISTEMA_STATUS: OPERACIONAL</span>
                    </div>
                    
                    <div className="p-6 bg-slate-950/80 rounded-2xl border border-white/5">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-1 text-xs text-slate-400">Redução Consolidada</div>
                          <div className="text-3xl font-bold text-white tabular-nums tracking-tighter">1.204,85 <span className="text-sm font-normal text-slate-500 italic">kWh</span></div>
                        </div>
                        <div className="text-red-500 text-sm font-bold flex items-center">
                          <Activity className="w-4 h-4 mr-1" /> -12.4%
                        </div>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-red-600 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Uptime do Sistema", val: "99.99%", color: "text-white" },
                        { label: "Nós em Operação", val: "2.482", color: "text-red-500" }
                      ].map((stat, idx) => (
                        <div key={idx} className="p-5 bg-slate-950/80 rounded-2xl border border-white/5">
                           <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-widest text-xs text-slate-500">{stat.label}</div>
                           <div className={`text-xl font-bold ${stat.color}`}>{stat.val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center pt-4">
                      <p className="text-slate-500 text-sm font-medium tracking-tight italic">Construímos ecossistemas inteligentes para marcas globais.</p>
                    </div>
                 </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. IMPACT SECTION (NUMBERS) */}
      <section id="impacto" className="py-32 bg-red-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl lg:text-6xl font-bold mb-20 tracking-tight uppercase">Impacto Mensurável.</h2>
            
            <div className="grid md:grid-cols-4 gap-12 lg:gap-8">
              {[
                { label: "Redução em custos energéticos", val: 30, suffix: "%" },
                { label: "Aumento na eficiência operacional", val: 40, suffix: "%" },
                { label: "Redução de emissões CO₂", val: 240, suffix: "k Ton" },
                { label: "Aceleração de ROI", val: 4, suffix: "x" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="text-5xl lg:text-7xl font-bold tracking-tighter">
                    {idx < 2 && "Até "}<AnimatedCounter end={item.val} suffix={item.suffix} />
                  </div>
                  <p className="text-red-100 text-lg font-medium opacity-80 uppercase text-xs tracking-widest">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-24 pt-12 border-t border-white/20 inline-block">
              <p className="text-2xl italic font-light">
                “Sustentabilidade não é uma intenção. É um <span className="font-bold underline decoration-white/30 underline-offset-8">resultado mensurável</span>.”
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. PROCESS SECTION (PREMIUM TIMELINE) */}
      <section id="processo" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <h2 className="text-4xl font-bold text-center mb-20 text-slate-900 uppercase tracking-tighter underline decoration-red-600 decoration-4 underline-offset-8">Do Diagnóstico à Transformação.</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-4 gap-0">
            {[
              { num: "01", title: "Avaliação Estratégica", desc: "Avaliamos infraestrutura, padrões de consumo e ineficiências latentes." },
              { num: "02", title: "Planejamento Inteligente", desc: "Desenhamos estratégias de eficiência de alto impacto baseadas em dados." },
              { num: "03", title: "Implementação Técnica", desc: "Executamos projetos sustentáveis com rigor técnico e precisão." },
              { num: "04", title: "Otimização Contínua", desc: "Monitoramos, refinamos e garantimos o desempenho a longo prazo." }
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="relative group p-8 lg:p-12 border-b md:border-b-0 md:border-r border-slate-100 last:border-0 hover:bg-slate-50 transition-all duration-500">
                  <div className="text-6xl font-black text-slate-100 group-hover:text-red-100 transition-colors mb-6">{step.num}</div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-xs tracking-widest">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CASE PREVIEW SECTION */}
      <section className="py-32 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="bg-slate-900/50 rounded-[3rem] p-8 lg:p-20 border border-white/5 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/5 blur-[100px] rounded-full"></div>
              
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">Espaço para destacar um projeto. <br /></h2>
                  <div className="p-8 bg-slate-950 rounded-2xl border border-white/5 shadow-xl">
                    <p className="text-xl text-slate-300 leading-relaxed italic mb-8">
                      “Aqui, posso colocar um relatorio ou um parantese do que o projeto fez e/ou representou para a empresa.”
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-sm tracking-widest shadow-lg shadow-red-600/20">BRH</div>
                      <div>
                        <div className="font-bold text-white uppercase tracking-wider text-xs">Projeto Um</div>
                        <div className="text-sm text-slate-500">Setor Industrial & Logístico</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                   <div className="aspect-square bg-slate-800/30 rounded-3xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                      <div className="p-8 w-full">
                        <div className="h-64 w-full flex items-end justify-between gap-2 font-mono text-[8px] text-red-500/50">
                          {[60, 80, 50, 90, 70, 40, 60, 80, 95, 75, 50, 40, 60].map((h, i) => (
                            <div 
                              key={i} 
                              className="w-full bg-gradient-to-t from-red-600 to-red-900 rounded-t-sm" 
                              style={{ height: `${h}%`, opacity: (i + 1) / 13 }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-8">
                         <div className="flex items-center space-x-2 text-red-500 text-sm font-mono font-bold tracking-widest uppercase text-xs text-red-500">
                           <Clock className="w-4 h-4" /> <span>HISTÓRICO_RENDERIZADO.v2</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. LEAD CAPTURE SECTION (CONVERSION FOCUS) */}
      <section className="py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-950 tracking-tighter uppercase">Pronto para Desbloquear seu Potencial?</h2>
              <p className="text-xl text-slate-600 font-medium italic">Agende um diagnóstico estratégico e descubra como o Brh Group pode transformar sua performance.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] border border-slate-100">
              {formStatus === 'success' ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 mb-4 animate-bounce shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter">Diagnóstico Agendado</h3>
                  <p className="text-slate-600 max-w-sm mx-auto text-lg">Obrigado. Nosso estrategista entrará em contato em até 24 horas para alinhar os próximos passos.</p>
                  <button onClick={() => setFormStatus('idle')} className="text-red-600 font-bold hover:underline uppercase text-xs tracking-widest">Enviar nova solicitação</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input required type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-slate-300 font-medium" placeholder="Ex: João Silva" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                    <input required type="email" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-slate-300 font-medium" placeholder="joao@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Empresa</label>
                    <input required type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-slate-300 font-medium" placeholder="Nome da organização" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Indústria</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-600 focus:outline-none transition-all text-slate-600 font-medium">
                      <option>Manufatura / Indústria</option>
                      <option>Data Centers / Tech</option>
                      <option>Logística / Varejo</option>
                      <option>Serviços Públicos</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mensagem</label>
                    <textarea rows="4" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder:text-slate-300 font-medium" placeholder="Como podemos ajudar a elevar sua eficiência?"></textarea>
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <button 
                      type="submit" 
                      disabled={formStatus === 'loading'}
                      className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center group disabled:opacity-70 uppercase tracking-widest font-black"
                    >
                      {formStatus === 'loading' ? (
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Agendar Meu Diagnóstico Estratégico
                          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-center mt-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-red-600" /> Confidencial. Estratégico. Orientado a Impacto.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-slate-950 text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <img src={ASSETS.logoBrh} alt="BRH Group Logo" className="h-10 w-10 object-contain" />
                <span className="font-bold text-xl tracking-tight uppercase">BRH GROUP</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium italic">
                Engenharia de performance sustentável para um amanhã mais inteligente através de inteligência técnica avançada e integrada.
              </p>
            </div>
            
            {[
              { title: "O Grupo", links: ["Sobre Nós", "Ecossistema", "Impacto Social", "Notícias"] },
              { title: "Serviços", links: ["Consultoria", "Eficiência", "Monitoramento", "Implementação"] },
              { title: "Legal", links: ["Privacidade", "Termos de Uso", "Compliance", "Segurança"] }
            ].map((col, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 underline decoration-red-600/50 underline-offset-4 decoration-2">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-slate-500 hover:text-red-500 transition-colors text-sm font-bold tracking-tight uppercase text-xs">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">
            <div>© 2026 BRH GROUP. TODOS OS DIREITOS RESERVADOS.</div>
            <div className="flex items-center space-x-8">
              <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
              <a href="#" className="hover:text-white transition-colors">TWITTER</a>
              <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
