import type { CaptureResult, PostHogConfig, Properties } from 'posthog-js';
import posthog from 'posthog-js/dist/module.no-external';

const ANALYTICS_IGNORE_KEY = 'analytics_ignore';
const PRODUCTION_ENVIRONMENT = 'production';
const PRODUCTION_HOSTNAME = 'los.codes';
const PRODUCTION_HOSTNAMES = new Set([PRODUCTION_HOSTNAME, 'www.los.codes']);
const HTTP_PROTOCOLS = new Set(['http:', 'https:']);
const DESTINATION_PROPERTY_KEYS = new Set(['destination', 'href', 'url']);
const REDACTED_ANALYTICS_DESTINATION = '[redacted]';
const POSTHOG_URL_PROPERTY_KEYS = new Set([
  '$current_url',
  '$referrer',
  '$initial_current_url',
  '$initial_referrer',
  '$session_entry_url',
]);

export type Placement =
  | 'brand'
  | 'nav'
  | 'mobile_nav'
  | 'header'
  | 'footer'
  | 'hero'
  | 'craft'
  | 'craft_section'
  | 'craft_page'
  | 'case_studies'
  | 'about'
  | 'contact'
  | 'contact_section'
  | 'projects'
  | 'projects_page'
  | 'case_study';

export type DestinationType =
  | 'section'
  | 'internal'
  | 'external'
  | 'asset'
  | 'download'
  | 'clipboard';

export type PageType = 'home' | 'projects' | 'case_study' | 'craft' | 'unknown';

export type AnalyticsPropertyValue = string | number | boolean | null;

export type AnalyticsProperties = Record<string, AnalyticsPropertyValue | undefined>;

export type AnalyticsEventName =
  | 'nav_clicked'
  | 'project_clicked'
  | 'case_study_viewed'
  | 'outbound_clicked'
  | 'resume_clicked'
  | 'email_clicked'
  | 'cta_clicked'
  | 'craft_item_clicked'
  | 'craft_item_viewed'
  | 'screenshot_expanded'
  | 'preference_changed'
  | 'craft_demo_interacted'
  | (string & {});

export type ProjectLinkType = 'case-study' | 'web' | 'github' | 'marketing';

export type ProjectLinkAction = 'case_study' | 'github' | 'live_site' | 'website' | 'marketing';

export type ProjectEventPlacement = 'Case Studies' | 'Projects Page' | 'Case Study';

export type CraftEventPlacement = 'Craft Section' | 'Craft Page' | 'Demo';

export type ReferrerContext = 'home' | 'projects' | 'direct';

export type ScreenshotAnalyticsMetadata = {
  caseStudySlug: string;
  caseStudyTitle: string;
  screenshotId: string;
  screenshotLabel: string;
};

type ProjectAnalyticsInput = {
  projectSlug: string;
  projectName: string;
  placement: Placement;
  placementLabel: ProjectEventPlacement;
  elementId: string;
  elementLabel: string;
  destination: string;
  sourcePage?: PageType;
};

type OutboundProjectAnalyticsInput = ProjectAnalyticsInput & {
  linkType: Exclude<ProjectLinkType, 'case-study'>;
};

type CraftAnalyticsInput = {
  craftSlug: string;
  craftTitle: string;
  placement: Placement;
  placementLabel: CraftEventPlacement;
  elementId: string;
  elementLabel: string;
  destination: string;
  sourcePage?: PageType;
};

type CraftOpenAnalyticsInput = CraftAnalyticsInput & {
  interaction: string;
};

type PostHogInitConfig = Partial<PostHogConfig> & Pick<PostHogConfig, 'loaded'>;

let analyticsIgnoreOverride: boolean | null = null;
let hasInitializedPostHog = false;

export function isAnalyticsEnvironment() {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === PRODUCTION_ENVIRONMENT;
}

function getProjectToken() {
  return process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
}

