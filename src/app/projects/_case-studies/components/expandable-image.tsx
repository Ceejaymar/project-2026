'use client';

import { AnimatePresence, motion, type Transition, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import {
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import styles from './expandable-image.module.css';

type ExpandableScreenshotStyle = CSSProperties & {
  '--screenshot-aspect-ratio'?: string;
  '--screenshot-modal-width'?: string;
  '--screenshot-object-fit'?: string;
  '--screenshot-object-position'?: string;
};

type ExpandableScreenshotProps = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  dialogTitle?: string;
  expandLabel?: string;
  sizes?: string;
  modalSizes?: string;
  aspectRatio?: string;
  modalMaxWidth?: string;
  objectFit?: 'contain' | 'cover';
  objectPosition?: string;
  size?: 'wide' | 'medium';
  variant?: 'default' | 'mosaic' | 'yubico';
  sharedLayoutTarget?: 'frame' | 'image';
};

export default function ExpandableScreenshot({
  id,
  src,
  alt,
  caption,
  dialogTitle = alt,
  expandLabel = 'Open full-size screenshot',
  sizes = '100vw',
  modalSizes = '100vw',
  aspectRatio = '16 / 10',
  modalMaxWidth = '72rem',
  objectFit = 'contain',
  objectPosition = 'center',
  size = 'wide',
  variant = 'default',
  sharedLayoutTarget = 'frame',
}: ExpandableScreenshotProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const shouldReduceMotion = useReducedMotion();

  const layoutId = `case-study-screenshot-${id}`;

  const screenshotStyle: ExpandableScreenshotStyle = {
    '--screenshot-aspect-ratio': aspectRatio,
    '--screenshot-modal-width': modalMaxWidth,
    '--screenshot-object-fit': objectFit,
    '--screenshot-object-position': objectPosition,
  };

  const layoutTransition: Transition = shouldReduceMotion
    ? { layout: { duration: 0.01 } }
    : {
        layout: {
          type: 'spring',
          stiffness: 380,
          damping: 34,
          mass: 0.7,
        },
      };

  const backdropTransition: Transition = {
    duration: shouldReduceMotion ? 0.01 : 0.18,
    ease: 'easeOut',
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  function keepFocusInOverlay(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab') {
      return;
    }

    const overlay = overlayRef.current;

    if (!overlay) {
      return;
    }

    const tabbableElements = Array.from(
      overlay.querySelectorAll<HTMLElement>(
        [
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ].join(','),
      ),
    ).filter(
      (element) =>
        element.tabIndex >= 0 &&
        Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length),
    );

    if (tabbableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstTabbableElement = tabbableElements[0];
    const lastTabbableElement = tabbableElements[tabbableElements.length - 1];
    const activeElement = document.activeElement;
    const focusIsOutsideOverlay = activeElement ? !overlay.contains(activeElement) : true;

    if (event.shiftKey) {
      if (focusIsOutsideOverlay || activeElement === firstTabbableElement) {
        event.preventDefault();
        lastTabbableElement.focus();
      }

      return;
    }

    if (focusIsOutsideOverlay || activeElement === lastTabbableElement) {
      event.preventDefault();
      firstTabbableElement.focus();
    }
  }

  function closeFromBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  }

  function returnFocusToTrigger() {
    if (!isOpen) {
      triggerRef.current?.focus();
    }
  }

  const thumbnailImage = <Image className={styles.image} src={src} alt={alt} fill sizes={sizes} />;

  const modalImage = <Image className={styles.image} src={src} alt={alt} fill sizes={modalSizes} />;

  const thumbnailFrame =
    sharedLayoutTarget === 'image' ? (
      <div className={styles.frame} data-shared-layout-target="image">
        <motion.div className={styles.imageInset} layoutId={layoutId} transition={layoutTransition}>
          {thumbnailImage}
        </motion.div>
      </div>
    ) : (
      <motion.div className={styles.frame} layoutId={layoutId} transition={layoutTransition}>
        <div className={styles.imageInset}>{thumbnailImage}</div>
      </motion.div>
    );

  const modalFrame =
    sharedLayoutTarget === 'image' ? (
      <div className={styles.overlayFrame} data-shared-layout-target="image">
        <motion.div
          className={styles.overlayImageInset}
          layoutId={layoutId}
          transition={layoutTransition}
        >
          {modalImage}
        </motion.div>
      </div>
    ) : (
      <motion.div className={styles.overlayFrame} layoutId={layoutId} transition={layoutTransition}>
        <div className={styles.overlayImageInset}>{modalImage}</div>
      </motion.div>
    );

  return (
    <figure
      className={styles.figure}
      data-size={size}
      data-variant={variant}
      style={screenshotStyle}
    >
      <button
        className={styles.trigger}
        type="button"
        aria-label={expandLabel}
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
      >
        {thumbnailFrame}

        <span className={styles.expandTooltip} aria-hidden="true">
          Click to enlarge
        </span>
      </button>

      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}

      {isMounted
        ? createPortal(
            <AnimatePresence onExitComplete={returnFocusToTrigger}>
              {isOpen ? (
                <motion.div
                  className={styles.overlay}
                  data-variant={variant}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={backdropTransition}
                  onMouseDown={closeFromBackdrop}
                  onKeyDown={keepFocusInOverlay}
                  ref={overlayRef}
                  layoutRoot
                  style={screenshotStyle}
                >
                  <h2 className={styles.visuallyHidden} id={titleId}>
                    {dialogTitle}
                  </h2>

                  <button
                    className={styles.closeButton}
                    type="button"
                    onClick={() => setIsOpen(false)}
                    ref={closeButtonRef}
                  >
                    <span aria-hidden="true">×</span>
                    <span>Close</span>
                  </button>

                  {modalFrame}
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </figure>
  );
}
