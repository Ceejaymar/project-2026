import { ArrowUpRightIcon, GithubLogoIcon, GlobeIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';

import { craftItems } from './craft-content';
import styles from './craft-section.module.css';

export default function CraftSection() {
  return (
    <section id="craft" className={styles.section} aria-labelledby="craft-title">
      <div className={styles.header}>
        <h2 id="craft-title" className={styles.title}>
          Craft
        </h2>

        <p className={styles.kicker}>Selected Craft</p>

        <p className={styles.count}>01 piece</p>
      </div>

      <ul className={styles.grid}>
        {craftItems.map((item) => (
          <li className={styles.item} key={item.title}>
            <article className={styles.card}>
              <Link className={styles.cardLink} href={`/craft/${item.slug}`}>
                <span className="visually-hidden">Open live demo for {item.title}</span>
              </Link>

              {item.previewSrc ? (
                <video
                  className={styles.preview}
                  src={item.previewSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : null}

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>

                <div className={styles.cardDetails}>
                  <p>{item.description}</p>

                  <div className={styles.links}>
                    <a href={item.codeHref} target="_blank" rel="noopener noreferrer">
                      <GithubLogoIcon aria-hidden="true" weight="bold" />

                      <span>See Code</span>

                      <ArrowUpRightIcon
                        className={styles.externalIcon}
                        aria-hidden="true"
                        weight="bold"
                      />
                    </a>

                    <Link href={`/craft/${item.slug}`}>
                      <GlobeIcon aria-hidden="true" weight="bold" />

                      <span>View Live</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
