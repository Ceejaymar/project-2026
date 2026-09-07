import { ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr';

import TrackedLink from '@/components/analytics/tracked-link';
import type { ReferrerContext } from '@/lib/analytics';
import styles from './case-study-back-link.module.css';

type CaseStudyBackLinkProps = {
  href?: string;
  children?: React.ReactNode;
  projectSlug?: string;
  projectName?: string;
  referrerContext?: ReferrerContext;
};

export default function CaseStudyBackLink({
  href = '/projects',
  children = 'Back to projects',
  projectSlug,
  projectName,
  referrerContext,
}: CaseStudyBackLinkProps) {
  const elementLabel = typeof children === 'string' ? children : 'Back to projects';

  return (
    <TrackedLink
      className={styles.backLink}
      href={href}
      eventName={`nav_clicked: ${elementLabel} (Case Study)`}
      eventProperties={{
        source_page: 'case_study',
        placement: 'case_study',
        element_id: projectSlug ? `case_study_${projectSlug}_back` : 'case_study_back',
        element_label: elementLabel,
        destination: href,
        destination_type: 'internal',
        referrer_context: referrerContext,
        project_slug: projectSlug,
        project_name: projectName,
      }}
    >
      <ArrowLeftIcon aria-hidden="true" weight="bold" />
      <span>{children}</span>
    </TrackedLink>
  );
}
