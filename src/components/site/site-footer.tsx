import Link from 'next/link';

import styles from './site-footer.module.css';

const footerLinks = [
  { label: 'Craft', href: '#craft' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Back to top', href: '#home' },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.signature}>Designed and built by Carlos.</p>
          <p className={styles.meta}>Thank you for your time.</p>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <ul className={styles.links}>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.copyright}>© {currentYear}</p>
      </div>
    </footer>
  );
}
