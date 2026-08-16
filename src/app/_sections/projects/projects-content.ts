type ProjectPreviewType = 'mobile' | 'desktop';

export type ProjectItem = {
  slug: string;
  title: string;
  analyticsName?: string;
  eyebrow: string;
  description: string;
  previewType: ProjectPreviewType;
  caseStudyHref?: string;
  liveHref?: string;
  codeHref?: string;
  learnMoreHref?: string;
  imageSrc: string;
};

export const projectItems: ProjectItem[] = [
  {
    slug: 'product-finder-quiz',
    title: 'Yubico Product Finder',
    eyebrow: 'React / TypeScript / UX Engineering',
    description:
      'An interactive product-selection experience built to help users find the right security key through a guided flow.',
    previewType: 'desktop',
    caseStudyHref: '/projects/product-finder-quiz',
    liveHref: 'https://www.yubico.com/quiz/',
    imageSrc: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio-2026/quiz-v1.webp',
  },
  {
    slug: 'mosaic',
    title: 'Mosaic',
    eyebrow: 'React Native / Product Engineering',
    description:
      'A privacy-first mood tracker with local-first storage, accessible settings, and a polished mobile interaction system.',
    previewType: 'mobile',
    caseStudyHref: '/projects/mosaic',
    learnMoreHref: 'https://joinmosaic.app',
    imageSrc: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio-2026/mosaic-v1.webp',
  },
];
