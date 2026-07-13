import CraftSection from './_sections/craft/craft-section';
import Hero from './_sections/hero/hero';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main id="main-content" tabIndex={-1} className={styles.main}>
        <Hero />

        <CraftSection />

        <section id="projects" className={styles.section}>
          <p>Projects section</p>
        </section>

        <section id="about" className={styles.section}>
          <p>About section</p>
        </section>

        <section id="contact" className={styles.section}>
          <p>Contact section</p>
        </section>
      </main>
    </div>
  );
}
