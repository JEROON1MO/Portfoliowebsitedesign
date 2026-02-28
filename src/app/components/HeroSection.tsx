import { motion } from "motion/react";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial glow - hero specific */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_400px_at_50%_40%,rgba(22,101,52,0.12),transparent)]">
        <motion.button
          onClick={() => scrollTo("projetos")}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.8 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 size-10 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center hover:border-green-500/30 hover:bg-green-500/5 transition-colors duration-300 cursor-pointer"
          aria-label="Rolar para baixo"
        >
          <ChevronDown className="size-5 text-zinc-400" />
        </motion.button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/15 bg-green-500/5 mb-8">
            <Sparkles className="size-3.5 text-green-400" />
            <span className="text-xs text-green-300/80 tracking-wide">
              UX/UI Designer & Desenvolvedor No-Code
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight !leading-[1.12] mb-6"
        >
          Transformo sua presença digital em{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            experiência que gera resultado
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 !leading-relaxed"
        >
          Crio sites modernos, tecnológicos e atrativos que posicionam sua
          empresa como referência — do design à entrega, sem complicação.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("projetos")}
            className="group bg-[#166534] hover:bg-[#15803d] text-white px-8 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-2 text-sm w-full sm:w-56 justify-center"
          >
            Ver projetos
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo("contato")}
            className="text-zinc-400 hover:text-white px-8 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 text-sm w-full sm:w-56 justify-center"
          >
            Solicitar orçamento
          </button>
        </motion.div>

        {/* Stats */}
        
      </div>

      {/* Bottom gradient */}
      
    </section>
  );
}