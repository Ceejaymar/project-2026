import { contactContent } from './contact-content';
import styles from './contact-section.module.css';
import CopyEmailButton from './copy-email-button';

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.header}>
        <h2 id="contact-title" className={styles.title}>
          Contact
        </h2>

        <p className={styles.kicker}>Start a conversation</p>
      </div>

      <div className={styles.layout}>
        <p className={styles.statement}>{contactContent.headline}</p>

        <div className={styles.panel}>
          <p className={styles.availability}>{contactContent.availability}</p>

          <CopyEmailButton email={contactContent.email} />
        </div>
      </div>
    </section>
  );
}
