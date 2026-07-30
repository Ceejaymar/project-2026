import Button from '@/components/primitives/button/button';
import ExternalLink from '@/components/primitives/externalLink/external-link';
import styles from './hero.module.css';
import HeroPortrait from './hero-portrait';
import Marquee from './marquee/marquee';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.content}>
        <HeroPortrait className={styles.mobilePortrait} />

        <h1 className={styles.title}>
          Builder focused on craft, usability, and thoughtful interactions.
        </h1>
        <p className={styles.lead}>
          I care about the details that make interfaces feel clear, useful, and thoughtfully
          crafted, from interaction states and motion to accessible UI systems.
        </p>
        <div className={styles.actions}>
          <Button className={styles.primaryAction} href="#projects">
            View Work
          </Button>
          <ExternalLink
            className={styles.resumeLink}
            href="/Carlos-Martinez-Resume.pdf"
            variant="interactive"
            showArrow
          >
            Get my resume
          </ExternalLink>
        </div>
      </div>
      <div className={styles.visual}>
        <HeroPortrait className={styles.desktopPortrait} />
      </div>
      <div className={styles.marqueeWrapper}>
        <Marquee />
      </div>
    </section>
  );
}
