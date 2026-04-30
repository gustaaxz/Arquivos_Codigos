import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import FooterSection from "@/components/FooterSection";
import sectionBg from "@/assets/section-bg.jpg";

const principles = [
  "Narrativa visual orientada por movimento e ritmo.",
  "Direção de arte editorial com precisão cinematográfica.",
  "Interfaces táteis onde microinterações ampliam presença.",
];

const Studio = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-background">
        <Navigation />
        <main className="pt-28">
          <section className="relative px-8 pb-24 pt-20 md:px-16">
            <div className="absolute inset-0 opacity-20">
              <img src={sectionBg} alt="Textura atmosférica dourada" className="h-full w-full object-cover" />
            </div>
            <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <span className="mb-6 block text-xs uppercase tracking-[0.4em] text-primary">Studio</span>
                <h1 className="max-w-4xl text-5xl leading-none text-foreground md:text-7xl lg:text-[7rem]">
                  Movimento como linguagem, não como ornamento.
                </h1>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="max-w-xl text-lg leading-relaxed text-muted-foreground"
              >
                A Aureum constrói experiências autorais onde composição, tempo e materialidade digital se unem para conduzir atenção com elegância.
              </motion.p>
            </div>
          </section>

          <section className="px-8 py-24 md:px-16">
            <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
              {principles.map((item, index) => (
                <motion.article
                  key={item}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * index, duration: 0.8 }}
                  className="glass rounded-sm border border-border p-8"
                >
                  <span className="mb-8 block text-xs uppercase tracking-[0.3em] text-primary">0{index + 1}</span>
                  <p className="text-2xl leading-snug text-foreground">{item}</p>
                </motion.article>
              ))}
            </div>
          </section>
        </main>
        <FooterSection />
      </div>
    </PageTransition>
  );
};

export default Studio;
