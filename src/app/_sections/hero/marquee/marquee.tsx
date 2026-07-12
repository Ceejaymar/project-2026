import styles from './marquee.module.css';

const technologies = [
  {
    name: 'React',
    icon: 'devicon-react-original colored',
  },
  {
    name: 'React Native',
    icon: 'devicon-reactnative-original colored',
  },
  {
    name: 'TypeScript',
    icon: 'devicon-typescript-plain colored',
  },
  {
    name: 'JavaScript',
    icon: 'devicon-javascript-plain colored',
  },
  {
    name: 'Node.js',
    icon: 'devicon-nodejs-plain colored',
  },
  {
    name: 'Next.js',
    icon: 'devicon-nextjs-plain colored',
  },
  {
    name: 'Tailwind CSS',
    icon: 'devicon-tailwindcss-original colored',
  },
  {
    name: 'Styled-components',
    icon: 'devicon-styledcomponents-plain colored',
  },
  {
    name: 'Storybook',
    icon: 'devicon-storybook-plain colored',
  },
  {
    name: 'GitHub Actions',
    icon: 'devicon-githubactions-plain colored',
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
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <MarqueeGroup />
        <MarqueeGroup duplicate />
      </div>
    </div>
  );
}
