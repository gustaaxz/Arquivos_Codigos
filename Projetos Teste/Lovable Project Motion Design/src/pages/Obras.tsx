import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import FooterSection from "@/components/FooterSection";
import projectOne from "@/assets/project-1.jpg";
import projectTwo from "@/assets/project-2.jpg";

const works = [
  {
    title: "Liquid Gold Identity",
    category: "Motion Branding",
    image: projectOne,
  },
  {
    title: "Obsidian Narrative",
    category: "Immersive Web Experience",
    image: projectTwo,
  },
];

const Obras = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="px-8 pb-24 pt-36 md:px-16">
          <div className="mx-auto max-w-7xl">
            <span className="mb-6 block text-xs uppercase tracking-[0.4em] text-primary">Obras</span>
            <h1 className="max-w-5xl text-5xl leading-none text-foreground md:text-7xl lg:text-[6.5rem]">
              Casos concebidos para parecer direção de cena interativa.
            </h1>

            <div className="mt-20 space-y-16">
              {works.map((work, index) => (
                <motion.article
                  key={work.title}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 * index, duration: 0.85 }}
                  className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
                >
                  <div className="overflow-hidden rounded-sm border border-border bg-card">
                    <img src={work.image} alt={work.title} className="h-[28rem] w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                  <div className="pb-6">
                    <span className="mb-4 block text-xs uppercase tracking-[0.35em] text-muted-foreground">{work.category}</span>
                    <h2 className="text-4xl md:text-6xl leading-[0.95] text-foreground">{work.title}</h2>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                      Sistemas visuais com transições contínuas, ritmo escultural e presença tátil para elevar percepção de marca.
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    </PageTransition>
  );
};

export default Obras;
