import { ArrowUpRightIcon, GithubLogoIcon, GlobeIcon } from '@phosphor-icons/react/ssr';

import TrackedLink from '@/components/analytics/tracked-link';
import { getCraftItemClickedEventName, getOutboundEventName } from '@/lib/analytics';
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
                eventName={getCraftItemClickedEventName(item.title)}
                eventProperties={{
                  placement: 'craft_section',
                  craft_slug: item.slug,
                  craft_title: item.title,
                  interaction: 'card_overlay',
                  element_id: `craft_section_${item.slug}_card_overlay`,
                  element_label: `Open live demo for ${item.title}`,
                  destination_type: 'internal',
                  destination: `/craft/${item.slug}`,
                  source_page: 'home',
                }}
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
                      eventName={getOutboundEventName(item.title, 'See Code', 'Craft Section')}
                      eventProperties={{
                        placement: 'craft_section',
                        craft_slug: item.slug,
                        craft_title: item.title,
                        action: 'github',
                        element_id: `craft_section_${item.slug}_see_code`,
                        element_label: 'See Code',
                        destination_type: 'external',
                        destination: item.codeHref,
                        source_page: 'home',
                      }}
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
                      eventName={getCraftItemClickedEventName(item.title)}
                      eventProperties={{
                        placement: 'craft_section',
                        craft_slug: item.slug,
                        craft_title: item.title,
                        interaction: 'view_live_link',
                        element_id: `craft_section_${item.slug}_view_live`,
                        element_label: 'View Live',
                        destination_type: 'internal',
                        destination: `/craft/${item.slug}`,
                        source_page: 'home',
                      }}
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
