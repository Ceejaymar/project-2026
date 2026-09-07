'use client';

import { useEffect, useRef } from 'react';

import { getCraftItemViewedEventName, trackEvent } from '@/lib/analytics';

type CraftViewTrackerProps = {
  craftSlug: string;
  craftTitle: string;
};

export default function CraftViewTracker({ craftSlug, craftTitle }: CraftViewTrackerProps) {
  const trackedViewRef = useRef<string | null>(null);

  useEffect(() => {
    if (trackedViewRef.current === craftSlug) {
      return;
    }

    const didTrack = trackEvent(getCraftItemViewedEventName(craftTitle), {
      craft_slug: craftSlug,
      craft_title: craftTitle,
      source_page: 'craft',
    });

    if (didTrack) {
      trackedViewRef.current = craftSlug;
    }
  }, [craftSlug, craftTitle]);

  return null;
}
