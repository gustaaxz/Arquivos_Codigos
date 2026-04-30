import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { NavLink } from "@/components/NavLink";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="mb-4 block text-xs uppercase tracking-[0.4em] text-primary">Rota não encontrada</span>
          <h1 className="mb-4 text-5xl md:text-7xl text-gradient-gold">404</h1>
          <p className="mb-8 text-lg text-muted-foreground">A experiência que você buscou não existe nesta galeria.</p>
          <NavLink to="/" className="story-link text-primary">
            Voltar para o início
          </NavLink>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default NotFound;

