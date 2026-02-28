import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MacbookMockup } from "./MacbookMockup";
import { TechPulseMockup } from "./TechPulseMockup";
import goiasCoverImg from "figma:asset/0a3f95e979a21b883eb93622172b8498c0a95b3f.png";
import techpulseHome from "figma:asset/b8eadd8029212c9f8fd4af4b958fa28baf4de3cc.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface CaseProject {
  id: number;
  name: string;
  type: string;
  problem: string;
  solution: string;
  image: string;
  tags: string[];
  externalUrl?: string;
  mockup?: boolean;
  mockupType?: "macbook" | "3d-perspective";
}

const cases: CaseProject[] = [
  {
    id: 1,
    name: "Goiás Construções",
    type: "Site Institucional",
    problem:
      "Reposicionar digitalmente uma empresa tradicional do varejo de construção e transformar o site em ferramenta de vendas.",
    solution:
      "Redesenhei a interface completa com foco em posicionamento de mercado e conversão. O novo site reflete autoridade e modernidade.",
    image: goiasCoverImg,
    tags: ["Redesign", "Responsivo", "UX/UI", "No-Code"],
    externalUrl: "https://jeroon1mo.github.io/RedesingGoiasConstrucoes",
    mockup: true,
    mockupType: "macbook",
  },
  {
    id: 2,
    name: "TechPulse",
    type: "E-commerce",
    problem:
      "E-commerce com experiência de compra fragmentada, baixa conversão e interface desatualizada que não transmitia confiança ao consumidor.",
    solution:
      "E-commerce com interface otimizada para conversão. Design que prioriza a jornada do usuário desde a descoberta até um checkout intuitivo e estratégico.",
    image: techpulseHome,
    tags: ["UI Design", "Responsivo", "No-Code"],
    externalUrl: "https://jeroon1mo.github.io/Designecommercetechpulse/",
    mockupType: "3d-perspective",
  },
  {
    id: 3,
    name: "TechVision",
    type: "Site Institucional",
    problem:
      "A empresa tinha um site desatualizado que não transmitia credibilidade para clientes corporativos do setor de tecnologia.",
    solution:
      "Redesenhei a interface completa com foco em posicionamento de mercado e conversão. O novo site reflete autoridade e modernidade.",
    image:
      "https://images.unsplash.com/photo-1702479744062-1880502275b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGFzaGJvYXJkJTIwbW9ja3VwJTIwZGFya3xlbnwxfHx8fDE3NzE0MzcyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["UX/UI", "No-Code", "Responsivo"],
  },
  {
    id: 4,
    name: "Bloom Studio",
    type: "Landing Page",
    problem:
      "Precisavam de uma página que convertesse visitantes em leads qualificados para o lançamento de um novo serviço.",
    solution:
      "Landing page estratégica com copy persuasiva, UX orientado à ação e design que destaca a proposta de valor de forma clara.",
    image:
      "https://images.unsplash.com/photo-1695634621121-691d54259d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kaW5nJTIwcGFnZSUyMGRlc2lnbiUyMG1vZGVybiUyMG1pbmltYWx8ZW58MXx8fHwxNzcxNDM3MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Conversão", "Copy", "UX Strategy"],
  },
  {
    id: 5,
    name: "NexPay",
    type: "Página de Vendas",
    problem:
      "Taxa de conversão baixa e página sem clareza na proposta de valor. Muitos visitantes abandonavam antes de agir.",
    solution:
      "Redesign completo com hierarquia de informação, gatilhos de decisão e fluxo pensado para reduzir fricção na jornada de compra.",
    image:
      "https://images.unsplash.com/photo-1642142785744-261a5f663d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWduJTIwY2xlYW58ZW58MXx8fHwxNzcxMzk4MDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Vendas", "UX/UI", "Performance"],
  },
  {
    id: 6,
    name: "Atlas Corp",
    type: "Redesign",
    problem:
      "Produto digital com interface confusa, navegação complexa e alta taxa de abandono pelos usuários.",
    solution:
      "Nova experiência com navegação intuitiva, design system consistente e foco total na usabilidade.",
    image:
      "https://images.unsplash.com/photo-1697292866717-0b20bd310268?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ24lMjBkYXJrfGVufDF8fHx8MTc3MTM4ODM0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Redesign", "Design System", "Usabilidade"],
  },
];

