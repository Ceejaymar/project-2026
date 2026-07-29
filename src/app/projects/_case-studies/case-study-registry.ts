import MosaicCaseStudy from './mosaic/mosaic-case-study';
import { mosaicCaseStudyMeta } from './mosaic/mosaic-case-study-data';
import type { CaseStudyEntry } from './types';

export const caseStudies = {
  mosaic: {
    ...mosaicCaseStudyMeta,
    Component: MosaicCaseStudy,
  },
} satisfies Record<string, CaseStudyEntry>;

export type CaseStudySlug = keyof typeof caseStudies;

export const caseStudySlugs = Object.keys(caseStudies) as CaseStudySlug[];

export function getCaseStudy(slug: string) {
  if (!Object.hasOwn(caseStudies, slug)) {
    return undefined;
  }

  return caseStudies[slug as CaseStudySlug];
}
