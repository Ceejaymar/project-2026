'use client';

import { useEffect, useRef } from 'react';

import { getCraftItemViewedEventName, trackEvent } from '@/lib/analytics';

type CraftViewTrackerProps = {
  craftSlug: string;
  craftTitle: string;
  demoType: string;
};

export default function CraftViewTracker({
  craftSlug,
  craftTitle,
  demoType,
}: CraftViewTrackerProps) {
  const trackedViewRef = useRef<string | null>(null);

  useEffect(() => {
    if (trackedViewRef.current === craftSlug) {
      return;
    }

    trackedViewRef.current = craftSlug;

    trackEvent(getCraftItemViewedEventName(craftTitle), {
      craft_slug: craftSlug,
      craft_title: craftTitle,
      source_page: 'craft',
      demo_type: demoType,
    });
  }, [craftSlug, craftTitle, demoType]);

  return null;
}
