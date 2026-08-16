'use client';

import { useRef } from 'react';

import { getCraftDemoInteractedEventName, trackEvent } from '@/lib/analytics';

type TrackCraftDemoInteractionInput = {
  craftSlug: string;
  craftTitle: string;
  demoComponent: string;
};

type CraftDemoInteraction = {
  interactionType: string;
  firstControlLabel: string;
};

export function useTrackCraftDemoInteraction({
  craftSlug,
  craftTitle,
  demoComponent,
}: TrackCraftDemoInteractionInput) {
  const hasTrackedInteractionRef = useRef(false);

  return function trackCraftDemoInteraction({
    interactionType,
    firstControlLabel,
  }: CraftDemoInteraction) {
    if (hasTrackedInteractionRef.current) {
      return;
    }

    hasTrackedInteractionRef.current = true;

    trackEvent(getCraftDemoInteractedEventName(craftTitle), {
      craft_slug: craftSlug,
      craft_title: craftTitle,
      demo_component: demoComponent,
      interaction_type: interactionType,
      first_control_label: firstControlLabel,
    });
  };
}
