import Link from 'next/link';
import { notFound } from 'next/navigation';

import { craftItems } from '@/app/_sections/craft/craft-content';

import ReduceMotionToggle from '../components/reduce-motion-toggle';
import { type CraftItemSlug, craftItemRegistry } from '../craft-item-registry';

import styles from './craft-page.module.css';

type CraftPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CraftPage({ params }: CraftPageProps) {
  const { slug } = await params;

  const item = craftItems.find((craftItem) => craftItem.slug === slug);

  if (!item || !(slug in craftItemRegistry)) {
    notFound();
  }

  const CraftComponent = craftItemRegistry[slug as CraftItemSlug];

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.utilityRow}>
          <Link className={styles.backLink} href="/#craft">
            <span aria-hidden="true">←</span>
            <span>Back to home</span>
          </Link>

          <ReduceMotionToggle />
        </div>

        <section className={styles.stage} aria-label={`${item.title} interactive demo`}>
          <CraftComponent />
        </section>

        <section className={styles.details} aria-labelledby="craft-item-title">
          <div className={styles.detailsIntro}>
            <h1 id="craft-item-title" className={styles.title}>
              {item.title}
            </h1>

            <p className={styles.description}>{item.description}</p>

            <a
              className={styles.codeLink}
              href={item.codeHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              View code
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ul className={styles.detailsList}>
            {item.details.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
