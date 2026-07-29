import {
  ArrowUpRightIcon,
  BookOpenIcon,
  GithubLogoIcon,
  GlobeIcon,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import styles from './projects.module.css';
import { fullProjects, type Project, type ProjectLink } from './projects-content';

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.lead}>
          A chronological collection of product work, portfolio builds, frontend challenges, and
          experiments across web and mobile.
        </p>
      </header>

      <ul className={styles.grid}>
        {fullProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </ul>
    </main>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardSize = project.cardSize ?? 'standard';

  return (
    <li className={styles.item} data-card-size={cardSize}>
      <article className={styles.card}>
        <div className={styles.imageWrap}>
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes={
              cardSize === 'large'
                ? '(min-width: 72rem) 50vw, (min-width: 48rem) 100vw, 100vw'
                : '(min-width: 72rem) 33vw, (min-width: 48rem) 50vw, 100vw'
            }
            style={{
              objectPosition: project.imagePosition ?? 'center top',
            }}
          />
        </div>

        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.cardTop}>
          <span>{project.year}</span>
          {project.status ? <span>{project.status}</span> : null}
        </div>

        <div className={styles.cardContent}>
          <div className={styles.cardHeading}>
            <h2 className={styles.cardTitle}>{project.title}</h2>
            <p className={styles.description}>{project.shortDescription}</p>
          </div>

          <ul className={styles.techList} aria-label={`Technologies used for ${project.title}`}>
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <ProjectLinks links={project.links} />
        </div>
      </article>
    </li>
  );
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  return (
    <ul className={styles.links}>
      {links.map((link) => {
        if ('to' in link) {
          return (
            <li key={link.to}>
              <Link className={styles.projectLink} href={link.to}>
                {getLinkIcon(link.type)}
                <span>{link.label}</span>
              </Link>
            </li>
          );
        }

        return (
          <li key={link.url}>
            <a className={styles.projectLink} href={link.url} target="_blank" rel="noreferrer">
              {getLinkIcon(link.type)}
              <span>{link.label}</span>
              <ArrowUpRightIcon aria-hidden="true" weight="bold" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function getLinkIcon(type: ProjectLink['type']) {
  switch (type) {
    case 'github':
      return <GithubLogoIcon aria-hidden="true" weight="bold" />;
    case 'case-study':
      return <BookOpenIcon aria-hidden="true" weight="bold" />;
    case 'web':
    case 'marketing':
    default:
      return <GlobeIcon aria-hidden="true" weight="bold" />;
  }
}
