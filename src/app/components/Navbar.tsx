import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-white text-xl tracking-tight font-semibold"
        >
          Jerônimo<span className="text-[#166534]">.</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo("projetos")}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Projetos
          </button>
          <button
            onClick={() => scrollTo("processo")}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Processo
          </button>
          <button
            onClick={() => scrollTo("sobre")}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Sobre
          </button>
          <button
            onClick={() => scrollTo("contato")}
            className="bg-[#166534] hover:bg-[#15803d] text-white px-5 py-2 rounded-lg transition-colors text-sm"
          >
            Solicitar orçamento
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-1"
          aria-label="Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#09090b]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              <button
                onClick={() => scrollTo("projetos")}
                className="text-sm text-zinc-400 hover:text-white transition-colors text-left py-1"
              >
                Projetos
              </button>
              <button
                onClick={() => scrollTo("processo")}
                className="text-sm text-zinc-400 hover:text-white transition-colors text-left py-1"
              >
                Processo
              </button>
              <button
                onClick={() => scrollTo("sobre")}
                className="text-sm text-zinc-400 hover:text-white transition-colors text-left py-1"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollTo("contato")}
                className="bg-[#166534] hover:bg-[#15803d] text-white px-5 py-2.5 rounded-lg transition-colors text-sm mt-2"
              >
                Solicitar orçamento
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}