import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const ManifestoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  return (
    <section id="manifesto" ref={ref} className="relative py-40 md:py-60 px-8 md:px-16 noise">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          {/* Left column */}
          <div className="md:col-span-4">
            <ScrollReveal>
              <span className="text-xs tracking-[0.4em] uppercase text-primary font-body">
                01 — Manifesto
              </span>
            </ScrollReveal>
          </div>

          {/* Right column */}
          <div className="md:col-span-7 md:col-start-6">
            <ScrollReveal delay={0.2}>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-12 text-foreground">
                O movimento é a
                <span className="text-gradient-gold italic"> linguagem </span>
                do futuro digital
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-lg text-muted-foreground font-body font-light leading-relaxed mb-8">
                Acreditamos que cada pixel deve respirar. Cada transição deve contar uma história.
                Não criamos sites — esculpimos experiências cinematográficas que permanecem na memória.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p className="text-lg text-muted-foreground font-body font-light leading-relaxed">
                Nossa abordagem funde arte e tecnologia: WebGL, shaders personalizados e animações
                GSAP que transformam interfaces em narrativas imersivas.
              </p>
            </ScrollReveal>

            {/* Animated line */}
            <motion.div
              className="h-px bg-primary mt-16 origin-left"
              style={{ width: lineWidth }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
