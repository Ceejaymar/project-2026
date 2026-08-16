'use client';

import Link from 'next/link';
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { type AnalyticsProperties, trackEvent } from '@/lib/analytics';

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  eventName: string;
  eventProperties?: AnalyticsProperties;
  href: string;
  useNextLink?: boolean;
};

export default function TrackedLink({
  children,
  eventName,
  eventProperties,
  href,
  onClick,
  useNextLink,
  ...props
}: TrackedLinkProps) {
  const shouldUseNextLink = useNextLink ?? (href.startsWith('/') || href.startsWith('#'));

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (!event.defaultPrevented) {
      trackEvent(eventName, eventProperties ?? {});
    }
  }

  if (shouldUseNextLink) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
