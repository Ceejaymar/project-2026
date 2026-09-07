import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';

import TrackedLink from '@/components/analytics/tracked-link';
import type { AnalyticsProperties } from '@/lib/analytics';
import styles from './external-link.module.css';

type LinkAnalytics = {
  eventName: string;
  eventProperties?: AnalyticsProperties;
};

type ExternalLink = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  analytics?: LinkAnalytics;
  className?: string;
  variant?: 'default' | 'interactive';
  showArrow?: boolean;
};

export default function ExternalLink({
  href,
  analytics,
  className,
  variant = 'default',
  showArrow = false,
  children,
  ...props
}: ExternalLink) {
  const content = (
    <>
      <span className={styles.label}>{children}</span>

      {showArrow ? (
        <span className={styles.arrow} aria-hidden="true">
          <ArrowUpRightIcon weight="bold" />
        </span>
      ) : null}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </>
  );

  if (analytics) {
    return (
      <TrackedLink
        className={clsx(styles.link, className)}
        data-variant={variant}
        data-show-arrow={showArrow}
        href={href}
        target="_blank"
        rel="noreferrer"
        eventName={analytics.eventName}
        eventProperties={analytics.eventProperties}
        useNextLink={false}
        {...props}
      >
        {content}
      </TrackedLink>
    );
  }

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
      {content}
    </a>
  );
}
