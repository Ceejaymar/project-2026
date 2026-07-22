import Link from 'next/link';

import { projectItems } from './projects-content';
import styles from './projects-section.module.css';

export default function ProjectsSection() {
  const projectCount = projectItems.length.toString().padStart(2, '0');

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className={styles.header}>
        <h2 id="projects-title" className={styles.title}>
          Projects
        </h2>

        <p className={styles.kicker}>Selected work</p>

        <p className={styles.count}>{projectCount} projects</p>
      </div>

      <ul className={styles.list}>
        {projectItems.map((project) => (
          <li className={styles.item} data-preview-kind={project.previewType} key={project.title}>
            <article className={styles.project}>
              <div className={styles.projectContent}>
                <div>
                  <p className={styles.projectEyebrow}>{project.eyebrow}</p>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>

                <div className={styles.projectDetails}>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.links}>
                    {project.caseStudyHref ? (
                      <Link href={project.caseStudyHref}>Case Study</Link>
                    ) : null}

                    {project.liveHref ? (
                      <a href={project.liveHref} target="_blank" rel="noopener noreferrer">
                        Live
                      </a>
                    ) : null}

                    {project.codeHref ? (
                      <a href={project.codeHref} target="_blank" rel="noopener noreferrer">
                        Code
                      </a>
                    ) : null}

                    {project.learnMoreHref ? (
                      <a href={project.learnMoreHref} target="_blank" rel="noopener noreferrer">
                        Learn More <span className="visually-hidden">about {project.title}</span>
                      </a>
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
            and smaller builds, take a look at <Link href="/projects">my full projects page</Link>.
          </p>
        </li>
      </ul>
    </section>
  );
}
