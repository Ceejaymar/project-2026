import styles from './case-study-callout.module.css';

type CaseStudyCalloutProps = {
  label?: string;
  children: React.ReactNode;
};

export default function CaseStudyCallout({ label, children }: CaseStudyCalloutProps) {
  return (
    <aside className={styles.callout}>
      {label ? <p className={styles.label}>{label}</p> : null}
      <div className={styles.content}>{children}</div>
    </aside>
  );
}
