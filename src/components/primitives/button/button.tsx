import clsx from 'clsx';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import styles from './button.module.css';

type Button = PropsWithChildren<{
  variant?: 'primary' | 'secondary';
  href?: never;
  type?: 'button' | 'submit';
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  className?: string;
}>;

type ButtonLink = Pick<Button, 'variant' | 'children' | 'className'> & {
  href: string;
  type?: never;
  onClick?: never;
};

type ButtonProps = Button | ButtonLink;

export default function Button({
  children,
  variant = 'primary',
  href,
  type,
  onClick,
  className,
}: ButtonProps) {
  const classNames = clsx(styles.button, className);

  if (href) {
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
