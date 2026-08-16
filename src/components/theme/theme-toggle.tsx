'use client';

import { MoonIcon, SunDimIcon } from '@phosphor-icons/react/dist/ssr';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { trackEvent } from '@/lib/analytics';
import styles from './theme-toggle.module.css';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={styles.toggle} type="button" disabled>
        Theme
      </button>
    );
  }

  const isDarkMode = resolvedTheme === 'dark';
  const label = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

  function handleThemeToggle() {
    const from = isDarkMode ? 'dark' : 'light';
    const to = isDarkMode ? 'light' : 'dark';

    trackEvent(`theme_toggled: ${capitalizeTheme(from)} to ${capitalizeTheme(to)}`, {
      from,
      to,
      placement: 'header',
      element_id: 'theme_toggle',
      element_label: label,
    });
    setTheme(to);
  }

  return (
    <button type="button" className={styles.toggle} aria-label={label} onClick={handleThemeToggle}>
      {isDarkMode ? <SunDimIcon size="20" weight="fill" /> : <MoonIcon size="20" weight="fill" />}
    </button>
  );
}

function capitalizeTheme(theme: 'dark' | 'light') {
  return theme === 'dark' ? 'Dark' : 'Light';
}
