import { motion } from "motion/react";
import { Award, Zap, Users, Star } from "lucide-react";

const highlights = [
  {
    icon: Award,
    label: "Especialista em UX/UI",
  },
  {
    icon: Zap,
    label: "Entrega com No-Code",
  },
  {
    icon: Users,
    label: "Foco no cliente",
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative group"
          >
            <div
              className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.06] transition-shadow duration-500 ease-out shadow-[0_8px_40px_rgba(0,0,0,0.3)] group-hover:shadow-[0_16px_60px_rgba(22,101,52,0.12)]"
            >
              <img
                src="https://drive.google.com/thumbnail?id=1emyycJyOtpcMRaxBhJ352aKCyCsBO_-E&sz=w1200"
                alt="Jerônimo — UX/UI Designer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-3.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) =>
                  i < 4 ? (
                    <Star
                      key={i}
                      className="size-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ) : (
                    <span key={i} className="relative size-3.5">
                      <Star className="absolute inset-0 size-3.5 text-yellow-400" />
                      <span className="absolute inset-0 overflow-hidden w-[50%]">
                        <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      </span>
                    </span>
                  )
                )}
              </div>
              <div className="text-xs text-zinc-400">Avaliação dos clientes</div>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-green-400 text-sm tracking-wide uppercase mb-3 block">
              Sobre mim
            </span>
            <h2 className="text-3xl md:text-4xl text-white tracking-tight mb-6">
              Quem está por trás dos projetos
            </h2>

            <div className="space-y-4 text-zinc-400 text-sm !leading-relaxed">
              <p>
                Sou Jerônimo, formado em Engenharia de Software e especializado
                em UX e UI design. Atuo há mais de 5 anos criando experiências
                digitais e desenvolvendo produtos para web.
              </p>
              <p>
                Ao longo da minha trajetória, trabalhei com empresas de
                diferentes setores — de inovação tecnológica e consultorias a
                startups financeiras — ajudando a estruturar e evoluir sua
                presença digital com soluções claras, funcionais e orientadas ao
                negócio.
              </p>
              <p>
                Minha atuação combina design e desenvolvimento no-code, o que me
                permite participar do processo de ponta a ponta: da definição da
                estrutura e experiência até a entrega do produto pronto para uso.
              </p>
              <p>
                Acredito que design não é apenas estética. É organização, clareza
                e tomada de decisão. Cada interface precisa cumprir um papel:
                comunicar bem, facilitar o uso e gerar resultado para quem
                investe no produto.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-green-500/10 transition-colors duration-300"
                  >
                    <Icon className="size-5 text-green-400" />
                    <span className="text-xs text-zinc-400">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}