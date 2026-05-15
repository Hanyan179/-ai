import React from 'react';
import ProjectShowcase from './components/ProjectShowcase';
import { PERSONAL_PROJECTS } from './constants';

const PortfolioPage: React.FC = () => {
  return (
    <main className="flex flex-col">
      <ProjectShowcase
        data={PERSONAL_PROJECTS}
        title={'\u201C后端开发\u201D\u2192\u201C独立制作人\u201D'}
        subtitle="Evidence of Execution"
        withEvolutionCard={true}
      />
    </main>
  );
};

export default PortfolioPage;
