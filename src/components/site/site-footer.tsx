import TrackedLink from '@/components/analytics/tracked-link';
import styles from './site-footer.module.css';

const footerLinks = [
  { label: 'Craft', href: '/#craft', elementId: 'footer_craft', targetSection: 'craft' },
  {
    label: 'Case Studies',
    href: '/#case-studies',
    elementId: 'footer_case_studies',
    targetSection: 'case-studies',
  },
  { label: 'About', href: '/#about', elementId: 'footer_about', targetSection: 'about' },
  { label: 'Contact', href: '/#contact', elementId: 'footer_contact', targetSection: 'contact' },
  { label: 'Back to top', href: '/#home', elementId: 'footer_back_to_top', targetSection: 'home' },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.signature}>Designed and built by Carlos.</p>
          <p className={styles.meta}>Thank you for passing by!</p>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <ul className={styles.links}>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <TrackedLink
                  href={link.href}
                  eventName={`nav_clicked: ${link.label} (Footer)`}
                  eventProperties={{
                    placement: 'footer',
                    element_id: link.elementId,
                    element_label: link.label,
                    destination_type: 'internal',
                    destination: link.href,
                    target_section: link.targetSection,
                  }}
                >
                  {link.label}
                </TrackedLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
