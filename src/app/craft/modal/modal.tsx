'use client';

import { ArrowUpRightIcon, XIcon } from '@phosphor-icons/react';
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
                  aria-describedby="accessible-modal-description"
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

                  <div className={styles.content}>
                    <h3 id="accessible-modal-title" className={styles.dialogTitle}>
                      Try navigating this modal
                    </h3>

                    <div id="accessible-modal-description" className={styles.description}>
                      <p>
                        Use Tab and Shift + Tab to move between controls. Focus stays inside the
                        modal until you dismiss it.
                      </p>

                      <p>
                        Press Escape at any time to close it. When the modal closes, focus returns
                        to the button that opened it.
                      </p>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <a
                      href="https://github.com/Ceejaymar/project-2026"
                      className={styles.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View source
                      <ArrowUpRightIcon aria-hidden="true" />
                    </a>

                    <button type="button" className={styles.primaryButton} onClick={closeModal}>
                      Got it
                    </button>
                  </div>
                </div>
              </div>
            </RemoveScroll>
          </FocusLock>,
          document.body,
        )}
    </section>
  );
}
