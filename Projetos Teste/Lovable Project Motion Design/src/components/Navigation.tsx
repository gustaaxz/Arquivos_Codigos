import { motion } from "framer-motion";
import { NavLink } from "./NavLink";

const links = [
  { label: "Início", to: "/" },
  { label: "Studio", to: "/studio" },
  { label: "Obras", to: "/obras" },
  { label: "Contato", to: "/contato" },
];

const Navigation = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="flex items-center justify-between px-8 py-6 md:px-16">
        <NavLink to="/" className="font-display text-2xl tracking-wider text-gradient-gold" data-magnetic>
          AUREUM
        </NavLink>
        <div className="hidden md:flex items-center gap-12">
          {links.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="text-sm tracking-[0.2em] uppercase text-muted-foreground transition-colors duration-500 hover:text-primary"
              activeClassName="text-primary"
              data-magnetic
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Disponível</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;

