'use client';

import type { SyntheticEvent } from 'react';

import { useTrackCraftDemoInteraction } from '@/components/analytics/use-track-craft-demo-interaction';
import type { CraftDemoProps } from '../types';
import styles from './accordion.module.css';

export default function Accordion({ craftSlug, craftTitle, demoType }: CraftDemoProps) {
  const trackDemoInteraction = useTrackCraftDemoInteraction({
    craftSlug,
    craftTitle,
    demoComponent: demoType,
  });

  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.open) {
      return;
    }

    const firstControlLabel =
      event.currentTarget.querySelector('summary')?.textContent?.trim() ?? 'Unknown';

    trackDemoInteraction({
      interactionType: 'accordion_toggle',
      firstControlLabel,
    });
  }

  return (
    <section className={styles.accordion} aria-labelledby="accordion">
      <h2 id="accordion" className={styles.title}>
        Exclusive accordion
      </h2>
      <details className={styles.item} name="this-accordion" onToggle={handleToggle}>
        <summary className={styles.summary}>Interaction states</summary>
        <p className={styles.content}>
          Clear hover, focus, open, and closed states help the component feel predictable without
          adding extra visual noise.
        </p>
      </details>

      <details className={styles.item} name="this-accordion" onToggle={handleToggle}>
        <summary className={styles.summary}>Native behavior</summary>
        <p className={styles.content}>
          The accordion uses native details and summary elements, keeping the foundation simple
          before layering in motion and polish.
        </p>
      </details>

      <details className={styles.item} name="this-accordion" onToggle={handleToggle}>
        <summary className={styles.summary}>Exclusive sections</summary>
        <p className={styles.content}>
          The shared name attribute keeps one section open at a time, which makes the interaction
          focused and easier to scan.
        </p>
      </details>

      <details className={styles.item} name="this-accordion" onToggle={handleToggle}>
        <summary className={styles.summary}>Reduced motion</summary>
        <p className={styles.content}>
          The page-level motion toggle removes the animated transitions while keeping the same
          content and interaction model.
        </p>
      </details>
    </section>
  );
}
