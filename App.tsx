import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import SelfAnalysis from './components/SelfAnalysis';
import EngineerRedefinition from './components/EngineerRedefinition';
import ProjectShowcase from './components/ProjectShowcase';
import MVPConclusion from './components/MVPConclusion'; // Import new component
import OpenAICase from './components/OpenAICase';
import PainPoints from './components/PainPoints';
import Strategy from './components/Strategy';
import ProductDef from './components/ProductDef';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import { ArchitecturePage } from './pages';
import { PERSONAL_PROJECTS } from './constants';

// Page type for simple routing
type PageType = 'home' | 'architecture';

// Progress bar component
const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-transparent z-50">
      <div 
        className="h-full bg-accent/80 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Handle navigation
  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Render Architecture Page
  if (currentPage === 'architecture') {
    return (
      <div className="bg-background min-h-screen text-primary selection:bg-white/20 selection:text-white">
        <ProgressBar />
        {/* Back to Home Button */}
        <button
          onClick={() => navigateTo('home')}
          className="fixed top-4 left-4 z-50 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回首页
        </button>
        <ArchitecturePage />
      </div>
    );
  }

  // Render Home Page
  return (
    <div className="bg-background min-h-screen text-primary selection:bg-white/20 selection:text-white">
      <ProgressBar />
      
      <main className="flex flex-col">
        {/* Cover / Intro */}
        <Hero onNavigateToArchitecture={() => navigateTo('architecture')} />
        
        {/* Part 1: Who Am I? (Matching the 4 Standards) */}
        <SelfAnalysis />

        {/* Part 1.5: My Mindset (Why I match) */}
        <EngineerRedefinition />

        {/* Part 2: Evidence of "Doing" - Personal Technical Capabilities */}
        {/* User Request: My works can be skipped if time is short. This proves the "Triangle". */}
        <ProjectShowcase 
          data={PERSONAL_PROJECTS}
          title="从“后端开发”到“独立制作人”"
          subtitle="Evidence of Execution"
          withEvolutionCard={true}
        />

        {/* Part 3: Evidence of "Thinking" & "Learning" (The Analysis) */}
        <OpenAICase />
        <PainPoints />
        <Strategy />

        {/* Part 4: The Plan (Future Roadmap) */}
        <ProductDef />
        <Roadmap />

        {/* Part 5: The Grand Finale - The Company MVP */}
        {/* Detailed conclusion component proving the logic */}
        <MVPConclusion />
      </main>

      <Footer />
    </div>
  );
};

export default App;
