import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import FooterSection from "@/components/FooterSection";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="bg-background min-h-screen">
        <CustomCursor />
        <Navigation />
        <main>
          <HeroSection />
          <ManifestoSection />
          <ProjectsSection />
          <ProcessSection />
          <FooterSection />
        </main>
      </div>
    </PageTransition>
  );
};

export default Index;

