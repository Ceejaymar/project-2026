import {
  ArrowUpRightIcon,
  BookOpenIcon,
  GithubLogoIcon,
  GlobeIcon,
} from '@phosphor-icons/react/ssr';
import Image from 'next/image';

import TrackedLink from '@/components/analytics/tracked-link';
import { getOutboundEventName, getProjectEventName } from '@/lib/analytics';
import { projectItems } from './projects-content';
import styles from './projects-section.module.css';

export default function ProjectsSection() {
  const projectCount = projectItems.length.toString().padStart(2, '0');

  return (
    <section id="case-studies" className={styles.section} aria-labelledby="projects-title">
      <div className={styles.header}>
        <h2 id="projects-title" className={styles.title}>
          Case Studies
        </h2>

        <p className={styles.kicker}>Selected work</p>

        <p className={styles.count}>{projectCount} projects</p>
      </div>

      <ul className={styles.list}>
        {projectItems.map((project) => (
          <li className={styles.item} data-preview-kind={project.previewType} key={project.title}>
            <article className={styles.project}>
              <div className={styles.projectImage} aria-hidden="true">
                <Image
                  src={project.imageSrc}
                  alt=""
                  fill
                  sizes={
                    project.previewType === 'mobile'
                      ? '(min-width: 56rem) 28vw, 100vw'
                      : '(min-width: 56rem) 65vw, 100vw'
                  }
                />
              </div>

              <div className={styles.projectContent}>
                <div className={styles.projectHeading}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>

                  <p className={styles.projectEyebrow}>{project.eyebrow}</p>
                </div>

                <div className={styles.projectDetails}>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.links}>
                    {project.caseStudyHref ? (
                      <TrackedLink
                        href={`${project.caseStudyHref}?from=home`}
                        eventName={getProjectEventName(getProjectAnalyticsName(project))}
                        eventProperties={{
                          placement: 'case_studies',
                          element_id: `case_studies_${project.slug}_case_study`,
                          element_label: 'Read Case Study',
                          destination_type: 'internal',
                          destination: project.caseStudyHref,
                          project_slug: project.slug,
                          project_name: getProjectAnalyticsName(project),
                          action: 'case_study',
                          source_page: 'home',
                        }}
                      >
                        <BookOpenIcon aria-hidden="true" weight="bold" />

                        <span>Read Case Study</span>
                      </TrackedLink>
                    ) : null}

                    {project.liveHref ? (
                      <TrackedLink
                        href={project.liveHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        useNextLink={false}
                        eventName={getOutboundEventName(
                          getProjectAnalyticsName(project),
                          'Live Site',
                          'Case Studies',
                        )}
                        eventProperties={{
                          placement: 'case_studies',
                          element_id: `case_studies_${project.slug}_live_site`,
                          element_label: 'Live Site',
                          destination_type: 'external',
                          destination: project.liveHref,
                          project_slug: project.slug,
                          project_name: getProjectAnalyticsName(project),
                          action: 'live_site',
                          source_page: 'home',
                        }}
                      >
                        <GlobeIcon aria-hidden="true" weight="bold" />

                        <span>Live Site</span>

                        <ArrowUpRightIcon
                          className={styles.externalIcon}
                          aria-hidden="true"
                          weight="bold"
                        />
                      </TrackedLink>
                    ) : null}

                    {project.codeHref ? (
                      <TrackedLink
                        href={project.codeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        useNextLink={false}
                        eventName={getOutboundEventName(
                          getProjectAnalyticsName(project),
                          'Code',
                          'Case Studies',
                        )}
                        eventProperties={{
                          placement: 'case_studies',
                          element_id: `case_studies_${project.slug}_code`,
                          element_label: 'Code',
                          destination_type: 'external',
                          destination: project.codeHref,
                          project_slug: project.slug,
                          project_name: getProjectAnalyticsName(project),
                          action: 'github',
                          source_page: 'home',
                        }}
                      >
                        <GithubLogoIcon aria-hidden="true" weight="bold" />

                        <span>Code</span>

                        <ArrowUpRightIcon
                          className={styles.externalIcon}
                          aria-hidden="true"
                          weight="bold"
                        />
                      </TrackedLink>
                    ) : null}

                    {project.learnMoreHref ? (
                      <TrackedLink
                        href={project.learnMoreHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        useNextLink={false}
                        eventName={getOutboundEventName(
                          getProjectAnalyticsName(project),
                          'Learn More',
                          'Case Studies',
                        )}
                        eventProperties={{
                          placement: 'case_studies',
                          element_id: `case_studies_${project.slug}_learn_more`,
                          element_label: 'Learn More',
                          destination_type: 'external',
                          destination: project.learnMoreHref,
                          project_slug: project.slug,
                          project_name: getProjectAnalyticsName(project),
                          action: 'website',
                          source_page: 'home',
                        }}
                      >
                        <GlobeIcon aria-hidden="true" weight="bold" />

                        <span>
                          Learn More
                          <span className="visually-hidden"> about {project.title}</span>
                        </span>

                        <ArrowUpRightIcon
                          className={styles.externalIcon}
                          aria-hidden="true"
                          weight="bold"
                        />
                      </TrackedLink>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}

        <li className={styles.archiveItem}>
          <p className={styles.archiveText}>
            These are a couple standout projects. For older work, frontend challenges, experiments,
            and smaller builds, take a look at my{' '}
            <TrackedLink
              href="/projects"
              className={styles.archiveLink}
              eventName="cta_clicked: Full projects page (Case Studies)"
              eventProperties={{
                placement: 'case_studies',
                element_id: 'case_studies_full_projects_page',
                element_label: 'full projects page',
                destination_type: 'internal',
                destination: '/projects',
                source_page: 'home',
              }}
            >
              full projects page
            </TrackedLink>
            .
          </p>
        </li>
      </ul>
    </section>
  );
}

function getProjectAnalyticsName(project: { title: string; analyticsName?: string }) {
  return project.analyticsName ?? project.title;
}
