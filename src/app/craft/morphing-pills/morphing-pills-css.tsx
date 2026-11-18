'use client';

import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { useId } from 'react';

import { usePillSelection } from './hooks/use-pill-selection';
import styles from './morphing-pills.module.css';
import { morphingPillItems } from './morphing-pills-content';

export default function MorphingPillsCSS() {
  const { activeIndex, direction, changeFeature, handleDirection } = usePillSelection();

  const instanceId = useId();

  return (
    <section className={styles.explorer} aria-label="Feature explorer" data-direction={direction}>
      <div className={styles.pillGroup}>
        {activeIndex !== null && (
          <div className={styles.navigation}>
            <button type="button" aria-label="Previous feature" onClick={() => changeFeature(-1)}>
              <CaretUpIcon aria-hidden="true" />
            </button>

            <button type="button" aria-label="Next feature" onClick={() => changeFeature(1)}>
              <CaretDownIcon aria-hidden="true" />
            </button>
          </div>
        )}

        <ul className={styles.list}>
          {morphingPillItems.map((item, index) => {
            const isActive = activeIndex === index;
            const panelId = `${instanceId}-${item.id}`;

            return (
              <li key={item.id} className={styles.item} data-active={isActive}>
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => handleDirection(index)}
                >
                  <span>{item.title}</span>
                  <span aria-hidden="true">{isActive ? '' : '+'}</span>
                </button>

                <div id={panelId} className={styles.panel} aria-hidden={!isActive}>
                  <div className={styles.panelInner}>
                    <p>{item.description}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="visually-hidden" role="status">
        {activeIndex !== null ? `${morphingPillItems[activeIndex].title} selected` : ''}
      </p>
    </section>
  );
}
