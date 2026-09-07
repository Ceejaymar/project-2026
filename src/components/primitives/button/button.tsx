import clsx from 'clsx';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import TrackedLink from '@/components/analytics/tracked-link';
import type { AnalyticsProperties } from '@/lib/analytics';
import styles from './button.module.css';

type LinkAnalytics = {
  eventName: string;
  eventProperties?: AnalyticsProperties;
};

type Button = PropsWithChildren<{
  variant?: 'primary' | 'secondary';
  analytics?: never;
  href?: never;
  type?: 'button' | 'submit';
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  className?: string;
}>;

type ButtonLink = Pick<Button, 'variant' | 'children' | 'className'> & {
  href: string;
  analytics?: LinkAnalytics;
  type?: never;
  onClick?: never;
};

type ButtonProps = Button | ButtonLink;

export default function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  className,
  analytics,
}: ButtonProps) {
  const classNames = clsx(styles.button, className);

  if (href) {
    if (analytics) {
      return (
        <TrackedLink
          href={href}
          eventName={analytics.eventName}
          eventProperties={analytics.eventProperties}
          data-variant={variant}
          className={classNames}
        >
          <span>{children}</span>
        </TrackedLink>
      );
    }

    return (
      <Link href={href} data-variant={variant} className={classNames}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} data-variant={variant} onClick={onClick} className={classNames}>
      <span>{children}</span>
    </button>
  );
}
