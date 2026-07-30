import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import styles from './case-study-back-link.module.css';

type CaseStudyBackLinkProps = {
  href?: string;
  children?: React.ReactNode;
};

export default function CaseStudyBackLink({
  href = '/projects',
  children = 'Back to projects',
}: CaseStudyBackLinkProps) {
  return (
    <Link className={styles.backLink} href={href}>
      <ArrowLeftIcon aria-hidden="true" weight="bold" />
      <span>{children}</span>
    </Link>
  );
}
