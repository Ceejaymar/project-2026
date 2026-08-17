import { notFound } from 'next/navigation';

import { craftItems } from '@/app/_sections/craft/craft-content';
import CraftViewTracker from '@/components/analytics/craft-view-tracker';
import TrackedLink from '@/components/analytics/tracked-link';
import { getOutboundEventName } from '@/lib/analytics';

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
      <CraftViewTracker craftSlug={item.slug} craftTitle={item.title} demoType={item.demoType} />

      <div className={styles.inner}>
        <div className={styles.utilityRow}>
          <TrackedLink
            className={styles.backLink}
            href="/#craft"
            eventName="nav_clicked: Back to home (Craft)"
            eventProperties={{
              craft_slug: item.slug,
              craft_title: item.title,
              destination: '/#craft',
              destination_type: 'internal',
              source_page: 'craft',
              placement: 'craft_page',
              element_id: `craft_page_${item.slug}_back_home`,
              element_label: 'Back to home',
            }}
          >
            <span aria-hidden="true">←</span>
            <span>Back to home</span>
          </TrackedLink>

          <ReduceMotionToggle />
        </div>

        <section className={styles.stage} aria-label={`${item.title} interactive demo`}>
          <CraftComponent craftSlug={item.slug} craftTitle={item.title} demoType={item.demoType} />
        </section>

        <section className={styles.details} aria-labelledby="craft-item-title">
          <div className={styles.detailsIntro}>
            <h1 id="craft-item-title" className={styles.title}>
              {item.title}
            </h1>

            <p className={styles.description}>{item.description}</p>

            <TrackedLink
              className={styles.codeLink}
              href={item.codeHref}
              target="_blank"
              rel="noopener noreferrer"
              useNextLink={false}
              eventName={getOutboundEventName(item.title, 'View code', 'Craft Page')}
              eventProperties={{
                placement: 'craft_page',
                craft_slug: item.slug,
                craft_title: item.title,
                action: 'github',
                element_id: `craft_page_${item.slug}_view_code`,
                element_label: 'View code',
                destination_type: 'external',
                destination: item.codeHref,
                source_page: 'craft',
              }}
            >
              View code
              <span aria-hidden="true">↗</span>
            </TrackedLink>
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
