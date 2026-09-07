'use client';

import Image from 'next/image';
import {
  type CSSProperties,
  startTransition,
  useEffect,
  useRef,
  useState,
  ViewTransition,
} from 'react';
import { createPortal } from 'react-dom';

import {
  getScreenshotExpandedEventName,
  type ScreenshotAnalyticsMetadata,
  trackEvent,
} from '@/lib/analytics';
import styles from './expandable-image.module.css';

type ExpandableScreenshotStyle = CSSProperties & {
  '--screenshot-aspect-ratio'?: string;
  '--screenshot-object-fit'?: string;
  '--screenshot-object-position'?: string;
  '--screenshot-modal-ratio'?: string;
};

type ExpandableScreenshotProps = {
  id?: string;
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover';
  objectPosition?: string;
  size?: 'wide' | 'medium';
  variant?: 'default' | 'mosaic' | 'yubico';
  analytics?: ScreenshotAnalyticsMetadata;
};

function getNumericAspectRatio(aspectRatio: string) {
  const [widthValue, heightValue] = aspectRatio.split('/').map((value) => Number(value.trim()));

  if (
    !Number.isFinite(widthValue) ||
    !Number.isFinite(heightValue) ||
    widthValue <= 0 ||
    heightValue <= 0
  ) {
    return 16 / 10;
  }

  return widthValue / heightValue;
}

export default function ExpandableScreenshot({
  id,
  src,
  alt,
  caption,
  sizes = '100vw',
  aspectRatio = '16 / 10',
  objectFit = 'contain',
  objectPosition = 'center',
  size = 'wide',
  variant = 'default',
  analytics,
}: ExpandableScreenshotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const transitionKey = id ?? src.replace(/[^a-zA-Z0-9_-]/g, '-');

  const transitionName = `expandable-image-${transitionKey}`;
  const captionId = caption ? `expandable-caption-${transitionKey}` : undefined;

  const numericAspectRatio = getNumericAspectRatio(aspectRatio);

  const screenshotStyle: ExpandableScreenshotStyle = {
    '--screenshot-aspect-ratio': aspectRatio,
    '--screenshot-modal-ratio': String(numericAspectRatio),
    '--screenshot-object-fit': objectFit,
    '--screenshot-object-position': objectPosition,
  };

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;

      triggerRef.current?.focus({
        preventScroll: true,
      });
    };
  }, [isOpen]);

  function openModal() {
    if (!portalTarget) {
      return;
    }

    if (analytics) {
      trackEvent(
        getScreenshotExpandedEventName(analytics.caseStudyTitle, analytics.screenshotLabel),
        {
          case_study_slug: analytics.caseStudySlug,
          case_study_title: analytics.caseStudyTitle,
          screenshot_id: analytics.screenshotId,
          screenshot_label: analytics.screenshotLabel,
          screenshot_src: src,
          variant,
          source_page: 'case_study',
        },
      );
    }

    startTransition(() => {
      setIsOpen(true);
    });
  }

  function closeModal() {
    startTransition(() => {
      setIsOpen(false);
    });
  }

  return (
    <>
      <figure
        className={styles.figure}
        data-size={size}
        data-variant={variant}
        style={screenshotStyle}
      >
        <button
          ref={triggerRef}
          className={styles.frame}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-describedby={captionId}
          aria-label={`Expand screenshot: ${alt}`}
          onClick={openModal}
        >
          {isOpen ? (
            <span className={styles.imagePlaceholder} aria-hidden="true" />
          ) : (
            <ViewTransition name={transitionName} share="expandable-image-share" default="none">
              <span className={styles.imageInset}>
                <Image className={styles.image} src={src} alt={alt} fill sizes={sizes} />
              </span>
            </ViewTransition>
          )}
        </button>

        {caption ? (
          <figcaption id={captionId} className={styles.caption}>
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {isOpen && portalTarget
        ? createPortal(
            <ViewTransition
              enter="expandable-modal-backdrop"
              exit="expandable-modal-backdrop"
              default="none"
            >
              <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label={`Expanded screenshot: ${alt}`}
                aria-describedby={captionId}
                onClick={(event) => {
                  if (event.target === event.currentTarget) {
                    closeModal();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    closeModal();
                    return;
                  }

                  if (event.key === 'Tab') {
                    event.preventDefault();
                    closeButtonRef.current?.focus();
                  }
                }}
              >
                <button
                  ref={closeButtonRef}
                  className={styles.closeButton}
                  type="button"
                  onClick={closeModal}
                >
                  Close
                </button>

                <ViewTransition name={transitionName} share="expandable-image-share" default="none">
                  <div className={styles.modalImage} style={screenshotStyle}>
                    <Image
                      className={styles.modalAsset}
                      src={src}
                      alt={alt}
                      fill
                      sizes="92vw"
                      priority
                    />
                  </div>
                </ViewTransition>
              </div>
            </ViewTransition>,
            portalTarget,
          )
        : null}
    </>
  );
}
