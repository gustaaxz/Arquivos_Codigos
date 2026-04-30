import { motion } from "framer-motion";
import { NavLink } from "./NavLink";
import ScrollReveal from "./ScrollReveal";

const pageLinks = [
  { label: "Início", to: "/" },
  { label: "Studio", to: "/studio" },
  { label: "Obras", to: "/obras" },
  { label: "Contato", to: "/contato" },
];

const FooterSection = () => {
  return (
    <footer id="contato" className="relative px-8 py-40 md:px-16 noise">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="text-xs tracking-[0.4em] uppercase text-primary font-body block mb-16">
            04 — Contato
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-8">
            <ScrollReveal delay={0.2}>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1] text-foreground mb-8">
                Vamos criar algo
                <span className="text-gradient-gold italic block mt-2"> extraordinário</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <motion.a
                href="mailto:hello@aureum.studio"
                className="inline-flex items-center gap-4 mt-12 group"
                data-magnetic
                whileHover={{ x: 10 }}
              >
                <span className="font-display text-2xl md:text-3xl text-muted-foreground group-hover:text-primary transition-colors duration-500">
                  hello@aureum.studio
                </span>
                <svg
                  className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.a>
            </ScrollReveal>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <ScrollReveal delay={0.3}>
              <div className="space-y-10">
                <div>
                  <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 font-body">Páginas</h4>
                  <div className="space-y-2">
                    {pageLinks.map((link) => (
                      <NavLink
                        key={link.label}
                        to={link.to}
                        className="block text-sm text-foreground/60 transition-colors duration-300 hover:text-primary font-body"
                        activeClassName="text-primary"
                        data-magnetic
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 font-body">Social</h4>
                  <div className="space-y-2">
                    {["Instagram", "Behance", "Dribbble"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="block text-sm text-foreground/60 hover:text-primary transition-colors duration-300 font-body"
                        data-magnetic
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={0.5}>
          <div className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground font-body">
              © 2026 Aureum Studio. Todos os direitos reservados.
            </span>
            <span className="text-xs text-muted-foreground font-body">
              Feito com obsessão por detalhes.
            </span>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default FooterSection;

