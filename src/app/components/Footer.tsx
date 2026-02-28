import { Linkedin, Instagram, Dribbble } from "lucide-react";

const links = [
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Dribbble, href: "#", label: "Dribbble" },
];

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-white text-lg tracking-tight font-semibold"
            >
              Jerônimo<span className="text-[#166534]">.</span>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href.replace("#", ""))}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/jeroonimon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-white/5 transition-all"
            >
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Jerônimo. Todos os direitos
            reservados.
          </p>
          <p className="text-xs text-zinc-700">
            Design & desenvolvimento por Jerônimo
          </p>
        </div>
      </div>
    </footer>
  );
}