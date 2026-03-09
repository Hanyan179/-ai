import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { Layers, ArrowUpRight, Image as ImageIcon, Rocket, ChevronLeft, ChevronRight, CheckCircle2, Globe, PlayCircle } from 'lucide-react';
import { ProjectItem } from '../types';

// Helper to parse bold syntax **text**
const parseText = (text: string) => {
  // Replace **text** with <span class="text-white font-bold">text</span>
  return text.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-bold">$1</span>');
};

// Export ProjectCard so MVPConclusion.tsx can use it
export const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  // Render logic for description with basic markdown support
  const renderDescription = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      
      // Handle empty lines as spacers
      if (!trimmed) return <div key={i} className="h-4" />;

      // Handle Blockquotes (> Text)
      if (trimmed.startsWith('>')) {
        const content = trimmed.replace(/^>\s?/, '');
        return (
          <div key={i} className="flex gap-3 p-3 my-2 bg-warning/5 border-l-2 border-warning rounded-r-lg">
             <div className="text-warning shrink-0 mt-0.5 opacity-80">Note:</div>
             <div 
               className="text-sm text-white/90 leading-relaxed"
               dangerouslySetInnerHTML={{ __html: parseText(content) }} 
             />
          </div>
        );
      }

      // Normal paragraph
      return (
        <p 
          key={i} 
          className="text-secondary leading-relaxed mb-2 text-lg"
          dangerouslySetInnerHTML={{ __html: parseText(line) }}
        />
      );
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center group">
      {/* Media Area (Video or Image Gallery) */}
      <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className={`${project.id === 'p3' ? 'aspect-[9/19] max-w-sm mx-auto' : 'aspect-[16/10]'} rounded-3xl overflow-hidden border border-white/10 relative bg-surfaceHighlight/20 shadow-2xl group-hover:border-white/20 transition-colors`}>
          
          {project.video ? (
            /* Video Player Logic */
            <div className="w-full h-full">
              <video 
                src={project.video}
                poster={project.images.length > 0 ? project.images[0] : undefined}
                controls
                className="w-full h-full object-cover"
                style={{ backgroundColor: '#000' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            /* Image Gallery Logic */
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* 
                      PLACEHOLDER LOGIC: 
                      If real images are missing (placeholder paths), show the placeholder style.
                  */}
                  {project.images && project.images.length > 0 && !project.images[0].includes('placeholder') ? (
                       <img src={project.images[currentImageIdx]} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                      <div className={`w-full h-full flex flex-col items-center justify-center bg-surfaceHighlight text-secondary/50`}>
                          <ImageIcon size={48} className="mb-4 opacity-50" />
                          <span className="text-xs uppercase tracking-widest font-medium">
                              {project.title} - View {currentImageIdx + 1}
                          </span>
                          <span className="text-[10px] mt-2 opacity-60 max-w-[200px] text-center">
                            Image {currentImageIdx + 1} of {project.images.length}
                          </span>
                      </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows (Only if > 1 image) */}
              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors z-20"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-colors z-20"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                    {project.images.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIdx ? 'bg-white w-3' : 'bg-white/40'}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Overlay Gradient for Images */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none"></div>
            </>
          )}

        </div>

        {/* Floating Tech Badges */}
        <div className="absolute -bottom-5 left-6 right-6 flex flex-wrap gap-2 pointer-events-none z-30">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-3 py-1.5 bg-surface/90 backdrop-blur-md border border-white/10 rounded-lg text-xs font-medium text-white shadow-lg">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div className="flex items-center space-x-3 mb-4">
          <Layers size={20} className="text-accent" />
          <span className="text-sm font-bold text-accent uppercase tracking-wide">
            {project.category}
          </span>
        </div>

        <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          {project.title}
        </h3>

        <div className="mb-8">
           {renderDescription(project.description)}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {project.metrics.map((metric, i) => (
            <div key={i} className="border-l-2 border-white/10 pl-4">
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-secondary uppercase tracking-wider">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Conditional Link Rendering: Only show if link exists */}
        {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-all duration-300 border border-white/5 hover:scale-105"
            >
              <Globe size={18} />
              <span>Live Demo ({new URL(project.link).hostname})</span>
              <ArrowUpRight size={16} />
            </a>
        )}
      </div>
    </div>
  );
};

interface ProjectShowcaseProps {
  data: ProjectItem[];
  title: string;
  subtitle: string;
  withEvolutionCard?: boolean;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ 
  data, 
  title, 
  subtitle, 
  withEvolutionCard = false 
}) => {
  return (
    <SectionWrapper className="bg-background">
      <div className="mb-12">
        <span className="text-accent font-semibold tracking-wide text-sm uppercase mb-2 block">
          {subtitle}
        </span>
        <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
          {title}
        </h2>
        
        {withEvolutionCard && (
          <div className="p-6 rounded-2xl bg-surfaceHighlight/30 border border-white/5 max-w-4xl mt-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-xl text-accent">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="text-white font-bold mb-2 text-lg">我的 AI 全栈进化史 (2023 - 2025)</h4>
                 <p className="text-secondary text-sm leading-relaxed mb-4">
                   我将<span className="text-white font-medium">技术探索视为最高级的娱乐</span>。
                   从 2023 年仅能利用 Prompt 做简单工具尝试，到 2025 年彻底爆发，利用<span className="text-white font-medium">业余时间</span>打破了“Java 后端”的职能边界。
                   我不仅出于兴趣独立完成了<span className="text-white font-medium">Web 全栈系统</span>和<span className="text-white font-medium">iOS 原生应用</span>，
                   更将这种<span className="text-accent font-bold">业余时间积累的能力反哺公司</span>，在下方（汇报最后）展示的 MVP 中得到了终极验证。
                 </p>
                 <div className="flex flex-col md:flex-row gap-4 text-xs font-medium text-white/80">
                    <div className="flex items-center gap-2 opacity-60">
                      <CheckCircle2 size={14} /> 2023: AI 助手 (Hobby)
                    </div>
                    <div className="hidden md:block text-white/20">→</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green-500"/> 2025: 独立全栈 (Geek)
                    </div>
                    <div className="hidden md:block text-white/20">→</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-accent"/> Now: 反哺公司 (Value)
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-24">
        {data.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default ProjectShowcase;