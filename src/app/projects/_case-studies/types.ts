import type { ComponentType } from 'react';
import type { ReferrerContext } from '@/lib/analytics';
import type { ProjectLink } from '../projects-content';

export type CaseStudyMeta = {
  slug: string;
  title: string;
  analyticsName?: string;
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
  Component: ComponentType<CaseStudyComponentProps>;
};

export type CaseStudyComponentProps = {
  backHref?: string;
  backLabel?: string;
  projectSlug?: string;
  projectName?: string;
  referrerContext?: ReferrerContext;
};
