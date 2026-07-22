type ProjectPreviewType = 'mobile' | 'desktop';

export type ProjectItem = {
  title: string;
  eyebrow: string;
  description: string;
  previewType: ProjectPreviewType;
  caseStudyHref?: string;
  liveHref?: string;
  codeHref?: string;
  learnMoreHref?: string;
};

export const projectItems: ProjectItem[] = [
  {
    title: 'Yubico Product Finder',
    eyebrow: 'React / TypeScript / UX Engineering',
    description:
      'An interactive product-selection experience built to help users find the right security key through a guided flow.',
    previewType: 'desktop',
    caseStudyHref: '/projects/yubico-product-finder',
    liveHref: 'https://yubico.com/',
  },
  {
    title: 'Mosaic',
    eyebrow: 'React Native / Product Engineering',
    description:
      'A privacy-first mood tracker with local-first storage, accessible settings, and a polished mobile interaction system.',
    previewType: 'mobile',
    caseStudyHref: '/projects/mosaic',
    learnMoreHref: 'https://trymosaic.com',
  },
];
