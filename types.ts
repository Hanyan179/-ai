export interface SectionProps {
  id: string;
}

export interface StatItem {
  label: string;
  value: string;
  sub: string;
}

export interface InsightItem {
  title: string;
  desc: string;
}

export interface RoadmapStep {
  phase: string;
  name: string;
  desc: string;
  action: string;
}

export interface StrategyData {
  title: string;
  subtitle: string;
  analogy: {
    title: string;
    engine: string;
    fuel: string;
    desc: string;
  };
  databricks: {
    title: string;
    problem: string;
    solution: string;
    result: string;
  };
  moat: {
    title: string;
    content: string;
  };
}

export interface ProfileData {
  name: string;
  role: string;
  slogan: string;
  standards: {
    key: string; // e.g., "善思"
    title: string; // e.g., "Thinking"
    desc: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  images: string[];
  video?: string; // Optional URL for video demo (mp4/webm)
  link?: string; // Optional link property
}

export interface CapabilityItem {
  title: string;
  icon: string; // lucide icon name
  desc: string;
  color: string;
}

export interface EngineerDefnData {
  title: string;
  desc: string;
  triad: CapabilityItem[];
}

export interface ProductDefData {
  title: string;
  subtitle: string;
  philosophy: { label: string; desc: string }[];
  techStack: {
    skill: string;
    skillDesc: string;
    agent: string;
    agentDesc: string;
  };
}

// New Interface for MVP Deep Dive
export interface MVPAnalysisData {
  comparison: {
    current: {
      title: string;
      points: string[];
    };
    mvp: {
      title: string;
      points: string[];
    };
  };
  future: {
    title: string;
    items: {
      label: string;
      status: string; // e.g., "MVP Missing"
      desc: string;
    }[];
  };
}