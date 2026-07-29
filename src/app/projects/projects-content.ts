export type ProjectLink =
  | {
      label: string;
      url: string;
      type: 'github' | 'web' | 'apple' | 'android' | 'marketing';
    }
  | {
      label: string;
      to: string;
      type: 'case-study';
      internal: true;
    };

export type Project = {
  title: string;
  slug?: string;
  analyticsName?: string;
  image: string;
  shortDescription: string;
  description?: string;
  year: number;
  tech: string[];
  links: ProjectLink[];
  cardSize?: 'standard' | 'large';
  imagePosition?: string;
  status?: 'WIP';
};

export const fullProjects: Project[] = [
  {
    title: 'Mosaic',
    slug: 'mosaic',
    cardSize: 'large',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/mosaic.webp',
    shortDescription:
      'A privacy-first mood tracker that turns daily emotional check-ins into a visual calendar of color.',
    year: 2026,
    tech: ['React Native', 'Expo', 'TypeScript', 'Unistyles'],
    links: [
      {
        label: 'Learn More',
        url: 'https://joinmosaic.app',
        type: 'web',
      },
      {
        label: 'Read Case Study',
        to: '/projects/mosaic',
        type: 'case-study',
        internal: true,
      },
    ],
  },
  {
    title: 'Values Page Challenge',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/values-page.png',
    shortDescription:
      'A polished product-values flow focused on responsive layouts, visual hierarchy, and clean interaction states.',
    year: 2026,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/byl-eng-eval',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://values-page.vercel.app/discover/breakdown',
        type: 'web',
      },
    ],
  },
  {
    title: 'Kanban',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/kanban.png',
    shortDescription:
      'A drag-and-drop kanban board for organizing job or task pipelines with a clean, focused interface.',
    year: 2025,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/beyou-kanban',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://beyou-kanban.vercel.app/',
        type: 'web',
      },
    ],
  },
  {
    title: 'Resplash',
    cardSize: 'large',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/resplash.webp',
    shortDescription:
      'An image discovery app using the Unsplash API, built around search, browsing, and responsive image presentation.',
    year: 2025,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Unsplash API'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/resplash',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://fe-challenge-resplash.vercel.app/',
        type: 'web',
      },
    ],
  },
  {
    title: 'Pricing Section',
    image:
      'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/fc-pricing-section.webp',
    shortDescription:
      'A frontend challenge focused on pricing UI, responsive layout, and clean component structure.',
    year: 2025,
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/frontend-challenges/tree/main/apps/pricing-section',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://frontend-challenges-pricing-section.vercel.app/',
        type: 'web',
      },
    ],
  },
  {
    title: 'Blog Card',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/fc-blog-card.webp',
    shortDescription:
      'A small HTML and CSS component exercise focused on spacing, hierarchy, and visual polish.',
    year: 2025,
    tech: ['HTML', 'CSS'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/frontend-challenges/tree/main/apps/blog-card',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://frontend-challenges-blog-card.vercel.app/',
        type: 'web',
      },
    ],
  },
  {
    title: 'Batéy Fashion',
    analyticsName: 'Batey',
    status: 'WIP',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/batey.webp',
    shortDescription:
      'A fashion-brand exploration inspired by culture, identity, storytelling, and ecommerce UI systems.',
    year: 2025,
    tech: ['Next.js', 'TypeScript', 'CSS Modules', 'Better-SQLite3', 'Zod'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/batey-fs',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://batey.vercel.app/',
        type: 'web',
      },
    ],
  },
  {
    title: 'Accessibility Drawer',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/a11y-drawer.webp',
    shortDescription:
      'A customizable accessibility settings drawer for adjusting interface preferences directly in the UI.',
    year: 2025,
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/a11y-drawer',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://a11y-drawer.netlify.app/',
        type: 'web',
      },
    ],
  },
  {
    title: 'Portfolio Website',
    cardSize: 'large',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/portfolio-website.webp',
    shortDescription:
      'My current portfolio, built to showcase frontend projects, motion, visual polish, and creative engineering work.',
    year: 2024,
    tech: ['React', 'TypeScript', 'Styled Components', 'Framer Motion'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/project-2024',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://los.codes',
        type: 'web',
      },
    ],
  },
  {
    title: 'Yubico Product Finder Quiz',
    slug: 'product-finder-quiz',
    cardSize: 'large',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/quiz-start.webp',
    shortDescription:
      'An interactive product-selection quiz built to help users find the right YubiKey through guided questions.',
    year: 2023,
    tech: ['React', 'Tailwind CSS', 'TypeScript'],
    links: [
      {
        label: 'Live Site',
        url: 'https://www.yubico.com/quiz/',
        type: 'web',
      },
      {
        label: 'Read Case Study',
        to: '/projects/product-finder-quiz',
        type: 'case-study',
        internal: true,
      },
    ],
  },
  {
    title: 'Weather App',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/weather.webp',
    shortDescription:
      'A simple weather app that shows local or searched forecasts using the OpenWeather API.',
    year: 2022,
    tech: ['React', 'Styled Components', 'Storybook', 'Axios'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/weather',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://starlit-queijadas-1645a0.netlify.app/',
        type: 'web',
      },
    ],
  },
  {
    title: 'The Ends Ecommerce',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/TheEnds.webp',
    shortDescription:
      'A full-stack ecommerce project with product browsing, cart flows, authentication, and backend data handling.',
    year: 2019,
    tech: ['React', 'Sass', 'Node', 'Postgres', 'Express', 'Firebase'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/TheEnds-ecommerce-frontend',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://theends.web.app/',
        type: 'web',
      },
    ],
  },
  {
    title: 'Portfolio Website, Old',
    image:
      'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/portfolio-website-old.webp',
    shortDescription:
      'An earlier portfolio iteration focused on project presentation and frontend fundamentals.',
    year: 2019,
    tech: ['React', 'MUI'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/portfolio-2019',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://carlosmartinez.dev/',
        type: 'web',
      },
    ],
  },
  {
    title: 'Dreamshare Clone',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/Dreamshare.webp',
    shortDescription:
      'A responsive landing page recreation focused on layout, spacing, and early React/Sass practice.',
    year: 2018,
    tech: ['React', 'Sass'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/Dreamshare-morty',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://dreamshare-cm.surge.sh/',
        type: 'web',
      },
    ],
  },
  {
    title: 'Knobcreek Clone',
    image: 'https://los-project-images.s3.us-east-1.amazonaws.com/portfolio/Knobcreek.webp',
    shortDescription:
      'A responsive brand-page recreation focused on visual layout and frontend implementation practice.',
    year: 2018,
    tech: ['React', 'Sass'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Ceejaymar/knobcreek-barrel',
        type: 'github',
      },
      {
        label: 'Live Site',
        url: 'https://knobcreek-cm.surge.sh/',
        type: 'web',
      },
    ],
  },
];