function CaseCard({
  project,
  onOpenDetail,
}: {
  project: CaseProject;
  onOpenDetail: (p: CaseProject) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
      onClick={() => onOpenDetail(project)}
    >
      <div className="relative rounded-xl overflow-hidden border border-white/5 bg-[#111113] hover:border-green-500/15 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/10 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center bg-[#0a0a0b]">
          {project.mockupType === "3d-perspective" ? (
            <TechPulseMockup />
          ) : project.mockupType === "macbook" || project.mockup ? (
            <MacbookMockup>
              <ImageWithFallback
                src={project.image}
                alt={project.name}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </MacbookMockup>
          ) : (
            <ImageWithFallback
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#166534]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
              <ArrowUpRight className="size-5 text-white" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-green-400 tracking-wide uppercase">
              {project.type}
            </span>
            <ExternalLink className="size-3.5 text-zinc-600 group-hover:text-green-400 transition-colors" />
          </div>
          <h3 className="text-white text-lg tracking-tight mb-2">
            {project.name}
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
            {project.solution}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CasesSection() {
  const [selectedCase, setSelectedCase] = useState<CaseProject | null>(null);

  const handleOpenDetail = (project: CaseProject) => {
    if (project.externalUrl) {
      window.open(project.externalUrl, "_blank");
    } else {
      setSelectedCase(project);
    }
  };

  return (
    <section id="projetos" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-green-400 text-sm tracking-wide uppercase mb-3 block">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl text-white tracking-tight mb-4">
            Projetos que falam por si
          </h2>
          <p className="text-zinc-400 max-w-xl text-lg !leading-relaxed">
            Resultados reais, não promessas. Explore cada projeto e veja o impacto de uma experiência digital bem construída.
          </p>
        </motion.div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {cases.map((project) => (
              <CarouselItem
                key={project.id}
                className="pl-6 md:basis-1/2 py-2"
              >
                <CaseCard
                  project={project}
                  onOpenDetail={handleOpenDetail}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center gap-3 mt-10">
            <CarouselPrevious className="static translate-y-0 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white size-10 rounded-lg" />
            <CarouselNext className="static translate-y-0 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white size-10 rounded-lg" />
          </div>
        </Carousel>
      </div>

      {/* Case Detail Dialog */}
      <Dialog
        open={!!selectedCase}
        onOpenChange={() => setSelectedCase(null)}
      >
        <DialogContent className="bg-[#111113] border-white/10 text-white max-w-2xl">
          {selectedCase && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-green-400 tracking-wide uppercase">
                    {selectedCase.type}
                  </span>
                </div>
                <DialogTitle className="text-2xl text-white tracking-tight">
                  {selectedCase.name}
                </DialogTitle>
                <DialogDescription className="text-zinc-400 sr-only">
                  Detalhes do projeto {selectedCase.name}
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-lg overflow-hidden mt-2 border border-white/5">
                <ImageWithFallback
                  src={selectedCase.image}
                  alt={selectedCase.name}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-sm text-zinc-400 mb-1.5 uppercase tracking-wide">
                    Desafio
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {selectedCase.problem}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-zinc-400 mb-1.5 uppercase tracking-wide">
                    Solução
                  </h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {selectedCase.solution}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {selectedCase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {selectedCase.externalUrl && (
                <div className="mt-6">
                  <button
                    className="w-full bg-[#166534] hover:bg-[#15803d] text-white py-2.5 rounded-lg transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#166534]/25 hover:shadow-[#166534]/40 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => {
                      setSelectedCase(null);
                      window.open(selectedCase.externalUrl, "_blank");
                    }}
                  >
                    Ver projeto completo
                  </button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}