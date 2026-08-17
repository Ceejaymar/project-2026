export type CraftItem = {
  slug: string;
  title: string;
  description: string;
  codeHref: string;
  previewSrc?: string;
  demoType: string;
  details: string[];
};

export const craftItems = [
  {
    slug: 'a11y-accordion',
    title: 'Exclusive accordion',
    description:
      'A polished accordion interaction focused on clear hierarchy, purposeful motion, and responsive feedback.',
    codeHref:
      'https://github.com/Ceejaymar/project-2026/blob/main/src/app/craft/accordion/accordion.tsx',
    previewSrc: '/videos/accordion.mp4',
    demoType: 'accordion',
    details: [
      'Built around native button controls for predictable keyboard interaction.',
      'Keeps the interaction focused by allowing one section to remain open at a time.',
      'Uses motion to reinforce the relationship between each trigger and its content.',
      'Maintains clear visual states without relying on animation alone.',
      'Includes a reduced-motion option for a calmer version of the interaction.',
    ],
  },
] satisfies CraftItem[];
