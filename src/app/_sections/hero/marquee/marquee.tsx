'use client';

import { useState } from 'react';

import styles from './marquee.module.css';

const technologies = [
  {
    name: 'React',
    icon: 'devicon-react-original',
  },
  {
    name: 'React Native',
    icon: 'devicon-reactnative-original',
  },
  {
    name: 'TypeScript',
    icon: 'devicon-typescript-plain',
  },
  {
    name: 'JavaScript',
    icon: 'devicon-javascript-plain',
  },
  {
    name: 'Node.js',
    icon: 'devicon-nodejs-plain',
  },
  {
    name: 'Next.js',
    icon: 'devicon-nextjs-plain',
  },
  {
    name: 'Tailwind CSS',
    icon: 'devicon-tailwindcss-original',
  },
  {
    name: 'Styled-components',
    icon: 'devicon-styledcomponents-plain',
  },
  {
    name: 'Storybook',
    icon: 'devicon-storybook-plain',
  },
  {
    name: 'GitHub Actions',
    icon: 'devicon-githubactions-plain',
  },
  {
    name: 'Biome',
    icon: 'devicon-biome-original',
  },
  {
    name: 'Figma',
    icon: 'devicon-figma-plain',
  },
  {
    name: 'Framer Motion',
    icon: 'devicon-framermotion-original',
  },
  {
    name: 'Zustand',
    icon: 'devicon-zustand-plain',
  },
];

type MarqueeGroup = {
  duplicate?: boolean;
};

function MarqueeGroup({ duplicate = false }: MarqueeGroup) {
  return (
    <ul className={styles.group} aria-hidden={duplicate ? true : undefined}>
      {technologies.map((tech) => (
        <li className={styles.technology} key={tech.name}>
          <i className={tech.icon} aria-hidden="true" />
          <span>{tech.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={styles.marquee}>
      <button
        type="button"
        className={styles.pauseButton}
        aria-pressed={isPaused}
        aria-label={isPaused ? 'Resume marquee animation' : 'Pause marquee animation'}
        onClick={() => setIsPaused((current) => !current)}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>

      <div className={styles.viewport}>
        <div className={styles.track} data-paused={isPaused ? 'true' : 'false'}>
          <MarqueeGroup />
          <MarqueeGroup duplicate />
        </div>
      </div>
    </div>
  );
}
