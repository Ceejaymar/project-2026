import styles from './comparison.module.css';
import MorphingPillsCSS from './morphing-pills-css';
import MorphingPillsMotion from './morphing-pills-motion';

export default function MorphingPills() {
  return (
    <div className={styles.comparison}>
      <section className={styles.demo} aria-labelledby="css-demo-title">
        <h2 id="css-demo-title" className={styles.title}>
          CSS
        </h2>

        <div className={styles.demoStage}>
          <MorphingPillsCSS />
        </div>
      </section>

      <section className={styles.demo} aria-labelledby="motion-demo-title">
        <h2 id="motion-demo-title" className={styles.title}>
          Motion
        </h2>

        <div className={styles.demoStage}>
          <MorphingPillsMotion />
        </div>
      </section>
    </div>
  );
}
