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

        <p className={styles.count}>06 pieces</p>
      </div>

      <ul className={styles.grid}>
        {craftItems.map((item) => (
          <li className={styles.item} key={item.title}>
            <article className={styles.card}>
              <Link className={styles.cardLink} href={item.href}>
                <span className="visually-hidden">Open live demo for {item.title}</span>
              </Link>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>

                <div className={styles.cardDetails}>
                  <p>{item.description}</p>

                  <div className={styles.links}>
                    <a href={item.codeHref} target="_blank" rel="noopener noreferrer">
                      See Code
                    </a>
                    <Link href={item.href}>Live </Link>
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
