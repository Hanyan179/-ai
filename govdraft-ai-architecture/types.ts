import { LucideIcon } from "lucide-react";

export type ModuleType = 'input' | 'router' | 'processor' | 'assembler' | 'review' | 'output' | 'learning';

export interface ProcessStep {
  id: string;
  name: string;
  tech: string;
  desc: string;
}

export interface SystemModule {
  id: string;
  title: string;
  technicalLabel: string;
  type: ModuleType;
  icon: LucideIcon;
  
  // User View (Simplicity)
  userSummary: string; 
  
  // Engineering View (Implementation)
  ioShape: { input: string; output: string };
  latency: string;
  techStack: string[];
  techNote?: string; // Layer 3: Underlying Technology Description
  authorNote?: string; // Product Insight / Human Nature Observation
  pipeline: ProcessStep[]; // The actual execution steps
}

export interface ComparisonPoint {
  feature: string;
  rapid: string;
  engineering: string;
  verdict: string;
}
