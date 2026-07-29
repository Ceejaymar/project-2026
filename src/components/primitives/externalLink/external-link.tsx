import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';

import styles from './external-link.module.css';

type ExternalLink = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  className?: string;
  variant?: 'default' | 'interactive';
  showArrow?: boolean;
};

export default function ExternalLink({
  href,
  className,
  variant = 'default',
  showArrow = false,
  children,
  ...props
}: ExternalLink) {
  return (
    <a
      className={clsx(styles.link, className)}
      data-variant={variant}
      data-show-arrow={showArrow}
      href={href}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <span className={styles.label}>{children}</span>

      {showArrow ? (
        <span className={styles.arrow} aria-hidden="true">
          <ArrowUpRightIcon weight="bold" />
        </span>
      ) : null}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
