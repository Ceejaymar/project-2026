import Image from 'next/image';
import ExternalLink from '@/components/primitives/externalLink/external-link';
import { experienceItems, socialLinks } from './about-content';
import styles from './about-section.module.css';

function getSocialElementId(label: string) {
  return `about_social_${label.toLowerCase()}`;
}

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
            <div className={styles.portrait}>
              <Image
                className={styles.portraitImage}
                src="/images/about/headshot-reduced.webp"
                alt=""
                fill
                sizes="(min-width: 40rem) 9rem, 40vw"
              />
            </div>
            <p>
              I’m Carlos, a New York-based frontend engineer working between design and engineering.
              I specialize in translating product design into polished, accessible interfaces that
              hold up in production.
            </p>

            <p>
              Over the past several years, I’ve worked across cybersecurity, health tech, education,
              developer tools, and consumer product experiences, building interfaces that balance
              usability, craft, and engineering quality.
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
                <ExternalLink
                  href={link.href}
                  key={link.label}
                  analytics={{
                    eventName: `contact_clicked: ${link.label} (About)`,
                    eventProperties: {
                      contact_type: 'social',
                      platform: link.label.toLowerCase(),
                      placement: 'about',
                      element_id: getSocialElementId(link.label),
                      element_label: link.label,
                      destination_type: 'external',
                      destination: link.href,
                    },
                  }}
                >
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

                {item.description ? (
                  <p className={styles.experienceDescription}>{item.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
