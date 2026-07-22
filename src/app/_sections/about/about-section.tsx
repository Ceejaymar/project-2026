import ExternalLink from '@/components/primitives/externalLink/external-link';

import { aboutMeta, experienceItems, socialLinks } from './about-content';
import styles from './about-section.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.header}>
        <h2 id="about-title" className={styles.title}>
          About
        </h2>

        <p className={styles.kicker}>A little more context</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.bio}>
          <div className={styles.copy}>
            <div className={styles.portrait} />
            <p>
              I’m a frontend engineer with a strong eye for design, focused on building polished,
              accessible interfaces that preserve design intent all the way into production.
            </p>

            <p>
              I enjoy working in the space between design and development, where small interaction
              details, thoughtful systems, and clear UX decisions can make a product feel more
              useful and considered.
            </p>

            <p>
              Outside of product work, I’m drawn to creative projects, visual experiments, travel,
              music, and documenting the small details that shape taste and perspective.
            </p>
          </div>

          <div className={styles.socials}>
            <p className={styles.socialsLabel}>Elsewhere</p>

            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <ExternalLink href={link.href} key={link.label}>
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
        <aside className={styles.experience} aria-labelledby="experience-title">
          <h3 id="experience-title" className={styles.experienceTitle}>
            Experience
          </h3>

          <ul className={styles.experienceList}>
            {experienceItems.map((item) => (
              <li className={styles.experienceItem} key={item.company}>
                <div>
                  <p className={styles.company}>{item.company}</p>
                  <p className={styles.role}>{item.title}</p>
                </div>

                <p className={styles.period}>{item.period}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
