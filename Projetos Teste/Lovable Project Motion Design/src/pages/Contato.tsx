import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import FooterSection from "@/components/FooterSection";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";

const contactLines = ["Briefing estratégico", "Direção de motion", "Experiências premium"];

const Contato = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="px-8 pb-24 pt-36 md:px-16">
          <section className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="mb-6 block text-xs uppercase tracking-[0.4em] text-primary">Contato</span>
              <h1 className="text-5xl leading-none text-foreground md:text-7xl lg:text-[6.5rem]">
                Vamos desenhar a próxima sequência.
              </h1>
              <div className="mt-10 space-y-4 text-muted-foreground">
                {contactLines.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 * index, duration: 0.75 }}
                    className="text-lg"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85 }}
              className="glass rounded-sm border border-border p-8 md:p-10"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Disponibilidade limitada para projetos autorais.</p>
              <p className="mt-8 text-2xl leading-relaxed text-foreground md:text-3xl">
                Se você quer uma presença digital memorável, iniciamos com um alinhamento criativo e um roteiro de experiência.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <a href="mailto:hello@aureum.studio">Iniciar conversa</a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <NavLink to="/obras">Ver obras</NavLink>
                </Button>
              </div>
            </motion.div>
          </section>
        </main>
        <FooterSection />
      </div>
    </PageTransition>
  );
};

export default Contato;
