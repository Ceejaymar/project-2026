import About from './_sections/about/about-section';
import Contact from './_sections/contact/contact-section';
import CraftSection from './_sections/craft/craft-section';
import Hero from './_sections/hero/hero';
import Projects from './_sections/projects/projects-section';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main id="main-content" tabIndex={-1} className={styles.main}>
        <Hero />

        <CraftSection />

        <Projects />

        <About />

        <Contact />
      </main>
    </div>
  );
}
