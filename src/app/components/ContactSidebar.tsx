import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, X, ArrowRight, ChevronUp } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

/* ═══════════════════════════════════════════════
   Shared Form State Context
   ═══════════════════════════════════════════════ */

interface ContactFormState {
  name: string;
  setName: (v: string) => void;
  projectType: string;
  setProjectType: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
}

const ContactFormContext = createContext<ContactFormState | null>(null);

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");

  return (
    <ContactFormContext.Provider
      value={{ name, setName, projectType, setProjectType, message, setMessage }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}

function useContactForm() {
  const ctx = useContext(ContactFormContext);
  if (!ctx)
    throw new Error("useContactForm must be used within ContactFormProvider");
  return ctx;
}

/* ═══════════════════════════════════════════════
   Form Fields (shared state via context)
   ═══════════════════════════════════════════════ */

function ContactFormFields({
  showWhatsApp = true,
  compact = false,
}: {
  showWhatsApp?: boolean;
  compact?: boolean;
}) {
  const { name, setName, projectType, setProjectType, message, setMessage } =
    useContactForm();
  const [sending, setSending] = useState(false);

  const projectLabels: Record<string, string> = {
    institucional: "Site Institucional",
    landing: "Landing Page",
    vendas: "Página de Vendas",
    redesign: "Redesign",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !projectType) {
      toast.error("Preencha pelo menos seu nome e tipo de projeto.");
      return;
    }
    setSending(true);

    const lines = [
      `*Novo lead via portfólio* 🚀`,
      ``,
      `*Nome:* ${name.trim()}`,
      `*Tipo de projeto:* ${projectLabels[projectType] || projectType}`,
    ];
    if (message.trim()) {
      lines.push(`*Mensagem:* ${message.trim()}`);
    }

    const whatsappText = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/5562991104686?text=${whatsappText}`;

    setTimeout(() => {
      setSending(false);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      toast.success("Redirecionando para o WhatsApp...");
      setName("");
      setProjectType("");
      setMessage("");
    }, 600);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-3" : "space-y-4"}
    >
      <div>
        <label className="text-xs text-zinc-400 mb-1.5 block">Nome</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm focus-visible:border-[#166534]/60 focus-visible:ring-[#166534]/20"
        />
      </div>

      <div>
        <label className="text-xs text-zinc-400 mb-1.5 block">
          Tipo de projeto
        </label>
        <Select value={projectType} onValueChange={setProjectType}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white h-9 text-sm data-[placeholder]:text-zinc-600">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1e] border-white/10 text-white">
            <SelectItem value="institucional">Site Institucional</SelectItem>
            <SelectItem value="landing">Landing Page</SelectItem>
            <SelectItem value="vendas">Página de Vendas</SelectItem>
            <SelectItem value="redesign">Redesign</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-xs text-zinc-400 mb-1.5 block">
          Mensagem <span className="text-zinc-600">(opcional)</span>
        </label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Conte brevemente sobre seu projeto..."
          className={`bg-white/5 border-white/10 text-white placeholder:text-zinc-600 text-sm focus-visible:border-[#166534]/60 focus-visible:ring-[#166534]/20 ${
            compact ? "min-h-[60px]" : "min-h-[80px]"
          }`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-[#166534] hover:bg-[#15803d] disabled:bg-[#166534]/50 text-white py-2.5 rounded-lg transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#166534]/25 hover:shadow-[#166534]/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        {sending ? (
          <span className="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="size-3.5" />
            Enviar mensagem
          </>
        )}
      </button>

      {showWhatsApp && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-white/5" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#111113] px-3 text-zinc-600">ou</span>
            </div>
          </div>

          <a
            href={`https://wa.me/5562991104686?text=${encodeURIComponent("Olá Jerônimo! Gostaria de saber mais sobre seus serviços.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-sm"
          >
            <MessageCircle className="size-4" />
            Conversar no WhatsApp
          </a>
        </>
      )}
    </form>
  );
}

