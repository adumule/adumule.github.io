/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Code2,
  ArrowUpRight,
  Star,
  ArrowRight,
  ChevronDown,
  Terminal,
  Send,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Award,
  Zap,
  Bookmark,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { CV_DATA, ProjectItem, BlogItem } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "about" | "portfolio" | "services" | "blog" | "contact">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState<string>("*");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-play Testimonials Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % CV_DATA.testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  const getFilteredProjects = () => {
    if (portfolioFilter === "*") return CV_DATA.projects;
    return CV_DATA.projects.filter(p => p.category.toLowerCase().includes(portfolioFilter.replace("-app", "").toLowerCase()) || p.category === portfolioFilter);
  };

  const getSkillCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages": return <Code2 size={16} className="text-rose-500" />;
      case "Libraries": return <Zap size={16} className="text-amber-500" />;
      case "Frameworks": return <Terminal size={16} className="text-blue-500" />;
      default: return <CheckCircle size={16} className="text-emerald-500" />;
    }
  };

  const formatUrl = (url: string) => url.replace("https://", "");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 antialiased selection:bg-rose-500/30 selection:text-white flex flex-col justify-between">
      
      {/* Decorative ambient background lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab("home")} 
              className="text-2xl font-display font-extrabold text-white tracking-wider cursor-pointer group flex items-center gap-1.5"
            >
              ADUNIYA<span className="w-2 h-2 rounded-full bg-rose-500 block animate-pulse" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {(["home", "about", "portfolio", "services", "blog", "contact"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer capitalize ${
                  activeTab === tab
                    ? "text-rose-400 bg-zinc-900/80 border border-zinc-800/60 shadow-lg shadow-black/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab === "about" ? "about me" : tab}
              </button>
            ))}
          </nav>

          {/* Let's Talk CTA button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                setActiveTab("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-2.5 rounded-full bg-white text-zinc-950 hover:bg-rose-500 hover:text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-rose-500/20 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              Let's Talk
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950 border-b border-zinc-900 overflow-hidden sticky top-[68px] z-40"
          >
            <div className="px-4 py-6 space-y-2">
              {(["home", "about", "portfolio", "services", "blog", "contact"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold capitalize transition-all ${
                    activeTab === tab
                      ? "text-rose-400 bg-zinc-900 border border-zinc-800"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                  }`}
                >
                  {tab === "about" ? "about me" : tab}
                </button>
              ))}
              <div className="pt-4 border-t border-zinc-900">
                <button
                  onClick={() => {
                    setActiveTab("contact");
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full py-3 rounded-full bg-white text-zinc-950 text-center font-semibold text-sm hover:bg-zinc-100 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  Let's Talk
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN VIEW CONTROLLER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 z-10">
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-20 lg:space-y-28 py-4"
            >
              {/* Home split section layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Coordinates & Social Pillar for Desktop */}
                <div className="hidden xl:flex xl:col-span-1 flex-col items-center gap-6 text-zinc-500 border-r border-zinc-900 pr-6 py-6 h-full justify-between">
                  <div className="flex flex-col gap-6 items-center">
                    <a href={CV_DATA.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub">
                      <Github size={20} />
                    </a>
                    <a href={CV_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                    <a href={CV_DATA.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="Twitter">
                      <Twitter size={20} />
                    </a>
                  </div>
                  <div className="h-28 w-px bg-zinc-800" />
                  <span className="rotate-90 select-none tracking-widest text-[9px] font-mono leading-none flex gap-1 items-center uppercase shrink-0">
                    Scroll <ArrowRight size={10} className="rotate-90 ml-2" />
                  </span>
                </div>

                {/* Hero Middle Content Intro */}
                <div className="lg:col-span-7 xl:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase">
                    <Zap size={12} className="animate-bounce" /> Award-Winning Front-End Craft
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-rose-500 font-mono font-medium tracking-[0.2em] uppercase text-sm sm:text-base">
                      HAY' I M {CV_DATA.name.split(" ")[0]}
                    </h4>
                    <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white leading-[1.1]">
                      Engineered to <span className="bg-gradient-to-r from-rose-500 to-amber-500 text-transparent bg-clip-text">Reuse</span> & Perform.
                    </h1>
                  </div>
                  
                  <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed font-sans font-light">
                    {CV_DATA.bio}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      onClick={() => setActiveTab("contact")}
                      className="px-8 py-3.5 rounded-xl bg-rose-500 text-white font-semibold shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all float-left cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Hire Me
                      <ArrowRight size={18} />
                    </button>
                    <a
                      href={`mailto:${CV_DATA.email}`}
                      className="px-8 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 text-zinc-200 font-semibold transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Connect Directly
                      <Mail size={16} />
                    </a>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 border-t border-zinc-900/70">
                    <div>
                      <span className="text-xs text-zinc-500 font-mono block">Nationality</span>
                      <span className="text-sm text-zinc-300 font-medium font-sans">Ethiopian, AA</span>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 font-mono block">Work Status</span>
                      <span className="text-sm text-emerald-400 font-medium font-sans flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Available Now
                      </span>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <span className="text-xs text-zinc-500 font-mono block">Preferred Vibe</span>
                      <span className="text-sm text-zinc-300 font-medium font-sans">Remote & Sync</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Mockup portrait terminal card */}
                <div className="lg:col-span-5 xl:col-span-5 flex justify-center">
                  <div className="w-full max-w-[420px] rounded-2xl bg-zinc-900 border border-zinc-800/80 p-5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
                    
                    {/* Mock editor header */}
                    <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3 mb-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 w-3 h-3 rounded-full bg-rose-500/80 block" />
                        <span className="w-3 w-3 h-3 rounded-full bg-amber-500/80 block" />
                        <span className="w-3 w-3 h-3 rounded-full bg-emerald-500/80 block" />
                      </div>
                      <span className="text-xs font-mono text-zinc-500">aduniya.ts - visual-logs</span>
                    </div>

                    <div className="font-mono text-xs space-y-3.5 select-none leading-relaxed text-zinc-400">
                      <p><span className="text-rose-400">import</span> &#123; <span className="text-amber-400">Developer</span> &#125; <span className="text-rose-400">from</span> <span className="text-zinc-200">"aduniya"</span>;</p>
                      
                      <div className="p-3.5 bg-zinc-950 rounded-lg border border-zinc-800/50 space-y-1">
                        <p className="text-zinc-500">// Initialize profile model</p>
                        <p><span className="text-rose-500">const</span> me = <span className="text-rose-400">new</span> <span className="text-blue-400">Developer</span>(&#123;</p>
                        <p className="pl-4">name: <span className="text-amber-500">"Aduniya Mulugeta"</span>,</p>
                        <p className="pl-4">role: <span className="text-amber-500">"Front-End Architect"</span>,</p>
                        <p className="pl-4">focus: <span className="text-amber-500">"Reusable Components"</span>,</p>
                        <p className="pl-4">origin: <span className="text-emerald-400">"Addis Ababa, ET"</span></p>
                        <p>&#125;);</p>
                      </div>

                      <div className="space-y-1">
                        <p><span className="text-zinc-500">// Stack indicators active</span></p>
                        <p className="text-zinc-300">
                          me.skills.set([<span className="text-rose-400">"React"</span>, <span className="text-rose-400">"Tailwind"</span>, <span className="text-rose-400">"Jest"</span>]);
                        </p>
                      </div>

                      <div className="space-y-0.5 border-t border-zinc-800/50 pt-3">
                        <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          System status: Fully Operational
                        </p>
                        <p className="text-[10px] text-zinc-500">Addis Ababa University Software Eng grad</p>
                      </div>
                    </div>

                    {/* Decorative overlay stat */}
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-rose-500 to-amber-500 text-white rounded-tl-xl px-4 py-2 font-mono text-[10px] uppercase font-bold tracking-wider">
                      React 19 Native
                    </div>
                  </div>
                </div>
              </div>

              {/* STATS MARQUEE BANNER */}
              <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                {CV_DATA.stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center text-center pt-4 md:pt-0 first:pt-0">
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white bg-gradient-to-r from-rose-400 to-amber-400 text-transparent bg-clip-text">
                      {stat.value}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 font-mono mt-1 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* HOME WORK HIGHLIGHTS PREVIEW */}
              <div className="space-y-10">
                <div className="text-center space-y-2">
                  <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">Featured Works</h6>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Recent Digital Footprints</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {CV_DATA.projects.slice(0, 2).map((proj) => (
                    <div 
                      key={proj.id} 
                      onClick={() => {
                        setSelectedProject(proj);
                      }}
                      className="group bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all cursor-pointer shadow-md hover:shadow-xl hover:shadow-black/70 flex flex-col justify-between"
                    >
                      <div className="aspect-[16:10] w-full bg-zinc-950 p-6 flex items-center justify-center relative overflow-hidden group">
                        {/* Decorative visual blocks inside the container to build complex layout screenshot visual feel */}
                        <div className="absolute inset-4 rounded-xl bg-zinc-900 p-4 border border-zinc-800 overflow-hidden text-left font-mono text-[9px] text-zinc-600 transition-all group-hover:scale-105 duration-300">
                          <p className="text-rose-400 mb-1">class <span className="text-amber-400 capitalize">{proj.id}Container</span> extends React.Component &#123;</p>
                          <p className="pl-3">// Render responsive viewport module</p>
                          <p className="pl-3">render() &#123; return &lt;div className="relative overflow-hidden"&gt;</p>
                          <p className="pl-6">&lt;h2&gt;{proj.title}&lt;/h2&gt;</p>
                          <p className="pl-6">&lt;span&gt;Client: {proj.client}&lt;/span&gt;</p>
                          <p className="pl-3">&lt;/div&gt; &#125;</p>
                          <p>&#125;</p>
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                        </div>
                        <div className="absolute top-3 left-4 bg-zinc-950/90 text-rose-400 border border-zinc-800 rounded-full px-3 py-1 font-mono text-[9px] uppercase">
                          {proj.category}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-display font-semibold text-zinc-100 group-hover:text-rose-400 transition-colors">
                            {proj.title}
                          </h3>
                          <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-sm text-zinc-400 text-left line-clamp-2">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800/80 text-[10px] font-mono text-zinc-400">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center pt-4">
                  <button
                    onClick={() => {
                      setActiveTab("portfolio");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold hover:border-zinc-700 transition-colors hover:text-white cursor-pointer"
                  >
                    View Comprehensive Portfolio
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

              {/* TESTIMONIALS SLIDER */}
              <div className="space-y-10">
                <div className="text-center space-y-2">
                  <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">Client Reviews</h6>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Engineering feedback</h2>
                </div>

                <div className="max-w-3xl mx-auto relative bg-zinc-900 p-8 sm:p-12 border border-zinc-800/80 rounded-2xl shadow-xl">
                  {/* Quotes Icon background */}
                  <span className="absolute top-6 left-6 text-rose-500/10 text-8xl font-serif select-none select-none pointer-events-none">“</span>
                  
                  <div className="relative space-y-6">
                    <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed italic text-center font-serif text-zinc-300/95">
                      "{CV_DATA.testimonials[activeTestimonial].quote}"
                    </p>

                    <div className="flex flex-col items-center gap-4 border-t border-zinc-800/50 pt-6">
                      <img 
                        src={CV_DATA.testimonials[activeTestimonial].avatar} 
                        alt={CV_DATA.testimonials[activeTestimonial].author}
                        className="w-14 h-14 rounded-full border border-zinc-800 block shadow"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-center">
                        <h4 className="font-display font-bold text-white text-base">
                          {CV_DATA.testimonials[activeTestimonial].author}
                        </h4>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">
                          {CV_DATA.testimonials[activeTestimonial].role}
                        </p>
                      </div>

                      <div className="flex gap-1 text-amber-500">
                        {Array.from({ length: CV_DATA.testimonials[activeTestimonial].rating }).map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Manual trigger indicator dots */}
                  <div className="flex items-center justify-center gap-2 mt-8 pt-4">
                    {CV_DATA.testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTestimonial(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                          activeTestimonial === i ? "bg-rose-500 w-8" : "bg-zinc-850 hover:bg-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* CLIENT LOGOS / TRUSTED BY LOGOS */}
              <div className="py-10 border-t border-zinc-900/60 text-center space-y-6">
                <p className="text-xs text-zinc-600 font-mono tracking-widest uppercase">Trusted in Technical Ecosystems</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 select-none">
                  {["React", "TailwindCSS", "Node.js", "GitHub", "Vercel", "Netlify"].map((brand) => (
                    <span key={brand} className="text-zinc-500 font-display font-light tracking-wide text-lg sm:text-2xl hover:text-white hover:opacity-100 transition-all duration-300">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* ABOUT ME VIEW */}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-16 py-4"
            >
              {/* Introduction Profile block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative p-2 bg-gradient-to-br from-rose-500 to-amber-500 rounded-3xl max-w-[320px] w-full">
                    {/* Real Profile headshot mock */}
                    <div className="aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900 relative">
                      <img 
                        src="/input_file_0.jpg" 
                        alt="Aduniya Mulugeta character caricature" 
                        className="w-full h-full object-cover block"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 font-mono text-[9px] text-zinc-300 bg-zinc-950/80 border border-zinc-800 rounded px-2 py-0.5">
                        Addis Ababa, ET
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">About Me</h6>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">My coding philosophy</h2>
                  </div>
                  
                  <p className="text-zinc-300 text-lg leading-relaxed font-light">
                    Hi! I am <span className="font-semibold text-white">Aduniya Mulugeta</span>. I graduated with a Bachelor of Science in Software Engineering from Addis Ababa University between 2019 and 2024. Currently, I collaborate directly as a freelance engineer and help small companies build elegant, highly componentized frontend architectures.
                  </p>
                  
                  <p className="text-zinc-400 leading-relaxed font-light">
                    My core engineering objective is structuring clean codebases optimized for absolute component reusability. I believe that writing robust frontend interfaces is more than aesthetic markup—it is about managing data hooks modularly, keeping bundles slim, and securing stability with standard testing blocks like Jest.
                  </p>

                  {/* Personal metrics list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900 border border-zinc-800/70 rounded-2xl p-6">
                    <ul className="space-y-3 font-sans text-sm">
                      <li className="flex items-center gap-3"><span className="text-zinc-500 font-mono w-24 block shrink-0">Name:</span> <span className="text-zinc-200">{CV_DATA.name}</span></li>
                      <li className="flex items-center gap-3"><span className="text-zinc-500 font-mono w-24 block shrink-0">Nationality:</span> <span className="text-zinc-200">Ethiopian</span></li>
                      <li className="flex items-center gap-3"><span className="text-zinc-500 font-mono w-24 block shrink-0">Phone:</span> <span className="text-zinc-200">{CV_DATA.phone}</span></li>
                      <li className="flex items-center gap-3"><span className="text-zinc-500 font-mono w-24 block shrink-0">Freelance:</span> <span className="text-emerald-400 font-medium font-mono">Available Now</span></li>
                    </ul>
                    <ul className="space-y-3 font-sans text-sm">
                      <li className="flex items-center gap-3"><span className="text-zinc-500 font-mono w-24 block shrink-0">Email:</span> <a href={`mailto:${CV_DATA.email}`} className="text-rose-400 hover:underline">{CV_DATA.email}</a></li>
                      <li className="flex items-center gap-3"><span className="text-zinc-500 font-mono w-24 block shrink-0">Experience:</span> <span className="text-zinc-200">3+ Years Professional</span></li>
                      <li className="flex items-center gap-3"><span className="text-zinc-500 font-mono w-24 block shrink-0">Languages:</span> <span className="text-zinc-200">Amharic, English, Arabic</span></li>
                      <li className="flex items-center gap-3"><span className="text-zinc-500 font-mono w-24 block shrink-0">Web Domain:</span> <span className="text-rose-400">{CV_DATA.website.replace("https://","")}</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* TIMELINES Chronologies GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                
                {/* Experiences timeline */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                    <Briefcase className="text-rose-500" size={20} />
                    <h3 className="text-xl font-display font-bold text-white">Work Chronicles</h3>
                  </div>

                  <div className="space-y-8 pl-4 border-l border-zinc-900">
                    {CV_DATA.experience.map((job) => (
                      <div key={job.id} className="relative space-y-2 group">
                        {/* Bullet point accent */}
                        <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border-2 border-rose-500 group-hover:bg-rose-500 transition-colors" />
                        
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-base font-semibold text-white font-sans">{job.role}</h4>
                          <span className="text-xs font-mono text-rose-400 bg-rose-400/10 border border-rose-400/20 px-2.5 py-0.5 rounded-full">{job.period}</span>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono">{job.company} &bull; {job.location}</p>
                        <ul className="space-y-1.5 pt-2 pl-3">
                          {job.responsibilities.slice(0, 3).map((resp, idx) => (
                            <li key={idx} className="text-xs text-zinc-400 list-disc font-light">{resp}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Educational qualifications */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
                    <GraduationCap className="text-rose-500" size={20} />
                    <h3 className="text-xl font-display font-bold text-white">Education Milestones</h3>
                  </div>

                  <div className="space-y-8 pl-4 border-l border-zinc-900">
                    {CV_DATA.education.map((edu) => (
                      <div key={edu.id} className="relative space-y-2 group">
                        {/* Bullet point accent */}
                        <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-950 border-2 border-rose-500 group-hover:bg-rose-500 transition-colors" />
                        
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-base font-semibold text-white font-sans">{edu.degree}</h4>
                          <span className="text-xs font-mono text-rose-400 bg-rose-400/10 border border-rose-400/20 px-2.5 py-0.5 rounded-full">{edu.period}</span>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono">{edu.institution} &bull; {edu.location}</p>
                        <p className="text-xs text-zinc-400 font-light pt-2">Comprehensive focus on standard system design algorithms, code design structures, state modeling, and database integration structures.</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TECHNICAL SKILLS BAR METERS */}
              <div className="space-y-10 pt-8 border-t border-zinc-900/60">
                <div className="text-center space-y-2">
                  <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">Skills Inventory</h6>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Engineered stack proficiencies</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(CV_DATA.skills).map(([category, skills]) => (
                    <div key={category} className="bg-zinc-900/50 p-6 border border-zinc-900 rounded-2xl space-y-6">
                      <div className="flex items-center gap-2 pb-2 border-b border-zinc-900">
                        {getSkillCategoryIcon(category)}
                        <h4 className="text-sm font-mono text-zinc-300 font-semibold uppercase">{category}</h4>
                      </div>

                      <div className="space-y-4">
                        {skills.map((skill) => (
                          <div key={skill.name} className="space-y-1.5">
                            <div className="flex justify-between font-mono text-[11px] text-zinc-400">
                              <span className="text-zinc-200 mt-0.5">{skill.name}</span>
                              <span>{skill.percent}%</span>
                            </div>
                            <div className="w-full h-2 rounded bg-zinc-950 overflow-hidden relative border border-zinc-850">
                              {/* Glowing green bar */}
                              <div 
                                className="h-full rounded bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-1000"
                                style={{ width: `${skill.percent}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* PORTFOLIO MASONRY VIEW */}
          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 py-4"
            >
              <div className="text-center space-y-4">
                <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">Comprehensive Portfolio</h6>
                <h1 className="text-3xl sm:text-5xl font-display font-black text-white">Visualising Code Implementations</h1>
                <p className="max-w-2xl mx-auto text-zinc-400 text-sm font-light">Explore a production log of custom customized web architectures, visual frontends, and dynamic CMS panels curated to reinforce client conversion targets.</p>
              </div>

              {/* ISOTOPE FILTER BAR */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { value: "*", label: "All Works" },
                  { value: "Website", label: "Websites" },
                  { value: "Landing Page", label: "Landings" },
                  { value: "Branding-App", label: "Interactive Apps" }
                ].map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => setPortfolioFilter(btn.value)}
                    className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                      portfolioFilter === btn.value
                        ? "bg-rose-500 text-white border border-rose-500/80 shadow"
                        : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-850"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* PROJECTS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredProjects().map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="group bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all cursor-pointer shadow-md hover:shadow-xl flex flex-col justify-between"
                  >
                    {/* Visual Mock Box */}
                    <div className="aspect-[4:3] w-full bg-zinc-950 p-6 flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-4 rounded-xl bg-zinc-900 p-4 border border-zinc-850 overflow-hidden text-left font-mono text-[9px] text-zinc-600 group-hover:scale-105 duration-300">
                        <p className="text-zinc-500">// {proj.title}</p>
                        <p className="text-amber-400">client: <span className="text-zinc-300">"{proj.client}"</span></p>
                        <p className="text-emerald-400">status: <span className="text-zinc-300">"Production"</span></p>
                        <p className="text-[8px] text-zinc-500 mt-2 line-clamp-3">{proj.description}</p>
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
                      </div>
                      <div className="absolute bottom-3 left-4 bg-zinc-950/90 text-rose-400 border border-zinc-850 rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase">
                        {proj.category}
                      </div>
                    </div>

                    {/* Meta info bottom */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-display font-semibold text-zinc-100 group-hover:text-rose-400 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-850/80 text-[9px] font-mono text-zinc-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {/* SERVICES VIEW */}
          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-20 py-4"
            >
              <div className="text-center space-y-4">
                <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">Services</h6>
                <h1 className="text-3xl sm:text-5xl font-display font-black text-white">Code Solutions Offered</h1>
                <p className="max-w-2xl mx-auto text-zinc-400 text-sm font-light">Leverage precise engineering models, lightweight custom scripts, and meticulous user research components tailored to deliver real outcomes.</p>
              </div>

              {/* SERVICES LISTING */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {CV_DATA.services.map((srv) => (
                  <div key={srv.id} className="bg-zinc-900 border border-zinc-800/80 hover:border-zinc-750 transition-all rounded-2xl p-6 sm:p-8 space-y-4 relative group hover:-translate-y-1">
                    <span className="absolute top-6 right-8 text-rose-500/10 text-6xl font-display font-black select-none pointer-events-none group-hover:text-rose-500/20 transition-colors h-none leading-none">
                      {srv.letter}
                    </span>

                    <h4 className="text-lg font-display font-bold text-zinc-100 pr-12">{srv.title}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed font-light">{srv.description}</p>
                    
                    <ul className="space-y-2 pt-2">
                      {srv.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                          <Check size={12} className="text-emerald-500 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* DESIGNING STEPS CHRONOLOGY */}
              <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-8 sm:p-12 space-y-10">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-display font-bold text-white">Standard Delivery Protocol</h3>
                  <p className="text-xs text-zinc-500 font-mono tracking-wider uppercase">Your beautiful web app in just a few steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left relative">
                  
                  {/* Step 1 */}
                  <div className="space-y-3 relative z-10">
                    <span className="text-xs font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">01. Concept & Scope</span>
                    <h4 className="text-base font-semibold text-white pt-2">Strategy Review</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">Analyzing branding guidelines, assessing competing software projects, and mapping exact reusability milestones.</p>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-3 relative z-10">
                    <span className="text-xs font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">02. Design & Componentize</span>
                    <h4 className="text-base font-semibold text-white pt-2">Wireframes Translation</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">Selecting perfect styling variables, designing fluid mobile grid breakpoints, and selecting state architectures.</p>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-3 relative z-10">
                    <span className="text-xs font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">03. Code & Launch</span>
                    <h4 className="text-base font-semibold text-white pt-2">Rigorous Testing Gates</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">Conducting load testing, implementing Jest validations, optimizing assets for Lighthouse core, and deploying.</p>
                  </div>
                </div>
              </div>

              {/* INTEGRATED DEVELOPER PRICING TIERS */}
              <div className="space-y-10">
                <div className="text-center space-y-2">
                  <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">Amazing Pricing Plans</h6>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Flexible Scopes for Your Needs</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Basic Tier */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 hover:border-zinc-700 transition">
                    <div>
                      <h4 className="text-base font-semibold text-zinc-300">Basic Landing plan</h4>
                      <h2 className="text-3xl font-display font-black text-white mt-2">$250 <span className="text-xs text-zinc-500 font-normal">/ project</span></h2>
                    </div>
                    <ul className="space-y-3 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Pixel-perfect Landing Design</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Fully Responsive Breakpoints</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> TailwindCSS Utilities Code</li>
                      <li className="flex items-center gap-2 text-zinc-650"><X size={12} className="text-zinc-600" /> Unit-testing Setup (Jest)</li>
                      <li className="flex items-center gap-2 text-zinc-650"><X size={12} className="text-zinc-600" /> Component Schema Docs</li>
                    </ul>
                    <button onClick={() => setActiveTab("contact")} className="w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-xs font-mono font-semibold text-zinc-250 hover:bg-zinc-850 cursor-pointer">
                      Select Basic Scope
                    </button>
                  </div>

                  {/* Pro (Recommended Tier) */}
                  <div className="bg-zinc-900 border-2 border-rose-500 p-6 space-y-6 rounded-2xl relative shadow-xl shadow-rose-550/5 hover:scale-105 transition duration-300">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white font-mono text-[9px] uppercase font-black px-3 py-1 rounded-full">RECOMMENDED</span>
                    <div>
                      <h4 className="text-base font-semibold text-zinc-300">CMS & Componentization Pro</h4>
                      <h2 className="text-3xl font-display font-black text-white mt-2">$550 <span className="text-xs text-zinc-500 font-normal">/ project</span></h2>
                    </div>
                    <ul className="space-y-3 text-xs text-zinc-300 border-t border-zinc-800 pt-4">
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500 font-bold" /> Complete Modular CMS template</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500 font-bold" /> Full React & Hooks Integration</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500 font-bold" /> Highly Responsive mobile testing</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500 font-bold" /> Core Accessibility & SEO audits</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500 font-bold" /> Basic post-delivery support</li>
                    </ul>
                    <button onClick={() => setActiveTab("contact")} className="w-full py-2.5 rounded-xl bg-rose-500 text-white text-xs font-mono font-bold hover:bg-rose-600 cursor-pointer shadow-md">
                      Get Premium Customization
                    </button>
                  </div>

                  {/* Gold Tier */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6 hover:border-zinc-700 transition">
                    <div>
                      <h4 className="text-base font-semibold text-zinc-300">Full-Stack Interface suite</h4>
                      <h2 className="text-3xl font-display font-black text-white mt-2">$950 <span className="text-xs text-zinc-500 font-normal">/ project</span></h2>
                    </div>
                    <ul className="space-y-3 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Full SPA React/Node Architecture</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Robust Jest Unit Validation</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Dynamic APIs Connection points</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Specialized training + ML python input</li>
                      <li className="flex items-center gap-2"><Check size={12} className="text-emerald-500" /> Custom deployment & support docs</li>
                    </ul>
                    <button onClick={() => setActiveTab("contact")} className="w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-xs font-mono font-semibold text-zinc-250 hover:bg-zinc-850 cursor-pointer">
                      Get Full Stack Consultation
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* BLOG JOURNAL VIEW */}
          {activeTab === "blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 py-4"
            >
              <div className="text-center space-y-4">
                <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">Dev Journals</h6>
                <h1 className="text-3xl sm:text-5xl font-display font-black text-white">Read Updated Blogs</h1>
                <p className="max-w-2xl mx-auto text-zinc-400 text-sm font-light">Explore technical articles documenting real performance audits, code optimizations principles, and component design practices.</p>
              </div>

              {/* Dynamic blog selector if active */}
              {selectedBlog ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-6 sm:p-10 space-y-6 max-w-4xl mx-auto relative">
                  <button 
                    onClick={() => setSelectedBlog(null)}
                    className="absolute top-6 right-6 px-4 py-1.5 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white rounded-lg text-xs font-mono cursor-pointer"
                  >
                    Back to Journals
                  </button>

                  <div className="space-y-3">
                    <span className="text-xs font-mono text-rose-400 bg-rose-400/10 px-2.5 py-1 rounded border border-rose-400/20 uppercase">{selectedBlog.category}</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white pt-2">{selectedBlog.title}</h2>
                    <p className="text-xs text-zinc-500 font-mono flex items-center gap-4">{selectedBlog.date} &bull; {selectedBlog.readTime}</p>
                  </div>

                  <div className="aspect-[2:1] w-full rounded-xl overflow-hidden bg-zinc-950">
                    <img 
                      src={selectedBlog.image} 
                      alt={selectedBlog.title}
                      className="w-full h-full object-cover opacity-80 block"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="font-sans text-zinc-300 leading-relaxed space-y-4 font-light">
                    <p className="text-lg text-white font-medium">To keep templates clean, frontend components need consistent state boundaries.</p>
                    <p>When engineering responsive web layout configurations for CMS platforms or custom analytical graphs inside React, the developer must prevent unaligned content reflows (Layout Shifts). This core web audits guide addresses how to utilize lazy loading gates and componentize templates smoothly.</p>
                    <h4 className="text-white font-display font-bold text-lg pt-4">Implementing Modular Interfaces</h4>
                    <p>By declaring atomic CSS patterns and writing dedicated hooks that isolate container states, we completely avoid infinite re-renders. Every React file remains fully testable via Jest and accessible directly via standard screen reader variables.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {CV_DATA.blogs.map((b) => (
                    <div 
                      key={b.id} 
                      onClick={() => setSelectedBlog(b)}
                      className="group bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition cursor-pointer shadow-md hover:shadow-xl flex flex-col justify-between"
                    >
                      <div className="aspect-[4:3] w-full overflow-hidden bg-zinc-950">
                        <img 
                          src={b.image} 
                          alt={b.title}
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-500 block"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="p-5 space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-rose-400 bg-rose-400/10 border border-rose-400/20 px-2 py-0.5 rounded uppercase">{b.category}</span>
                          <span className="text-[10px] font-mono text-zinc-500 float-right mt-1">{b.date}</span>
                        </div>
                        <h3 className="text-base font-display font-bold text-zinc-100 group-hover:text-rose-400 transition-colors line-clamp-2">
                          {b.title}
                        </h3>
                        <p className="text-xs text-zinc-400 font-light line-clamp-3">
                          {b.excerpt}
                        </p>
                        <div className="font-mono text-xs text-zinc-500 group-hover:text-rose-400 transition-colors flex items-center gap-1">
                          {b.readTime} &bull; Read case <ArrowRight size={12} className="inline ml-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </motion.div>
          )}

          {/* CONTACT & FAQ VIEW */}
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-20 py-4"
            >
              <div className="text-center space-y-4">
                <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">CONTACT ME</h6>
                <h1 className="text-3xl sm:text-5xl font-display font-black text-white">Let's craft your next app</h1>
                <p className="max-w-2xl mx-auto text-zinc-400 text-sm font-light">Have a CMS platform to tailor-fit? Ready to optimize your React architecture speeds? Feel like we might be a great fit? Send an inquiry form below!</p>
              </div>

              {/* CONTACT COLUMNS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Coordinates left */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-display font-bold text-zinc-100">Contact Details</h3>
                    <p className="text-sm text-zinc-400 font-light leading-relaxed">Reach out directly via email or call. Alternatively, use the social handle indicators configured to connect with my channels.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-xl relative group hover:border-zinc-800 transition">
                      <div className="p-3 rounded-lg bg-zinc-950 text-rose-400">
                        <Mail size={18} />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] text-zinc-500 font-mono block uppercase">Email</span>
                        <a href={`mailto:${CV_DATA.email}`} className="text-sm font-sans font-medium text-white hover:text-rose-400 hover:underline">{CV_DATA.email}</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-xl relative group hover:border-zinc-800 transition">
                      <div className="p-3 rounded-lg bg-zinc-950 text-amber-400">
                        <Phone size={18} />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] text-zinc-500 font-mono block uppercase">Phone</span>
                        <span className="text-sm font-sans font-medium text-white block">{CV_DATA.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-900 rounded-xl relative group hover:border-zinc-800 transition">
                      <div className="p-3 rounded-lg bg-zinc-950 text-blue-400">
                        <MapPin size={18} />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] text-zinc-500 font-mono block uppercase">Location</span>
                        <span className="text-sm font-sans font-medium text-white block">{CV_DATA.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Handles */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-zinc-500 block uppercase">Explore Channels</span>
                    <div className="flex gap-3">
                      <a href={CV_DATA.socials.github} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer shadow">
                        <Github size={18} />
                      </a>
                      <a href={CV_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer shadow">
                        <Linkedin size={18} />
                      </a>
                      <a href={CV_DATA.socials.twitter} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer shadow">
                        <Twitter size={18} />
                      </a>
                      <a href={CV_DATA.socials.facebook} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer shadow">
                        <Facebook size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form right */}
                <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-xl relative">
                  
                  {formSubmitted ? (
                    <div className="space-y-6 text-center py-12 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl animate-bounce">
                        <Check size={32} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-display font-bold text-white">Inquiry Filed Securely!</h4>
                        <p className="text-sm text-zinc-400 max-w-sm leading-relaxed mx-auto font-light">Thank you! Your project coordinates have been logged successfully. Aduniya will respond within 24 working hours.</p>
                      </div>
                      <button 
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2 bg-zinc-950 border border-zinc-850 text-xs font-mono text-zinc-400 hover:text-white rounded-lg transition shrink-0 cursor-pointer"
                      >
                        File another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      <div className="space-y-1">
                        <h4 className="text-lg font-display font-bold text-zinc-100">Send an Email</h4>
                        <p className="text-xs text-zinc-500">All fields required to route inbox securely</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase">First / Company Name</label>
                          <input 
                            required
                            type="text" 
                            placeholder="John Doe"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-rose-500 rounded-xl text-sm text-white font-sans outline-none transition"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-zinc-500 uppercase">Secure Email Address</label>
                          <input 
                            required
                            type="email" 
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="john@organization.com"
                            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-rose-500 rounded-xl text-sm text-white font-sans outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Project / Subject Category</label>
                        <input 
                          type="text" 
                          placeholder="CMS tail-fit proposal"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-rose-500 rounded-xl text-sm text-white font-sans outline-none transition"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase">Coordination Details</label>
                        <textarea 
                          required
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Brief description of visual scopes, reusability needs, and timeline expectations..."
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-850 hover:border-zinc-800 focus:border-rose-500 rounded-xl text-sm text-white font-sans outline-none transition resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-3.5 rounded-xl bg-white hover:bg-rose-500 text-zinc-950 hover:text-white font-bold text-xs font-mono uppercase tracking-wider transition duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                          submitting ? "opacity-77 cursor-default" : ""
                        }`}
                      >
                        {submitting ? "Routing..." : "Send Me Quotes"}
                        <Send size={14} />
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* FAQ ACCORDION SECTION */}
              <div className="space-y-10 border-t border-zinc-900/60 pt-16">
                <div className="text-center space-y-2">
                  <h6 className="text-xs text-rose-500 font-mono uppercase tracking-[0.2em] font-bold">Frequently Asked Questions</h6>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">Common Solutions</h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                  {CV_DATA.faqs.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="bg-zinc-900 border border-zinc-850 rounded-xl overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer group"
                      >
                        <span className="text-sm font-semibold text-zinc-200 group-hover:text-rose-400 transition-colors flex items-center gap-2.5">
                          <HelpCircle size={14} className="text-rose-500 shrink-0" />
                          {faq.question}
                        </span>
                        <ChevronDown 
                          size={16} 
                          className={`text-zinc-500 transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-rose-500" : ""}`} 
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-zinc-850/50 bg-zinc-900/40"
                          >
                            <p className="px-6 py-5 text-xs text-zinc-400 font-light leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* COMPREHENSIVE PROJECT INSIGHT MODEL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden max-w-3xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-950 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-4">
                <span className="text-xs font-mono text-rose-400 bg-rose-400/10 px-2.5 py-1 rounded border border-rose-400/20 uppercase">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white">{selectedProject.title}</h2>
              </div>

              {/* Mock Project metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-zinc-800/80 font-sans text-xs">
                <div>
                  <span className="text-zinc-500 block font-mono uppercase text-[9px] mb-0.5">Client</span>
                  <span className="text-zinc-200 font-medium">{selectedProject.client || "Confidential Partner"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono uppercase text-[9px] mb-0.5">Date</span>
                  <span className="text-zinc-200 font-medium">{selectedProject.date || "2025"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono uppercase text-[9px] mb-0.5">Location</span>
                  <span className="text-zinc-200 font-medium">{selectedProject.location || "Addis Ababa"}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block font-mono uppercase text-[9px] mb-0.5">Focus Scope</span>
                  <span className="text-zinc-200 font-medium">Responsive Delivery</span>
                </div>
              </div>

              <div className="space-y-4 leading-relaxed font-sans text-sm font-light text-zinc-400">
                <h4 className="text-white font-display font-bold text-base">Project Case Insight</h4>
                <p>{selectedProject.description}</p>
                <p>The core objective centering this build is delivering a reusable codebase. By deploying modular sub-components, Gudalabs was able to easily reuse the components in secondary releases, securing high structural consistency and cutting production turnaround safely.</p>
              </div>

              <div className="font-mono text-zinc-500 text-xs flex flex-wrap gap-2 pt-2">
                <span className="text-zinc-400 font-bold">Tech Stack:</span>
                {selectedProject.tags.join(" &bull; ")}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CORE FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-sm font-display font-extrabold text-white tracking-widest uppercase">ADUNIYA MULUGETA</h4>
            <p className="text-xs text-zinc-600 font-mono">Addis Ababa, Ethiopia &bull; React & Tailwind Specialist</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-mono uppercase tracking-wide">
            <button onClick={() => { setActiveTab("home"); window.scrollTo(0,0); }} className="hover:text-white cursor-pointer select-none">Home</button>
            <button onClick={() => { setActiveTab("about"); window.scrollTo(0,0); }} className="hover:text-white cursor-pointer select-none">About</button>
            <button onClick={() => { setActiveTab("portfolio"); window.scrollTo(0,0); }} className="hover:text-white cursor-pointer select-none">Portfolio</button>
            <button onClick={() => { setActiveTab("contact"); window.scrollTo(0,0); }} className="hover:text-white cursor-pointer select-none">Contact</button>
          </div>

          <p className="text-xs text-zinc-600 font-mono text-center md:text-right">
            &copy; {new Date().getFullYear()} ADUNIYA. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
