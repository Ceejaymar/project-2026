import type { PostHogConfig, Properties } from 'posthog-js';
import posthog from 'posthog-js/dist/module.no-external';

const ANALYTICS_IGNORE_KEY = 'analytics_ignore';
const PRODUCTION_ENVIRONMENT = 'production';
const PRODUCTION_HOSTNAME = 'los.codes';
const HTTP_PROTOCOLS = new Set(['http:', 'https:']);
const DESTINATION_PROPERTY_KEYS = new Set(['destination', 'href', 'url']);

export type Placement =
  | 'header'
  | 'footer'
  | 'hero'
  | 'craft'
  | 'case_studies'
  | 'about'
  | 'contact'
  | 'projects'
  | 'case_study';

export type DestinationType = 'section' | 'internal' | 'external' | 'asset' | 'clipboard';

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

type SanitizeDestinationOptions = {
  preserveQueryKeys?: readonly string[];
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
  return isBrowser() && window.location.hostname === PRODUCTION_HOSTNAME;
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
    Boolean(getPostHogHost()) &&
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

export function sanitizeAnalyticsDestination(
  destination: string,
  options: SanitizeDestinationOptions = {},
) {
  if (!destination) {
    return destination;
  }

  try {
    const baseUrl = isBrowser() ? window.location.origin : `https://${PRODUCTION_HOSTNAME}`;
    const parsedUrl = new URL(destination, baseUrl);
    const isExternalHttpUrl =
      HTTP_PROTOCOLS.has(parsedUrl.protocol) && parsedUrl.origin !== baseUrl;

    if (!isExternalHttpUrl) {
      return destination;
    }

    const preservedSearchParams = new URLSearchParams();

    for (const key of options.preserveQueryKeys ?? []) {
      const value = parsedUrl.searchParams.get(key);

      if (value !== null) {
        preservedSearchParams.set(key, value);
      }
    }

    const sanitizedUrl = new URL(parsedUrl.origin + parsedUrl.pathname);
    const preservedSearch = preservedSearchParams.toString();

    if (preservedSearch) {
      sanitizedUrl.search = preservedSearch;
    }

    return sanitizedUrl.toString();
  } catch {
    return destination;
  }
}

export function initializePostHog() {
  syncAnalyticsIgnoreFlag();

  const projectToken = getProjectToken();
  const postHogHost = getPostHogHost();

  if (hasInitializedPostHog || !canTrackAnalytics() || !projectToken || !postHogHost) {
    return;
  }

  try {
    const config = {
      api_host: postHogHost,
      autocapture: false,
      capture_pageview: 'history_change',
      capture_pageleave: false,
      person_profiles: 'identified_only',
      defaults: '2026-05-30',
      rageclick: false,
      capture_dead_clicks: false,
      capture_exceptions: false,
      capture_heatmaps: false,
      disable_session_recording: true,
      disable_surveys: true,
      disable_surveys_automatic_display: true,
      disable_product_tours: true,
      advanced_disable_flags: true,
      advanced_disable_feature_flags: true,
      advanced_disable_feature_flags_on_first_load: true,
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
    return;
  }

  try {
    posthog.capture(eventName, cleanProperties({ ...getBaseProperties(), ...properties }));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`PostHog event "${eventName}" failed.`, error);
    }
  }
}
