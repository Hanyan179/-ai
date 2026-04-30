/** 术语小卡片 */
export interface Term {
  id: string;
  word: string;
  oneLiner: string;
  detail: string;
}

/** 场景 */
export interface Scenario {
  id: string;
  title: string;
  situation: string;
  prompt: string;
  why: string;
  /** 分类 */
  category: 'frontend' | 'backend' | 'deploy' | 'ai' | 'general';
  termIds?: string[];
  imageNote?: string;
}

/** 必要操作 */
export interface EssentialStep {
  id: string;
  title: string;
  description: string;
  prompt: string;
  why: string;
  termIds?: string[];
}

/** Trae 小技巧 */
export interface TraeTip {
  id: string;
  title: string;
  oneLiner: string;
  detail: string;
  link: string;
  linkLabel?: string;
}
