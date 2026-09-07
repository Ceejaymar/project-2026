'use client';

import { XIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

import VisuallyHidden from '@/components/visually-hidden';
import styles from './modal.module.css';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section className={styles.modal}>
      <button type="button" className={styles.openButton} onClick={() => setIsOpen(true)}>
        Open modal
      </button>

      {isOpen &&
        createPortal(
          <FocusLock returnFocus>
            <RemoveScroll>
              {/** biome-ignore lint/a11y/noStaticElementInteractions: backdrop dismissal is pointer-only; Escape and the Close button provide keyboard dismissal */}
              <div
                className={styles.wrapper}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) {
                    closeModal();
                  }
                }}
              >
                <div
                  className={styles.dialog}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="accessible-modal-title"
                >
                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={closeModal}
                    data-autofocus
                  >
                    <XIcon aria-hidden="true" />
                    <VisuallyHidden>Close modal</VisuallyHidden>
                  </button>
                  <h3 id="accessible-modal-title" className={styles.dialogTitle}>
                    Modal content
                  </h3>
                  <p className={styles.description}>
                    This modal contains a few interactive elements to demonstrate keyboard and focus
                    behavior.
                  </p>
                  <a href="#example" className={styles.link}>
                    Example link
                  </a>
                  <button type="button" className={styles.actionButton}>
                    Example action
                  </button>
                </div>
              </div>
            </RemoveScroll>
          </FocusLock>,
          document.body,
        )}
    </section>
  );
}
