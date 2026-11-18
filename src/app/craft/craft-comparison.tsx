import type { CraftApproach } from '../_sections/craft/craft-content';
import styles from './craft-comparison.module.css';

type CraftComparisonProps = {
  approaches: [CraftApproach, CraftApproach];
  className?: string;
};

export default function CraftComparison({ approaches, className }: CraftComparisonProps) {
  return (
    <section
      className={`${styles.comparison} ${className ?? ''}`}
      aria-label="Implementation comparison"
    >
      {approaches.map((approach) => (
        <div key={approach.label} className={styles.approach}>
          <div className={styles.header}>
            <h2>{approach.label}</h2>
          </div>

          <ul className={styles.highlights}>
            {approach.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
