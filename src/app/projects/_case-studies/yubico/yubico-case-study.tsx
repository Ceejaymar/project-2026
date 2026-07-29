import Image from 'next/image';

import CaseStudyBackLink from '../components/case-study-back-link';
import CaseStudyCallout from '../components/case-study-callout';
import CaseStudyLayoutGroup from '../components/case-study-layout-group';
import CaseStudySection from '../components/case-study-section';
import ExpandableScreenshot from '../components/expandable-image';
import styles from './yubico-case-study.module.css';
import { yubicoCaseStudyMeta } from './yubico-case-study-data';

const pathCards = [
  {
    title: 'Novice',
    text: 'A shorter route for people getting started with security keys.',
  },
  {
    title: 'Intermediate',
    text: 'A more focused path for people with some familiarity who need help narrowing their options.',
  },
  {
    title: 'Skilled',
    text: 'More specific questions for people who already understand their setup and requirements.',
  },
  {
    title: 'Business',
    text: 'When the selected quantity passes the business threshold, the quiz can shift from product selection to Customer Success.',
  },
] as const;

const nextStepRoutes = [
  {
    label: 'Answer pattern',
    text: 'Responses narrow the flow around experience level, setup, and purchase context.',
  },
  {
    label: 'Product recommendation',
    text: 'Individual buyers can reach a relevant security-key recommendation.',
  },
  {
    label: 'Business handoff',
    text: 'Larger team purchases can move from product guidance to Customer Success.',
  },
] as const;

const technicalPoints = [
  'Path-specific question sets for different experience levels and purchase contexts.',
  'Conditional frontend logic that moves people through the appropriate questions and next steps.',
  'Reusable question, answer, progress, and explanatory-content patterns.',
  'Responsive and accessible frontend implementation.',
  'React application integrated into the marketing site through the company’s existing custom WordPress plugin pattern.',
  'Cypress coverage added later to protect key quiz paths.',
] as const;

const YUBICO_SCREENSHOTS = {
  start: {
    src: '/images/case-studies/yubico/quiz-start.webp',
    alt: 'Yubico Product Finder entry screen with four paths: Novice, Intermediate, Skilled, and Business.',
  },
  info: {
    src: '/images/case-studies/yubico/quiz-info.webp',
    alt: 'Yubico Product Finder question screen with answer options and a side panel explaining relevant security-key terminology.',
  },
  results: {
    src: '/images/case-studies/yubico/quiz-results.webp',
    alt: 'Yubico Product Finder recommendation screen showing a suggested security key based on quiz responses.',
  },
  customerSuccess: {
    src: '/images/case-studies/yubico/quiz-cs.webp',
    alt: 'Yubico Product Finder business result directing larger security-key purchases to Customer Success.',
  },
} as const;

const HERO_META_ITEMS = [
  { label: 'Year', value: yubicoCaseStudyMeta.year },
  { label: 'Role', value: yubicoCaseStudyMeta.role },
  { label: 'Type', value: yubicoCaseStudyMeta.type },
  { label: 'Industry', value: yubicoCaseStudyMeta.industry },
  { label: 'Stack', value: yubicoCaseStudyMeta.tech },
] as const;

type ScreenshotFigureProps = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  size?: 'wide' | 'medium';
  sizes?: string;
  modalMaxWidth?: string;
  sharedLayoutTarget?: 'frame' | 'image';
};

function ScreenshotFigure({
  id,
  src,
  alt,
  caption,
  size = 'wide',
  sizes = '(min-width: 760px) 52rem, 100vw',
  modalMaxWidth = '72rem',
  sharedLayoutTarget = 'frame',
}: ScreenshotFigureProps) {
  return (
    <ExpandableScreenshot
      id={`yubico-${id}`}
      src={src}
      alt={alt}
      caption={caption}
      variant="yubico"
      size={size}
      aspectRatio="16 / 10"
      modalMaxWidth={modalMaxWidth}
      objectFit="contain"
      sizes={sizes}
      modalSizes="(min-width: 760px) 72rem, 100vw"
      expandLabel={`Open full-size screenshot: ${alt}`}
      dialogTitle={alt}
      sharedLayoutTarget={sharedLayoutTarget}
    />
  );
}

