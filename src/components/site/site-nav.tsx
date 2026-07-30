'use client';

import { LayoutGroup, motion, type Transition, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { type FocusEvent, useEffect, useRef, useState } from 'react';

import ThemeToggle from '../theme/theme-toggle';
import styles from './site-nav.module.css';

const navItems = [
  // { label: 'Home', href: '#home' },
  { label: 'Craft', href: '/#craft' },
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function SiteNavigation() {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavHref, setActiveNavHref] = useState<string | null>(null);

  const underlineTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        type: 'spring',
        stiffness: 500,
        damping: 36,
        mass: 0.6,
      };

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

  function handleNavBlur(event: FocusEvent<HTMLUListElement>) {
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }

    setActiveNavHref(null);
  }

  return (
    <header className={styles.header}>
      <div className={styles.shell}>
        <Link className={styles.brand} href="/">
          <span aria-hidden="true">LOS</span>
          <span className="visually-hidden">Carlos homepage</span>
        </Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <LayoutGroup id="primary-navigation">
            <ul
              className={styles.navList}
              onBlur={handleNavBlur}
              onMouseLeave={() => setActiveNavHref(null)}
            >
              {navItems.map((item) => {
                const isActive = activeNavHref === item.href;

                return (
                  <li
                    className={styles.navItem}
                    key={item.href}
                    onMouseEnter={() => setActiveNavHref(item.href)}
                  >
                    <Link
                      className={styles.navLink}
                      href={item.href}
                      onFocus={() => setActiveNavHref(item.href)}
                    >
                      {item.label}

                      {isActive ? (
                        <motion.span
                          className={styles.navUnderline}
                          layoutId="primary-navigation-underline"
                          transition={underlineTransition}
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
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
              <Link className={styles.mobileNavLink} href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
