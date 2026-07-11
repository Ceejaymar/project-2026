import clsx from 'clsx';

import styles from './external-link.module.css';

type ExternalLink = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  className?: string;
};

export default function ExternalLink({ href, className, children }: ExternalLink) {
  return (
    <a className={clsx(styles.link, className)} href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <span className={styles.screenReaderOnly}>opens in a new tab</span>
    </a>
  );
}
