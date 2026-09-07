'use client';

import { LayoutGroup, motion, type Transition, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { type FocusEvent, useEffect, useRef, useState } from 'react';

import { trackEvent } from '@/lib/analytics';
import ThemeToggle from '../theme/theme-toggle';
import styles from './site-nav.module.css';

const navItems = [
  { label: 'Craft', href: '/#craft', elementId: 'nav_craft', targetSection: 'craft' },
  {
    label: 'Case Studies',
    href: '/#case-studies',
    elementId: 'nav_case_studies',
    targetSection: 'case-studies',
  },
  { label: 'About', href: '/#about', elementId: 'nav_about', targetSection: 'about' },
  { label: 'Contact', href: '/#contact', elementId: 'nav_contact', targetSection: 'contact' },
];

type NavItem = (typeof navItems)[number];
type NavEventPlacement = 'Desktop' | 'Mobile';

function trackBrandClick() {
  trackEvent('nav_clicked: Home (Brand)', {
    placement: 'brand',
    element_id: 'nav_brand_home',
    element_label: 'LOS',
    destination_type: 'internal',
    destination: '/',
    target_section: 'home',
  });
}

function trackNavClick(item: NavItem, eventPlacement: NavEventPlacement) {
  trackEvent(`nav_clicked: ${item.label} (${eventPlacement})`, {
    placement: eventPlacement === 'Desktop' ? 'nav' : 'mobile_nav',
    element_id: `${item.elementId}_${eventPlacement.toLowerCase()}`,
    element_label: item.label,
    destination_type: 'internal',
    destination: item.href,
    target_section: item.targetSection,
  });
}

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

  function handleMobileNavClick(item: NavItem) {
    trackNavClick(item, 'Mobile');
    closeMenu();
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
        <Link className={styles.brand} href="/" onClick={trackBrandClick}>
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
                      onClick={() => trackNavClick(item, 'Desktop')}
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
              <Link
                className={styles.mobileNavLink}
                href={item.href}
                onClick={() => handleMobileNavClick(item)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
