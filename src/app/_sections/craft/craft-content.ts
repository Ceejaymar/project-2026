export type CraftItem = {
  slug: string;
  title: string;
  description: string;
  codeHref: string;
  previewSrc?: string;
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
    title: 'Accessible Modal',
    description:
      'A keyboard-friendly modal focused on predictable focus management, clear dismissal patterns, and an accessible experience for every user.',
    codeHref: 'https://github.com',
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
];
