'use client';

import { useEffect, useRef, useState } from 'react';

import ThemeToggle from '../theme/theme-toggle';
import styles from './site-nav.module.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Craft', href: '#craft' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function SiteNavigation() {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.shell}>
        <a className={styles.brand} href="#home">
          <span aria-hidden="true">CM</span>
          <span className="visually-hidden">Carlos homepage</span>
        </a>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <ul className={styles.navList}>
            {navItems.map((item) => {
              return (
                <li key={item.href}>
                  <a className={styles.navLink} href={item.href}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />

          <button
            ref={menuButtonRef}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            className={styles.menuButton}
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="visually-hidden">
              {isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            </span>

            <span aria-hidden="true" className={styles.menuIcon}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <nav
        aria-hidden={!isMenuOpen}
        aria-label="Mobile navigation"
        className={styles.mobileNav}
        data-open={isMenuOpen}
        id="mobile-navigation"
      >
        <ul className={styles.mobileNavList}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a className={styles.mobileNavLink} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
