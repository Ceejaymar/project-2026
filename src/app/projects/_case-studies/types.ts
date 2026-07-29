import type { ComponentType } from 'react';
import type { ProjectLink } from '../projects-content';

export type CaseStudyMeta = {
  slug: string;
  title: string;
  eyebrow?: string;
  summary: string;
  year?: number;
  role?: string;
  type?: string;
  industry?: string;
  tech?: string;
  heroImage?: string;
  links?: ProjectLink[];
};

export type CaseStudyEntry = CaseStudyMeta & {
  Component: ComponentType;
};
