// Easy-Vibe Page Types — 纯站内，无外链

export interface NewsItem {
  date: string;
  emoji: string;
  title: string;
  description: string;
}

export interface LearningPath {
  icon: string;
  title: string;
  audience: string;
  learn: string;
  outcome: string;
  color: string;
  detail: string;
  keyPoints: string[];
}

export interface CurriculumChapter {
  title: string;
  description: string;
  detail: string;
  keyPoints: string[];
}

export interface CurriculumSection {
  stage: string;
  stageLabel: string;
  color: string;
  icon: string;
  chapters: CurriculumChapter[];
}

export interface KnowledgeTopic {
  name: string;
  detail: string;
  keyPoints: string[];
}

export interface KnowledgeArea {
  icon: string;
  title: string;
  color: string;
  topics: KnowledgeTopic[];
}

export interface FeatureHighlight {
  title: string;
  subtitle: string;
}

export interface Contributor {
  name: string;
  role: string;
}
