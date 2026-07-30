import styles from './case-study-section.module.css';

type CaseStudySectionProps = {
  title: string;
  spacing?: 'compact' | 'default' | 'spacious';
  children: React.ReactNode;
};

export default function CaseStudySection({
  title,
  spacing = 'default',
  children,
}: CaseStudySectionProps) {
  return (
    <section className={styles.section} data-spacing={spacing}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
