import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.8 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const title = "AUREUM";

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div className="absolute inset-0" style={{ scale }}>
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-4"
          style={{ y, opacity }}
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <span className="text-xs tracking-[0.5em] uppercase text-muted-foreground font-body">
              Estúdio de Design Digital
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[-0.04em] text-gradient-gold mb-8"
          >
            <span className="flex justify-center overflow-hidden">
              {title.split("").map((letter, i) => (
                <motion.span key={i} variants={letterVariants} className="inline-block">
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto font-body font-light leading-relaxed"
          >
            Onde a narrativa visual encontra a engenharia de movimento.
            Criamos experiências digitais que transcendem o ordinário.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-[-40vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground rotate-90 origin-center">
              Scroll
            </span>
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-primary to-transparent"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
