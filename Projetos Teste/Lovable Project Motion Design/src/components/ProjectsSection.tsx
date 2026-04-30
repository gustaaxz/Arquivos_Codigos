import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ParallaxImage from "./ParallaxImage";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import sectionBg from "@/assets/section-bg.jpg";

const projects = [
  {
    id: 1,
    title: "Ephemeral",
    category: "Experiência Imersiva",
    year: "2026",
    image: project1,
    description: "Uma jornada sensorial através de paisagens digitais generativas.",
  },
  {
    id: 2,
    title: "Obsidian",
    category: "Brand & Motion",
    year: "2025",
    image: project2,
    description: "Identidade visual fluida com transições líquidas em WebGL.",
  },
  {
    id: 3,
    title: "Lumière",
    category: "Plataforma Digital",
    year: "2025",
    image: sectionBg,
    description: "Narrativa cinematográfica aplicada ao e-commerce de luxo.",
  },
];

const ProjectsSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="obras" className="relative py-40 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-baseline justify-between mb-24">
            <span className="text-xs tracking-[0.4em] uppercase text-primary font-body">
              02 — Obras Selecionadas
            </span>
            <span className="text-sm text-muted-foreground font-body hidden md:block">
              {projects.length} projetos
            </span>
          </div>
        </ScrollReveal>

        <div className="space-y-1">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <motion.div
                className="group relative border-t border-border py-12 md:py-16 cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-magnetic
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                  <div className="md:col-span-1">
                    <span className="text-xs text-muted-foreground font-body">{project.year}</span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground group-hover:text-gradient-gold transition-all duration-500">
                      {project.title}
                    </h3>
                  </div>
                  <div className="md:col-span-3">
                    <span className="text-sm text-muted-foreground font-body">
                      {project.category}
                    </span>
                  </div>
                  <div className="md:col-span-3 flex justify-end">
                    <motion.div
                      className="w-10 h-10 rounded-full border border-muted-foreground/30 flex items-center justify-center"
                      whileHover={{ scale: 1.2, borderColor: "hsl(40, 70%, 50%)" }}
                    >
                      <svg
                        className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Hover image preview */}
                <AnimatePresence>
                  {hoveredId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="hidden md:block absolute right-24 top-1/2 -translate-y-1/2 w-72 h-48 rounded overflow-hidden glow-gold z-20 pointer-events-none"
                    >
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          ))}
          {/* Bottom border */}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
