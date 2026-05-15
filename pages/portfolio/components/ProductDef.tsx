import React from 'react';
import SectionWrapper from './SectionWrapper';
import { PRODUCT_DATA } from '../constants';
import { ShieldCheck } from 'lucide-react';

const ProductDef: React.FC = () => {
  return (
    <SectionWrapper className="bg-background">
      
      {/* SECTION: The Product Philosophy (The Output) */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="text-accent font-semibold tracking-wide text-sm uppercase mb-2 block">Product Philosophy</span>
        <h2 className="text-4xl font-bold text-primary tracking-tight mb-4">{PRODUCT_DATA.title}</h2>
        <div className="inline-block px-4 py-2 bg-surfaceHighlight rounded-full border border-primary/5">
             <p className="text-base text-primary font-medium">{PRODUCT_DATA.subtitle}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
          {PRODUCT_DATA.pillars.map((item, index) => (
            <div key={index} className="bento-card p-8 flex flex-col items-center text-center hover:bg-surfaceHighlight transition-colors duration-300 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-secondary mb-4 opacity-50" />
              <h4 className="text-lg font-bold text-primary mb-2">{item.label}</h4>
              <p className="text-secondary text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
      </div>

    </SectionWrapper>
  );
};

export default ProductDef;
