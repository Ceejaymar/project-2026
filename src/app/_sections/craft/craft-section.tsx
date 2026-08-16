import { ArrowUpRightIcon, GithubLogoIcon, GlobeIcon } from '@phosphor-icons/react/ssr';

import TrackedLink from '@/components/analytics/tracked-link';
import { getCraftOpenAnalytics, getOutboundCraftLinkAnalytics } from '@/lib/analytics';
import { craftItems } from './craft-content';
import styles from './craft-section.module.css';

export default function CraftSection() {
  return (
    <section id="craft" className={styles.section} aria-labelledby="craft-title">
      <div className={styles.header}>
        <h2 id="craft-title" className={styles.title}>
          Craft
        </h2>

        <p className={styles.kicker}>Selected Craft</p>

        <p className={styles.count}>01 piece</p>
      </div>

      <ul className={styles.grid}>
        {craftItems.map((item) => (
          <li className={styles.item} key={item.title}>
            <article className={styles.card}>
              <TrackedLink
                className={styles.cardLink}
                href={`/craft/${item.slug}`}
                {...getCraftOpenAnalytics({
                  craftSlug: item.slug,
                  craftTitle: item.title,
                  placement: 'craft_section',
                  placementLabel: 'Craft Section',
                  elementId: `craft_section_${item.slug}_card_overlay`,
                  elementLabel: `Open live demo for ${item.title}`,
                  interaction: 'card_overlay',
                  destination: `/craft/${item.slug}`,
                  sourcePage: 'home',
                })}
              >
                <span className="visually-hidden">Open live demo for {item.title}</span>
              </TrackedLink>

              {item.previewSrc ? (
                <video
                  className={styles.preview}
                  src={item.previewSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : null}

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>

                <div className={styles.cardDetails}>
                  <p>{item.description}</p>

                  <div className={styles.links}>
                    <TrackedLink
                      href={item.codeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      useNextLink={false}
                      {...getOutboundCraftLinkAnalytics({
                        craftSlug: item.slug,
                        craftTitle: item.title,
                        placement: 'craft_section',
                        placementLabel: 'Craft Section',
                        elementId: `craft_section_${item.slug}_see_code`,
                        elementLabel: 'See Code',
                        destination: item.codeHref,
                        sourcePage: 'home',
                      })}
                    >
                      <GithubLogoIcon aria-hidden="true" weight="bold" />

                      <span>See Code</span>

                      <ArrowUpRightIcon
                        className={styles.externalIcon}
                        aria-hidden="true"
                        weight="bold"
                      />
                    </TrackedLink>

                    <TrackedLink
                      href={`/craft/${item.slug}`}
                      {...getCraftOpenAnalytics({
                        craftSlug: item.slug,
                        craftTitle: item.title,
                        placement: 'craft_section',
                        placementLabel: 'Craft Section',
                        elementId: `craft_section_${item.slug}_view_live`,
                        elementLabel: 'View Live',
                        interaction: 'view_live_link',
                        destination: `/craft/${item.slug}`,
                        sourcePage: 'home',
                      })}
                    >
                      <GlobeIcon aria-hidden="true" weight="bold" />

                      <span>View Live</span>
                    </TrackedLink>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
