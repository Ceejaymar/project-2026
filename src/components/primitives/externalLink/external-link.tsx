import clsx from 'clsx';

import styles from './external-link.module.css';

type ExternalLink = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  className?: string;
};

export default function ExternalLink({ href, className, children, ...props }: ExternalLink) {
  return (
    <a
      className={clsx(styles.link, className)}
      href={href}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <span>{children}</span>
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
