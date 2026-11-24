export type CraftItem = {
  slug: string;
  title: string;
  description: string;
  codeHref: string;
  previewSrc?: string;
  details: string[];
  inspiration?: {
    label: string;
    href: string;
  };
  comparison?: {
    approaches: [CraftApproach, CraftApproach];
  };
};

export type CraftApproach = {
  label: string;
  codeHref: string;
  highlights: string[];
};

export const craftItems: CraftItem[] = [
  {
    slug: 'a11y-accordion',
    title: 'Exclusive accordion',
    description:
      'A polished accordion interaction focused on clear hierarchy, purposeful motion, and responsive feedback.',
    codeHref:
      'https://github.com/Ceejaymar/project-2026/blob/main/src/app/craft/accordion/accordion.tsx',
    previewSrc: '/videos/accordion.mp4',
    details: [
      'Built around native button controls for predictable keyboard interaction.',
      'Keeps the interaction focused by allowing one section to remain open at a time.',
      'Uses motion to reinforce the relationship between each trigger and its content.',
      'Maintains clear visual states without relying on animation alone.',
      'Includes a reduced-motion option for a calmer version of the interaction.',
    ],
  },
  {
    slug: 'a11y-modal',
    title: 'Accessible modal',
    description:
      'A keyboard-friendly modal focused on predictable focus management, clear dismissal patterns, and an accessible experience for every user.',
    codeHref: 'https://github.com/Ceejaymar/project-2026/blob/main/src/app/craft/modal/modal.tsx',
    previewSrc: '/videos/modal.mp4',
    details: [
      'Uses FocusLock to keep keyboard focus contained within the modal while it is open.',
      'Restores focus to the element that opened the modal after it is dismissed.',
      'Prevents the background page from scrolling with RemoveScroll while preserving scroll inside the modal.',
      'Supports multiple dismissal methods, including Escape, the close button, and clicking the backdrop.',
      'Defines dialog semantics with `role="dialog"` and `aria-modal`, and associates the modal with its visible title.',
      'Pairs icon-only controls with visually hidden text so their purpose remains clear to screen reader users.',
    ],
  },
  {
    slug: 'morphing-pills',
    title: 'Morphing pills: CSS vs Motion',
    description:
      'An Apple-inspired interaction built with CSS and Motion, exploring two approaches to fluid transitions, spring behavior, and accessible animation.',
    codeHref:
      'https://github.com/Ceejaymar/project-2026/blob/main/src/app/craft/morphing-pills/morphing-pills.tsx',
    previewSrc: '/videos/morphing-pills.mp4',
    details: [
      'Animates width, height, and text independently to create fluid transitions.',
      'Supports direct selection and previous/next navigation, with one pill expanded at a time.',
      'Uses native buttons, accessible expanded states, and visible keyboard focus indicators.',
      'Respects system and page-level reduced-motion preferences.',
    ],

    comparison: {
      approaches: [
        {
          label: 'CSS',
          codeHref:
            'https://github.com/Ceejaymar/project-2026/blob/main/src/app/craft/morphing-pills/morphing-pills-css.tsx',
          highlights: [
            'Uses custom linear() easing curves to simulate spring physics',
            'Uses grid-based height transitions and directional keyframes for text and navigation.',
            'Runs entirely through native CSS animations without an additional animation dependency.',
          ],
        },
        {
          label: 'Motion',
          codeHref:
            'https://github.com/Ceejaymar/project-2026/blob/main/src/app/craft/morphing-pills/morphing-pills-motion.tsx',
          highlights: [
            'Uses physics-based springs with adjustable stiffness, damping, and mass for more natural movement.',
            'Animates height, text, and navigation directly through React state.',
            'Smoothly adapts to interrupted animations and changing targets without manually defining easing curves.',
          ],
        },
      ],
    },
    inspiration: {
      label: 'Apple — iPhone Duo',
      href: 'https://www.apple.com/iphone-duo/#product-viewer',
    },
  },

  {
    slug: 'magnetic-slider',
    title: 'Magnetic slider',
    description: '',
    codeHref: '',
    previewSrc: '/videos/xxxx',
    details: ['', ''],
  },
];
