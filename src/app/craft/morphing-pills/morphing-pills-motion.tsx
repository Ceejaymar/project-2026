'use client';

import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useId } from 'react';

import { useCraftReducedMotion } from '../hooks/use-craft-reduced-motion';
import { usePillSelection } from './hooks/use-pill-selection';
import styles from './morphing-pills.module.css';
import { morphingPillItems } from './morphing-pills-content';

const pillSpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 24,
  mass: 0.9,
};

export default function MorphingPillsMotion() {
  const { activeIndex, direction, changeFeature, handleDirection } = usePillSelection();

  const instanceId = useId();
  const reduceMotion = useCraftReducedMotion();

  return (
    <section
      className={styles.explorer}
      aria-label="Feature explorer using Motion"
      data-direction={direction}
      data-engine="motion"
    >
      <div className={styles.pillGroup}>
        {activeIndex !== null && (
          <div className={styles.navigation}>
            <motion.div
              className={styles.navigationInner}
              initial={{
                opacity: reduceMotion ? 1 : 0,
                y: reduceMotion ? 0 : 32,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <button type="button" aria-label="Previous feature" onClick={() => changeFeature(-1)}>
                <CaretUpIcon aria-hidden="true" />
              </button>

              <button type="button" aria-label="Next feature" onClick={() => changeFeature(1)}>
                <CaretDownIcon aria-hidden="true" />
              </button>
            </motion.div>
          </div>
        )}

        <ul className={styles.list}>
          {morphingPillItems.map((item, index) => {
            const isActive = activeIndex === index;
            const panelId = `${instanceId}-${item.id}`;

            return (
              <motion.li
                key={item.id}
                className={styles.item}
                data-active={isActive}
                initial={false}
                animate={{
                  maxWidth: isActive ? '29rem' : '15rem',
                }}
                transition={reduceMotion ? { duration: 0 } : pillSpring}
              >
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

                <motion.div
                  id={panelId}
                  className={styles.panel}
                  aria-hidden={!isActive}
                  initial={false}
                  animate={{
                    height: isActive ? 'auto' : 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className={styles.panelInner}>
                    <motion.p
                      key={isActive ? `active-${direction}` : 'inactive'}
                      initial={isActive ? { opacity: 0, y: direction === 'UP' ? 6 : -6 } : false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: 0,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        delay: isActive && !reduceMotion ? 0.2 : 0,
                        ease: 'easeOut',
                      }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.li>
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
