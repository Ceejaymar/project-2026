import {
  ArrowUpRightIcon,
  BookOpenIcon,
  GithubLogoIcon,
  GlobeIcon,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import TrackedLink from '@/components/analytics/tracked-link';
import { getOutboundEventName, getProjectEventName } from '@/lib/analytics';
import styles from './projects.module.css';
import { fullProjects, type Project, type ProjectLink } from './projects-content';

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <TrackedLink
          className={styles.backHomeLink}
          href="/#case-studies"
          eventName="nav_clicked: Back to home (Projects)"
          eventProperties={{
            source_page: 'projects',
            placement: 'projects_page',
            element_id: 'projects_back_home',
            element_label: 'Back to home',
            destination: '/#case-studies',
            destination_type: 'internal',
          }}
        >
          Back to home
        </TrackedLink>

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

        <div className={styles.cardTop}>
          <span>{project.year}</span>
        </div>

        <div className={styles.cardContent}>
          <div className={styles.cardHeading}>
            <h2 className={styles.cardTitle}>{project.title}</h2>
          </div>

          <div className={styles.cardReveal}>
            <p className={styles.description}>{project.shortDescription}</p>

            <ul className={styles.techList} aria-label={`Technologies used for ${project.title}`}>
              {project.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            <ProjectLinks project={project} links={project.links} />
          </div>
        </div>
      </article>
    </li>
  );
}

function ProjectLinks({ project, links }: { project: Project; links: ProjectLink[] }) {
  const projectName = getProjectAnalyticsName(project);

  return (
    <ul className={styles.links}>
      {links.map((link) => {
        if ('to' in link) {
          return (
            <li key={link.to}>
              <TrackedLink
                className={styles.projectLink}
                href={`${link.to}?from=projects`}
                eventName={getProjectEventName(projectName)}
                eventProperties={{
                  placement: 'projects_page',
                  element_id: `projects_page_${project.slug}_case_study`,
                  element_label: link.label,
                  destination_type: 'internal',
                  destination: link.to,
                  project_slug: project.slug,
                  project_name: projectName,
                  action: 'case_study',
                  source_page: 'projects',
                }}
              >
                {getLinkIcon(link.type)}
                <span>{link.label}</span>
              </TrackedLink>
            </li>
          );
        }

        return (
          <li key={link.url}>
            <TrackedLink
              className={styles.projectLink}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              useNextLink={false}
              eventName={getOutboundEventName(projectName, link.label, 'Projects Page')}
              eventProperties={{
                placement: 'projects_page',
                element_id: `projects_page_${project.slug}_${getProjectLinkElementKey(link)}`,
                element_label: link.label,
                destination_type: 'external',
                destination: link.url,
                project_slug: project.slug,
                project_name: projectName,
                action: getProjectLinkAction(link),
                source_page: 'projects',
              }}
            >
              {getLinkIcon(link.type)}
              <span>{link.label}</span>
              <ArrowUpRightIcon aria-hidden="true" weight="bold" />
            </TrackedLink>
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
      return <GlobeIcon aria-hidden="true" weight="bold" />;
  }
}

function getProjectAnalyticsName(project: Project) {
  return project.analyticsName ?? project.title;
}

function getProjectLinkElementKey(link: Exclude<ProjectLink, { type: 'case-study' }>) {
  if (link.type === 'github') {
    return 'github';
  }

  if (link.type === 'marketing') {
    return 'marketing';
  }

  return link.label.toLowerCase() === 'live site' ? 'live_site' : 'website';
}

function getProjectLinkAction(link: Exclude<ProjectLink, { type: 'case-study' }>) {
  if (link.type === 'github') {
    return 'github';
  }

  if (link.type === 'marketing') {
    return 'marketing';
  }

  return link.label.toLowerCase() === 'live site' ? 'live_site' : 'website';
}
