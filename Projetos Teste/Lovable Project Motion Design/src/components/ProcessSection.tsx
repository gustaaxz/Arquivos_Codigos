import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import sectionBg from "@/assets/section-bg.jpg";

const ProcessSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const steps = [
    { number: "I", title: "Imersão", description: "Mergulhamos no universo da marca para entender sua essência e narrativa." },
    { number: "II", title: "Concepção", description: "Desenhamos a arquitetura visual e os fluxos de interação cinematográficos." },
    { number: "III", title: "Engenharia", description: "Codificamos com WebGL, GSAP e shaders customizados para dar vida ao design." },
    { number: "IV", title: "Refinamento", description: "Polimos cada micro-interação até alcançar a perfeição sensorial." },
  ];

  return (
    <section id="processo" ref={ref} className="relative py-40 overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y: bgY }}>
        <img src={sectionBg} alt="" className="w-full h-[120%] object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 px-8 md:px-16 max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="text-xs tracking-[0.4em] uppercase text-primary font-body block mb-24">
            03 — Processo
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.15}>
              <div className="group">
                <span className="font-display text-6xl text-primary/20 group-hover:text-primary/60 transition-colors duration-700">
                  {step.number}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-4 mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">
                  {step.description}
                </p>
                <motion.div
                  className="h-px bg-primary/30 mt-8 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