function YubicoHero() {
  const primaryLink = yubicoCaseStudyMeta.links?.[0];

  return (
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{yubicoCaseStudyMeta.eyebrow}</p>
        <h1 className={styles.title}>{yubicoCaseStudyMeta.title}</h1>
        <p className={styles.summary}>{yubicoCaseStudyMeta.summary}</p>

        {primaryLink && 'url' in primaryLink ? (
          <a className={styles.heroLink} href={primaryLink.url} target="_blank" rel="noreferrer">
            {primaryLink.label}
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>

      <div className={styles.heroVisual} aria-hidden="true">
        <div className={styles.browserFrame}>
          <div className={styles.browserTop}>
            <span />
            <span />
            <span />
          </div>

          <div className={styles.browserScreen}>
            <Image
              className={styles.heroImage}
              src={YUBICO_SCREENSHOTS.start.src}
              alt=""
              fill
              sizes="(min-width: 860px) 42rem, 100vw"
              priority
            />
          </div>
        </div>
      </div>

      <dl className={styles.heroMeta} aria-label="Yubico case study details">
        {HERO_META_ITEMS.map((item) =>
          item.value ? (
            <div className={styles.heroMetaItem} key={item.label}>
              <dt className={styles.heroMetaLabel}>{item.label}</dt>
              <dd className={styles.heroMetaValue}>{item.value}</dd>
            </div>
          ) : null,
        )}
      </dl>
    </header>
  );
}

export default function YubicoCaseStudy() {
  return (
    <CaseStudyLayoutGroup id="yubico-case-study-screenshots">
      <main className={styles.page}>
        <CaseStudyBackLink />

        <div className={styles.caseStudyScope}>
          <YubicoHero />

          <div className={styles.content}>
            <CaseStudySection title="Overview">
              <p>
                Yubico’s product finder helps people choose a security key without requiring
                everyone to begin with the same level of technical knowledge. Visitors choose a
                starting point based on their familiarity and purchase context, answer a tailored
                set of questions, and receive a product recommendation or a clear next step.
              </p>
            </CaseStudySection>

            <CaseStudySection title="Why rebuild it" spacing="compact">
              <p>
                The project replaced an older quiz that was harder to follow and did not create a
                clear enough path from someone’s needs to a product recommendation or business
                handoff. The goal was to help beginners reach an answer faster, ask more relevant
                questions for experienced buyers, and give larger business purchases a clearer route
                to contact Customer Success.
              </p>
            </CaseStudySection>

            <CaseStudySection title="My role" spacing="compact">
              <p>
                The broader quiz structure and visual direction were already underway when I joined.
                I worked closely with UX and design to clarify incomplete rules, work through
                unclear questions and states, and turn the flow into a responsive, accessible React
                experience.
              </p>

              <CaseStudyCallout label="Role focus">
                I owned the frontend implementation, conditional flow logic, responsive behavior,
                and accessibility, then later added Cypress coverage for key quiz paths.
              </CaseStudyCallout>
            </CaseStudySection>

            <CaseStudySection title="One product finder, four paths" spacing="spacious">
              <p className={styles.pathLead}>
                The labels stay familiar to the quiz, but each one acts as a starting point for how
                much guidance someone needs.
              </p>

              <div className={styles.pathGrid}>
                {pathCards.map((path) => (
                  <article className={styles.pathCard} key={path.title}>
                    <h3 className={styles.pathTitle}>{path.title}</h3>
                    <p className={styles.pathText}>{path.text}</p>
                  </article>
                ))}
              </div>

              <ScreenshotFigure
                id="quiz-start"
                src={YUBICO_SCREENSHOTS.start.src}
                alt={YUBICO_SCREENSHOTS.start.alt}
                caption="Four starting points let the quiz match the amount of detail to someone’s familiarity and purchase needs."
              />
            </CaseStudySection>

            <CaseStudySection title="Helping people answer technical questions" spacing="spacious">
              <div className={styles.questionLayout}>
                <p>
                  Each path uses a different set of questions, so beginners are not forced through
                  the same level of detail as experienced buyers. Supporting information sits
                  alongside the flow to explain terminology, clarify what a question is asking, and
                  provide relevant Yubico context when it helps someone answer with more confidence.
                </p>
              </div>

              <ScreenshotFigure
                id="quiz-info"
                src={YUBICO_SCREENSHOTS.info.src}
                alt={YUBICO_SCREENSHOTS.info.alt}
                caption="Supporting information gives people the context they need without turning every path into a longer technical questionnaire."
              />
            </CaseStudySection>

            <CaseStudySection title="From answers to the right next step" spacing="spacious">
              <div className={styles.nextStepLayout}>
                <p>
                  Answers guide people toward a relevant security-key recommendation instead of
                  sending every visitor through one generic flow. For business buyers with larger
                  purchase needs, the experience can move from product guidance to Customer Success
                  at the appropriate point.
                </p>

                <ol className={styles.routeList}>
                  {nextStepRoutes.map((route) => (
                    <li className={styles.routeItem} key={route.label}>
                      <span className={styles.routeContent}>
                        <span className={styles.routeLabel}>{route.label}</span>
                        <span className={styles.routeText}>{route.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.mediaPair}>
                <ScreenshotFigure
                  id="quiz-results"
                  src={YUBICO_SCREENSHOTS.results.src}
                  alt={YUBICO_SCREENSHOTS.results.alt}
                  caption="Individual paths end with a clearer recommendation and a direct route to the relevant product."
                  size="medium"
                  sizes="(min-width: 760px) 50vw, 100vw"
                  modalMaxWidth="64rem"
                />

                <ScreenshotFigure
                  id="quiz-cs"
                  src={YUBICO_SCREENSHOTS.customerSuccess.src}
                  alt={YUBICO_SCREENSHOTS.customerSuccess.alt}
                  caption="Larger purchase needs shift from a standard product recommendation to a Customer Success conversation."
                  size="medium"
                  sizes="(min-width: 760px) 50vw, 100vw"
                  modalMaxWidth="64rem"
                  sharedLayoutTarget="image"
                />
              </div>
            </CaseStudySection>

            <CaseStudySection title="Technical approach" spacing="spacious">
              <div className={styles.technicalPanel}>
                <ul className={styles.technicalList}>
                  {technicalPoints.map((point) => (
                    <li className={styles.technicalItem} key={point}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </CaseStudySection>

            <CaseStudySection title="Outcome" spacing="spacious">
              <p>
                At a later point, internal tracking showed that 60% of people who completed the quiz
                continued to the e-commerce site.
              </p>

              <CaseStudyCallout label="Result">
                The quiz created a clearer route from education to product selection, while still
                supporting business buyers who needed a higher-touch path.
              </CaseStudyCallout>
            </CaseStudySection>

            <CaseStudySection title="What I learned" spacing="spacious">
              <p>
                The most useful simplification was not removing detail everywhere. It was letting
                beginners reach a starting recommendation quickly while keeping the questions more
                specific for people who already knew what they needed.
              </p>

              <p>
                The project reinforced that a product finder is not just a multi-step form. The
                order of questions, amount of explanation, and quality of each branch all shape
                whether someone feels guided or overwhelmed.
              </p>
            </CaseStudySection>
          </div>
        </div>
      </main>
    </CaseStudyLayoutGroup>
  );
}