/* ─── Premium Card Wrapper ─── */
function PremiumCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative group/card ${className}`}>
      {/* Outer glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] pointer-events-none" />
      {/* Card */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/90 backdrop-blur-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden">
        {/* Subtle radial accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(22,101,52,0.08),transparent_70%)] pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

/* ─── Sidebar Header ─── */
function SidebarHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "mb-3" : "mb-4"}>
      <div className="flex items-center gap-2 mb-1">
        <div className="size-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-green-400 text-[10px] tracking-widest uppercase">
          Disponível
        </span>
      </div>
      <h3 className="text-white text-lg tracking-tight">Vamos conversar?</h3>
      {!compact && (
        <p className="text-zinc-500 text-xs leading-relaxed mt-1">
          Conte sobre seu projeto e receba uma proposta personalizada.
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Floating Sidebar
   ═══════════════════════════════════════════════ */

export function ContactSidebar() {
  const [visible, setVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletOpen, setTabletOpen] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);
  const [sidebarTop, setSidebarTop] = useState("50%");
  const [sidebarTransform, setSidebarTransform] = useState("translateY(-50%)");

  // ─── IntersectionObserver for #contato ───
  useEffect(() => {
    const contactEl = document.getElementById("contato");
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactInView(entry.isIntersecting);
        // Auto-close mobile/tablet overlays when contact section appears
        if (entry.isIntersecting) {
          setMobileOpen(false);
          setTabletOpen(false);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  const updatePosition = useCallback(() => {
    const shouldShow = window.scrollY > 300;
    setVisible(shouldShow);

    const footer = document.querySelector("footer");
    const aside = asideRef.current;
    if (!footer || !aside) return;

    const footerRect = footer.getBoundingClientRect();
    const asideHeight = aside.offsetHeight;
    const viewportH = window.innerHeight;
    const gap = 24;
    const minTop = gap;
    const centeredTop = viewportH / 2 - asideHeight / 2;
    const maxTopFromFooter = footerRect.top - asideHeight - gap;

    if (maxTopFromFooter < centeredTop) {
      const clampedTop = Math.max(minTop, maxTopFromFooter);
      setSidebarTop(`${clampedTop}px`);
      setSidebarTransform("translateY(0)");
    } else {
      setSidebarTop("50%");
      setSidebarTransform("translateY(-50%)");
    }
  }, []);

  useEffect(() => {
    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  // Floating elements show when scrolled AND contact section is NOT in view
  const showFloating = visible && !contactInView;

  return (
    <>
      {/* ─── Desktop Sidebar (xl+) ─── */}
      <AnimatePresence>
        {showFloating && (
          <motion.aside
            ref={asideRef}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden xl:block fixed right-6 w-[300px] z-40"
            style={{
              top: sidebarTop,
              transform: sidebarTransform,
              transition: "top 0.25s ease-out, transform 0.25s ease-out",
              maxHeight: "calc(100vh - 3rem)",
            }}
          >
            <PremiumCard className="max-h-[calc(100vh-3rem)]">
              <div className="overflow-y-auto max-h-[calc(100vh-6rem)] custom-scrollbar">
                <SidebarHeader />
                <ContactFormFields showWhatsApp={false} compact />
              </div>
            </PremiumCard>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ─── Tablet Drawer Toggle (lg to xl) ─── */}
      <AnimatePresence>
        {showFloating && !tabletOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={() => setTabletOpen(true)}
            className="hidden lg:flex xl:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-40 items-center gap-2 bg-[#0c0c0e]/95 backdrop-blur-xl border border-white/[0.08] border-b-0 text-white px-6 py-3 rounded-t-xl shadow-[0_-4px_24px_rgba(0,0,0,0.3)] hover:bg-[#111113] transition-colors"
          >
            <ChevronUp className="size-4 text-green-400" />
            <span className="text-sm">Solicitar orçamento</span>
            <div className="size-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Tablet Bottom Drawer (lg to xl) ─── */}
      <AnimatePresence>
        {tabletOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="hidden lg:block xl:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setTabletOpen(false);
            }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="absolute bottom-0 left-0 right-0 max-h-[80vh]"
            >
              <div className="relative rounded-t-2xl border border-white/[0.08] border-b-0 bg-[#0c0c0e]/95 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(22,101,52,0.06),transparent_70%)] pointer-events-none" />
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-white/10" />
                </div>
                <div className="relative z-10 p-6 overflow-y-auto max-h-[calc(80vh-2rem)]">
                  <button
                    onClick={() => setTabletOpen(false)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20"
                    aria-label="Fechar"
                  >
                    <X className="size-5" />
                  </button>
                  <div className="max-w-lg mx-auto">
                    <SidebarHeader />
                    <ContactFormFields showWhatsApp />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Mobile Floating Button (<lg) ─── */}
      <AnimatePresence>
        {showFloating && !mobileOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 bg-[#166534] hover:bg-[#15803d] text-white p-4 rounded-full shadow-lg shadow-[#166534]/25 transition-colors"
            aria-label="Solicitar orçamento"
          >
            <MessageCircle className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Mobile Form Overlay (<lg) ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="w-full max-w-md relative overflow-hidden"
            >
              <PremiumCard>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20"
                  aria-label="Fechar"
                >
                  <X className="size-5" />
                </button>
                <div className="max-h-[80vh] overflow-y-auto">
                  <SidebarHeader />
                  <ContactFormFields />
                </div>
              </PremiumCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════
   Contact Section (embedded form)
   ═══════════════════════════════════════════════ */

export function ContactSection() {
  return (
    <section id="contato" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl border border-white/5 bg-[#111113] p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_100%,rgba(22,101,52,0.10),transparent_50%)] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[radial-gradient(circle,rgba(22,101,52,0.05),transparent_70%)] blur-2xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left - CTA copy */}
            <div>
              <span className="text-green-400 text-sm tracking-wide uppercase mb-3 block">
                Contato
              </span>
              <h2 className="text-3xl md:text-4xl text-white tracking-tight mb-4">
                Pronto para transformar sua presença digital?
              </h2>
              <p className="text-zinc-400 !leading-relaxed mb-6">
                Conte sobre seu projeto e vamos juntos criar algo que posiciona
                sua empresa como referência no mercado.
              </p>

              <div className="space-y-3">
                {[
                  "Resposta em até 24 horas",
                  "Orçamento sem compromisso",
                  "Processo transparente do início ao fim",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-zinc-400"
                  >
                    <ArrowRight className="size-3.5 text-green-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* WhatsApp link */}
              
            </div>

            {/* Right - Embedded form (always visible) */}
            <div>
              <ContactFormFields showWhatsApp={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}