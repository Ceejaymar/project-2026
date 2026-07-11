import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import styles from './skip-link.module.css';

type SkipLink = PropsWithChildren<{
  className?: string;
  href?: string;
}>;

export default function SkipLink({
  className,
  href = '#main-content',
  children = 'skip to main content',
}: SkipLink) {
  return (
    <a className={clsx(styles.skipLink, className)} href={href}>
      <span>{children}</span>
    </a>
  );
}
