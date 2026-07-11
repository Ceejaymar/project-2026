'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
    >
      {isDarkMode ? 'Light' : 'Dark'}
    </button>
  );
}
