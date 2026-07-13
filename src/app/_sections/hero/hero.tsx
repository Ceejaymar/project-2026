import Button from '@/components/primitives/button/button';
import ExternalLink from '@/components/primitives/externalLink/external-link';
import styles from './hero.module.css';
import Marquee from './marquee/marquee';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Design-minded builder</p>
        <h1 className={styles.title}>
          Frontend engineer focused on craft, usability, and thoughtful interactions.
        </h1>
        <p className={styles.lead}>
          I care about the details that make interfaces feel clear, useful, and thoughtfully
          crafted, from interaction states and motion to accessible UI systems.
        </p>
        <div className={styles.actions}>
          <Button href="#projects">View Work</Button>
          <ExternalLink href="/resume.pdf">View my resume</ExternalLink>
        </div>
      </div>
      <div className={styles.visual}>{/* image goes here */}</div>
      <div className={styles.marqueeWrapper}>
        <Marquee />
      </div>
    </section>
  );
}
