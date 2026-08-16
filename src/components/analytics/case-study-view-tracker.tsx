'use client';

import { useEffect, useRef } from 'react';

import { getCaseStudyViewEventName, type ReferrerContext, trackEvent } from '@/lib/analytics';

type CaseStudyViewTrackerProps = {
  projectSlug: string;
  projectName: string;
  referrerContext: ReferrerContext;
};

export default function CaseStudyViewTracker({
  projectSlug,
  projectName,
  referrerContext,
}: CaseStudyViewTrackerProps) {
  const trackedViewRef = useRef<string | null>(null);

  useEffect(() => {
    const viewKey = `${projectSlug}:${referrerContext}`;

    if (trackedViewRef.current === viewKey) {
      return;
    }

    trackedViewRef.current = viewKey;

    trackEvent(getCaseStudyViewEventName(projectName), {
      project_slug: projectSlug,
      project_name: projectName,
      source_page: 'case_study',
      referrer_context: referrerContext,
    });
  }, [projectName, projectSlug, referrerContext]);

  return null;
}