function getPostHogHost() {
  return process.env.NEXT_PUBLIC_POSTHOG_HOST;
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function isProductionPortfolioHost() {
  return isBrowser() && PRODUCTION_HOSTNAMES.has(window.location.hostname);
}

function canUseLocalStorage() {
  if (!isBrowser()) {
    return false;
  }

  try {
    const testKey = '__analytics_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);

    return true;
  } catch {
    return false;
  }
}

export function syncAnalyticsIgnoreFlag() {
  if (!isBrowser()) {
    return;
  }

  const analyticsIgnoreValue = new URLSearchParams(window.location.search).get(
    ANALYTICS_IGNORE_KEY,
  );

  if (analyticsIgnoreValue === 'true') {
    analyticsIgnoreOverride = true;

    if (canUseLocalStorage()) {
      window.localStorage.setItem(ANALYTICS_IGNORE_KEY, 'true');
    }

    return;
  }

  if (analyticsIgnoreValue === 'false') {
    analyticsIgnoreOverride = false;

    if (canUseLocalStorage()) {
      window.localStorage.removeItem(ANALYTICS_IGNORE_KEY);
    }
  }
}

export function shouldIgnoreAnalytics() {
  if (analyticsIgnoreOverride !== null) {
    return analyticsIgnoreOverride;
  }

  if (!isBrowser() || !canUseLocalStorage()) {
    return false;
  }

  try {
    return window.localStorage.getItem(ANALYTICS_IGNORE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function canTrackAnalytics() {
  return (
    isBrowser() &&
    isAnalyticsEnvironment() &&
    isProductionPortfolioHost() &&
    Boolean(getProjectToken()) &&
    !shouldIgnoreAnalytics()
  );
}

export function getPageType(pathname = isBrowser() ? window.location.pathname : ''): PageType {
  if (pathname === '/') {
    return 'home';
  }

  if (pathname === '/projects') {
    return 'projects';
  }

  if (pathname.startsWith('/projects/')) {
    return 'case_study';
  }

  if (pathname.startsWith('/craft/')) {
    return 'craft';
  }

  return 'unknown';
}

export function getProjectEventName(projectName: string) {
  return `project_clicked: ${projectName} (Case Study)` as AnalyticsEventName;
}

export function getOutboundEventName(
  projectName: string,
  elementLabel: string,
  placementLabel: ProjectEventPlacement | CraftEventPlacement,
) {
  return `outbound_clicked: ${projectName}, ${elementLabel} (${placementLabel})` as AnalyticsEventName;
}

export function getCaseStudyViewEventName(projectName: string) {
  return `case_study_viewed: ${projectName}` as AnalyticsEventName;
}

export function getCraftItemClickedEventName(craftTitle: string) {
  return `craft_item_clicked: ${craftTitle} (Craft Section)` as AnalyticsEventName;
}

export function getCraftItemViewedEventName(craftTitle: string) {
  return `craft_item_viewed: ${craftTitle}` as AnalyticsEventName;
}

export function getCraftDemoInteractedEventName(craftTitle: string) {
  return `craft_demo_interacted: ${craftTitle} (Demo)` as AnalyticsEventName;
}

export function getScreenshotExpandedEventName(caseStudyTitle: string, screenshotLabel: string) {
  return `screenshot_expanded: ${caseStudyTitle}, ${screenshotLabel}` as AnalyticsEventName;
}

export function getProjectLinkAction(linkType: ProjectLinkType, elementLabel: string) {
  if (linkType === 'case-study') {
    return 'case_study';
  }

  if (linkType === 'github') {
    return 'github';
  }

  if (linkType === 'marketing') {
    return 'marketing';
  }

  return elementLabel.toLowerCase() === 'live site' ? 'live_site' : 'website';
}

export function getProjectLinkAnalytics({
  projectSlug,
  projectName,
  placement,
  elementId,
  elementLabel,
  destination,
  sourcePage,
}: ProjectAnalyticsInput) {
  return {
    eventName: getProjectEventName(projectName),
    eventProperties: {
      placement,
      element_id: elementId,
      element_label: elementLabel,
      destination_type: 'internal',
      destination,
      project_slug: projectSlug,
      project_name: projectName,
      action: 'case_study',
      source_page: sourcePage,
    },
  };
}

export function getOutboundProjectLinkAnalytics({
  projectSlug,
  projectName,
  placement,
  placementLabel,
  elementId,
  elementLabel,
  destination,
  linkType,
  sourcePage,
}: OutboundProjectAnalyticsInput) {
  return {
    eventName: getOutboundEventName(projectName, elementLabel, placementLabel),
    eventProperties: {
      placement,
      element_id: elementId,
      element_label: elementLabel,
      destination_type: 'external',
      destination,
      project_slug: projectSlug,
      project_name: projectName,
      action: getProjectLinkAction(linkType, elementLabel),
      source_page: sourcePage,
    },
  };
}

export function getCraftOpenAnalytics({
  craftSlug,
  craftTitle,
  placement,
  elementId,
  elementLabel,
  interaction,
  destination,
  sourcePage,
}: CraftOpenAnalyticsInput) {
  return {
    eventName: getCraftItemClickedEventName(craftTitle),
    eventProperties: {
      placement,
      craft_slug: craftSlug,
      craft_title: craftTitle,
      interaction,
      element_id: elementId,
      element_label: elementLabel,
      destination_type: 'internal',
      destination,
      source_page: sourcePage,
    },
  };
}

export function getOutboundCraftLinkAnalytics({
  craftSlug,
  craftTitle,
  placement,
  placementLabel,
  elementId,
  elementLabel,
  destination,
  sourcePage,
}: CraftAnalyticsInput) {
  return {
    eventName: getOutboundEventName(craftTitle, elementLabel, placementLabel),
    eventProperties: {
      placement,
      craft_slug: craftSlug,
      craft_title: craftTitle,
      action: 'github',
      element_id: elementId,
      element_label: elementLabel,
      destination_type: 'external',
      destination,
      source_page: sourcePage,
    },
  };
}

export function getReferrerContext(from?: string): ReferrerContext {
  if (from === 'home' || from === 'projects') {
    return from;
  }

  return 'direct';
}

function getAnalyticsBaseUrl() {
  return isBrowser() ? window.location.origin : `https://${PRODUCTION_HOSTNAME}`;
}

function hasExplicitProtocol(value: string) {
  return /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value);
}

function isSafeRelativeDestination(value: string) {
  return (
    value.startsWith('/') ||
    value.startsWith('#') ||
    value.startsWith('?') ||
    value.startsWith('./') ||
    value.startsWith('../')
  );
}

function formatSafeHttpDestination(parsedUrl: URL, baseUrl: string) {
  const baseOrigin = new URL(baseUrl).origin;

  if (parsedUrl.origin === baseOrigin) {
    return parsedUrl.pathname;
  }

  return `${parsedUrl.origin}${parsedUrl.pathname}`;
}

export function sanitizeAnalyticsDestination(destination: string) {
  if (!destination) {
    return destination;
  }

  const trimmedDestination = destination.trim();

  if (!trimmedDestination) {
    return '';
  }

  const isExplicitUrl = hasExplicitProtocol(trimmedDestination);

  if (!isExplicitUrl && !isSafeRelativeDestination(trimmedDestination)) {
    return REDACTED_ANALYTICS_DESTINATION;
  }

  try {
    const baseUrl = getAnalyticsBaseUrl();
    const parsedUrl = new URL(trimmedDestination, baseUrl);

    if (HTTP_PROTOCOLS.has(parsedUrl.protocol)) {
      return formatSafeHttpDestination(parsedUrl, baseUrl);
    }

    if (isExplicitUrl) {
      return parsedUrl.protocol;
    }

    return REDACTED_ANALYTICS_DESTINATION;
  } catch {
    return REDACTED_ANALYTICS_DESTINATION;
  }
}

function sanitizeCapturedUrl(value: string) {
  try {
    const baseUrl = getAnalyticsBaseUrl();
    const parsedUrl = new URL(value, baseUrl);

    if (HTTP_PROTOCOLS.has(parsedUrl.protocol)) {
      return formatSafeHttpDestination(parsedUrl, baseUrl);
    }

    if (hasExplicitProtocol(value)) {
      return parsedUrl.protocol;
    }

    return REDACTED_ANALYTICS_DESTINATION;
  } catch {
    return REDACTED_ANALYTICS_DESTINATION;
  }
}

function sanitizePostHogProperties(properties?: Properties): Properties | undefined {
  if (!properties) {
    return properties;
  }

  return Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [
      key,
      POSTHOG_URL_PROPERTY_KEYS.has(key) && typeof value === 'string'
        ? sanitizeCapturedUrl(value)
        : value,
    ]),
  ) satisfies Properties;
}

function sanitizePostHogEvent(event: CaptureResult | null) {
  if (!event) {
    return event;
  }

  return {
    ...event,
    properties: sanitizePostHogProperties(event.properties) ?? event.properties,
    $set: sanitizePostHogProperties(event.$set),
    $set_once: sanitizePostHogProperties(event.$set_once),
  } satisfies CaptureResult;
}

export function initializePostHog() {
  syncAnalyticsIgnoreFlag();

  const projectToken = getProjectToken();
  const postHogHost = getPostHogHost();

  if (hasInitializedPostHog || !canTrackAnalytics() || !projectToken) {
    return;
  }

  try {
    const config = {
      ...(postHogHost ? { api_host: postHogHost } : {}),
      autocapture: false,
      capture_pageview: 'history_change',
      capture_pageleave: false,
      person_profiles: 'identified_only',
      defaults: '2026-05-30',
      rageclick: false,
      capture_dead_clicks: false,
      capture_exceptions: false,
      capture_heatmaps: false,
      disable_capture_url_hashes: true,
      disable_session_recording: true,
      disable_surveys: true,
      disable_surveys_automatic_display: true,
      disable_product_tours: true,
      advanced_disable_flags: true,
      advanced_disable_feature_flags: true,
      advanced_disable_feature_flags_on_first_load: true,
      before_send: sanitizePostHogEvent,
      loaded: () => {
        hasInitializedPostHog = true;
      },
    } satisfies PostHogInitConfig;

    posthog.init(projectToken, config);
    hasInitializedPostHog = true;
  } catch (error) {
    hasInitializedPostHog = false;

    if (process.env.NODE_ENV === 'development') {
      console.warn('PostHog initialization failed.', error);
    }
  }
}

function getBaseProperties(): AnalyticsProperties {
  const pagePath = isBrowser() ? window.location.pathname : '';

  return {
    page_path: pagePath,
    page_type: getPageType(),
    source_page: getPageType(),
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
    is_webdriver: isBrowser() ? Boolean(window.navigator.webdriver) : false,
  };
}

function cleanProperties(properties: AnalyticsProperties): Properties {
  return Object.fromEntries(
    Object.entries(properties).flatMap(([key, value]) => {
      if (value === undefined) {
        return [];
      }

      if (typeof value === 'string' && DESTINATION_PROPERTY_KEYS.has(key)) {
        return [[key, sanitizeAnalyticsDestination(value)]];
      }

      return [[key, value]];
    }),
  ) satisfies Properties;
}

export function trackEvent(eventName: AnalyticsEventName, properties: AnalyticsProperties = {}) {
  if (!canTrackAnalytics() || !posthog.__loaded) {
    return false;
  }

  try {
    posthog.capture(eventName, cleanProperties({ ...getBaseProperties(), ...properties }));

    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`PostHog event "${eventName}" failed.`, error);
    }

    return false;
  }
}
