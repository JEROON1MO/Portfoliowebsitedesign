import { motion } from "motion/react";
import { MessageSquare, PenTool, Rocket, Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Briefing",
    icon: MessageSquare,
    description:
      "Entendo seu negócio, público e objetivos para criar a melhor solução.",
    items: [
      "Reunião estratégica para alinhar expectativas",
      "Coleta de informações do negócio e mercado",
      "Entendimento do público-alvo e problemas",
    ],
  },
  {
    number: "02",
    title: "Criação",
    icon: PenTool,
    description:
      "Construo a estrutura e o design com foco em experiência e resultado. Você valida cada etapa.",
    items: [
      "Wireframe de alto padrão",
      "Organização da experiência e fluxo",
      "Segunda reunião para validação conjunta",
    ],
  },
  {
    number: "03",
    title: "Entrega",
    icon: Rocket,
    description:
      "Aplico a identidade visual, integro e publico. Suporte completo no lançamento.",
    items: [
      "Aplicação da identidade visual",
      "Ajustes finos de interface",
      "Integração e publicação do site",
      "Suporte no lançamento",
    ],
  },
];

export function ProcessSection() {
  return (
    <section id="processo" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-left"
        >
          <span className="text-green-400 text-sm tracking-wide uppercase mb-3 block">
            Processo
          </span>
          <h2 className="text-3xl md:text-4xl text-white tracking-tight mb-4">
            Como trabalho
          </h2>
          <p className="text-zinc-400 max-w-xl text-lg !leading-relaxed">
            Processo claro, colaborativo e orientado a resultado. Sem surpresas,
            sem complicação.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="rounded-xl border border-white/5 bg-[#111113] p-6 lg:p-8 h-full hover:border-green-500/15 transition-all duration-300">
                  {/* Step number + icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-green-500/10 border border-green-500/15">
                      <Icon className="size-5 text-green-400" />
                    </div>
                    <span className="text-3xl text-white/5 font-semibold tracking-tighter">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-white tracking-tight mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Items */}
                  <ul className="space-y-2.5">
                    {step.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-zinc-500"
                      >
                        <Check className="size-3.5 text-[#166534] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connector line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 lg:-right-4 w-6 lg:w-8 h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}