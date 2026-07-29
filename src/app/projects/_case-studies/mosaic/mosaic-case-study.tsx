import CaseStudyBackLink from '../components/case-study-back-link';
import CaseStudyCallout from '../components/case-study-callout';
import CaseStudySection from '../components/case-study-section';
import ExpandableScreenshot from '../components/expandable-image';

import styles from './mosaic-case-study.module.css';
import { mosaicCaseStudyMeta } from './mosaic-case-study-data';
import MosaicTile from './mosaic-tile';
import { getMosaicTileColorStyle } from './mosaic-tile-style';

const MOSAIC_EMOTION_FAMILIES = [
  { id: 'happy', label: 'Happy', scale: ['#F2A900', '#F4C95D', '#FFE08A'] },
  { id: 'sad', label: 'Sad', scale: ['#3D71D9', '#53C7F5', '#91E2FF'] },
  { id: 'calm', label: 'Calm', scale: ['#00B894', '#22CFA3', '#8FE6C8'] },
  { id: 'angry', label: 'Angry', scale: ['#FF2D55', '#F26D6D', '#FFA19A'] },
  {
    id: 'fearful',
    label: 'Fearful',
    scale: ['#FF8A00', '#F2A65A', '#FFC078'],
  },
  {
    id: 'surprised',
    label: 'Surprised',
    scale: ['#C026D3', '#D946EF', '#F0ABFC'],
  },
  {
    id: 'disgusted',
    label: 'Disgusted',
    scale: ['#7C3AED', '#A77CEB', '#C9A7FF'],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  scale: readonly [string, string, string];
}>;

type MosaicEmotionFamily = (typeof MOSAIC_EMOTION_FAMILIES)[number];
type MosaicEmotionId = MosaicEmotionFamily['id'];
type HeroEmotionColor = MosaicEmotionFamily['scale'][number];

function getMosaicEmotionFamily(id: MosaicEmotionId): MosaicEmotionFamily {
  const family = MOSAIC_EMOTION_FAMILIES.find((emotion) => emotion.id === id);

  if (!family) {
    throw new Error(`Unknown Mosaic emotion family: ${id}`);
  }

  return family;
}

function getMosaicEmotionColor(id: MosaicEmotionId) {
  return getMosaicEmotionFamily(id).scale[0];
}

const HERO_META_ITEMS = [
  { label: 'Year', value: mosaicCaseStudyMeta.year },
  { label: 'Role', value: mosaicCaseStudyMeta.role },
  { label: 'Type', value: mosaicCaseStudyMeta.type },
  { label: 'Industry', value: mosaicCaseStudyMeta.industry },
  { label: 'Stack', value: mosaicCaseStudyMeta.tech },
] as const;

const SYSTEM_PALETTE_TOKENS = [
  { name: 'Canvas', color: '#000000' },
  { name: 'Surface', color: '#1C1C1E' },
  { name: 'Gold', color: '#C09040' },
  { name: 'Primary text', color: '#FFFFFF' },
  { name: 'Muted text', color: '#A1A1A6' },
  { name: 'Divider', color: '#3A3A3C' },
] as const;

const EMOTION_SWATCH_ORDER = [
  'happy',
  'calm',
  'sad',
  'angry',
  'fearful',
  'surprised',
  'disgusted',
] as const satisfies ReadonlyArray<MosaicEmotionId>;

const MOSAIC_SCREENSHOTS = {
  emotionFamilies: {
    src: '/images/case-studies/mosaic/ci-1.webp',
    alt: 'Mosaic emotion-family selection screen',
  },
  calmEmotion: {
    src: '/images/case-studies/mosaic/ci-3.webp',
    alt: 'Mosaic calm emotion selection',
  },
  checkIn: {
    src: '/images/case-studies/mosaic/ci-4.webp',
    alt: 'Mosaic check-in screen',
  },
  monthlyView: {
    src: '/images/case-studies/mosaic/m.webp',
    alt: 'Mosaic monthly view',
  },
  yearlyView: {
    src: '/images/case-studies/mosaic/y.webp',
    alt: 'Mosaic yearly view',
  },
  today: {
    src: '/images/case-studies/mosaic/t.webp',
    alt: 'Mosaic today screen',
  },
  insightsSummary: {
    src: '/images/case-studies/mosaic/e-1.webp',
    alt: 'Mosaic insights screen 1',
  },
  insightsTiming: {
    src: '/images/case-studies/mosaic/e-2.webp',
    alt: 'Mosaic insights screen 2',
  },
  accessibility: {
    src: '/images/case-studies/mosaic/a11y.webp',
    alt: 'Mosaic accessibility settings',
  },
} as const;

const CHECK_IN_SCREENSHOTS = [
  MOSAIC_SCREENSHOTS.emotionFamilies,
  MOSAIC_SCREENSHOTS.calmEmotion,
  MOSAIC_SCREENSHOTS.checkIn,
] as const;

const REFLECTION_VIEW_SCREENSHOTS = [
  MOSAIC_SCREENSHOTS.monthlyView,
  MOSAIC_SCREENSHOTS.yearlyView,
] as const;

const INSIGHT_SCREENSHOTS = [
  MOSAIC_SCREENSHOTS.insightsSummary,
  MOSAIC_SCREENSHOTS.insightsTiming,
] as const;

const TYPE_ROLE_ROWS = [
  {
    role: 'heading',
    label: 'HEADING',
    sample: 'How are you feeling?',
    description: 'Editorial display type for page titles and reflective moments.',
  },
  {
    role: 'body',
    label: 'BODY',
    sample: 'A calm, readable voice for everyday reflection.',
    description: 'Neutral system text for notes, choices, and supporting copy.',
  },
  {
    role: 'label',
    label: 'LABEL',
    sample: 'JUNE 30 · 9:15 AM',
    description: 'Monospace labels for dates, metadata, and small system details.',
  },
] as const satisfies ReadonlyArray<{
  role: 'heading' | 'body' | 'label';
  label: string;
  sample: string;
  description: string;
}>;

type ArchitectureDataColumn = {
  kind: 'data';
  eyebrow: string;
  title: string;
  text: string;
  ariaLabel: string;
  items: ReadonlyArray<{
    label: string;
    value: string;
  }>;
};

type ArchitectureReasonColumn = {
  kind: 'reasons';
  eyebrow: string;
  title: string;
  text: string;
  reasons: readonly string[];
};

const ARCHITECTURE_COLUMNS = [
  {
    kind: 'data',
    eyebrow: 'Shared emotion system',
    title: 'Define a feeling once',
    text: 'Each feeling belongs to an emotion family and has display details that can be reused throughout Mosaic.',
    ariaLabel: 'Shared emotion system example',
    items: [
      { label: 'Family', value: 'Happy' },
      { label: 'Feeling', value: 'Joyful' },
      { label: 'Shown as', value: 'label + color' },
    ],
  },
  {
    kind: 'data',
    eyebrow: 'Saved check-in',
    title: 'Keep the moment simple',
    text: 'Each check-in remembers which feeling was selected and when it happened. Notes and context tags stay optional.',
    ariaLabel: 'Saved check-in example',
    items: [
      { label: 'Feeling', value: 'Joyful' },
      { label: 'Date', value: 'June 30th' },
      { label: 'Recorded', value: '9:15 AM' },
      { label: 'Optional', value: 'note + tags' },
    ],
  },
  {
    kind: 'reasons',
    eyebrow: 'Why it matters',
    title: 'Reuse the same foundation',
    text: 'That small structure gives Mosaic room to support reflection at different points in time.',
    reasons: [
      'Up to four check-ins can form one daily mosaic tile.',
      'Entries can be grouped into weekly and monthly patterns.',
      'Labels and color palettes can evolve without changing past check-ins.',
    ],
  },
] as const satisfies ReadonlyArray<ArchitectureDataColumn | ArchitectureReasonColumn>;

type HeroCalendarCell =
  | {
      kind: 'blank';
      id: string;
    }
  | {
      kind: 'day';
      id: string;
      day: number;
      colors: HeroEmotionColor[];
    };

const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

function getPreviousMonthCalendar(referenceDate: Date) {
  const finalDayOfPreviousMonth = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    0,
  );
  const year = finalDayOfPreviousMonth.getFullYear();
  const monthIndex = finalDayOfPreviousMonth.getMonth();
  const daysInMonth = finalDayOfPreviousMonth.getDate();
  const leadingEmptyCells = new Date(year, monthIndex, 1).getDay();
  const totalCells = Math.max(5, Math.ceil((leadingEmptyCells + daysInMonth) / 7)) * 7;

  const cells: HeroCalendarCell[] = Array.from(
    { length: totalCells },
    (_, cellIndex): HeroCalendarCell => {
      const day = cellIndex - leadingEmptyCells + 1;

      if (day < 1 || day > daysInMonth) {
        return {
          kind: 'blank',
          id: `${year}-${monthIndex}-blank-${cellIndex}`,
        };
      }

      const segmentCount = ((day + monthIndex) % 4) + 1;
      const startingFamilyIndex = (day * 2 + monthIndex) % MOSAIC_EMOTION_FAMILIES.length;

      const colors = Array.from({ length: segmentCount }, (_, colorOffset) => {
        const familyIndex = (startingFamilyIndex + colorOffset) % MOSAIC_EMOTION_FAMILIES.length;
        const stops = MOSAIC_EMOTION_FAMILIES[familyIndex].scale;
        const stopIndex = (day + monthIndex + colorOffset * 2) % stops.length;

        return stops[stopIndex];
      });

      return {
        kind: 'day',
        id: `${year}-${monthIndex}-day-${day}`,
        day,
        colors,
      };
    },
  );

  return {
    daysInMonth,
    monthLabel: `${MONTH_LABELS[monthIndex] ?? 'June'} ${year}`,
    cells,
  };
}

const MOSAIC_HERO_REFERENCE_DATE = new Date(2026, 6, 1);

const heroCalendar = getPreviousMonthCalendar(MOSAIC_HERO_REFERENCE_DATE);

const researchSignals = [
  {
    label: 'Friction',
    excerpt: 'multiple entry screens are redundant and nauseating',
    risk: 'When a check-in feels like a form, reflection can become work before someone records anything.',
    response:
      'Start with a broad emotion family and let people save a minimal check-in in as few as three taps. Journaling and added detail remain optional.',
  },
  {
    label: 'Emotional range',
    excerpt:
      'Sometimes I’m feeling normal or good or bad, but also I can feel content or anxious, or nervous...',
    risk: 'A flat emotion list creates opposite failure modes: too few choices can flatten someone’s experience, while too many can create decision fatigue.',
    response:
      'Use seven familiar emotion families as starting points, then let people explore more specific feelings only when they want greater nuance.',
  },
  {
    label: 'Trust',
    excerpt: 'I want to track my mental health without worrying about my data being collected.',
    risk: 'When people are uncertain how sensitive reflections are handled, they may hold back or avoid the product altogether.',
    response:
      'Treat privacy as a visible product boundary: sensitive mood and journal content stays on the device by default, while product telemetry excludes personal reflection content.',
  },
] as const;

function getScreenshotId(src: string) {
  return src
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function MosaicScreenshot({
  src,
  alt,
  sizes = '(min-width: 680px) 33vw, 100vw',
}: {
  src: string;
  alt: string;
  sizes?: string;
}) {
  return (
    <ExpandableScreenshot
      id={`mosaic-${getScreenshotId(src)}`}
      src={src}
      alt={alt}
      variant="mosaic"
      aspectRatio="9 / 19.5"
      modalMaxWidth="28rem"
      objectFit="contain"
      sizes={sizes}
      modalSizes="(min-width: 760px) 28rem, 90vw"
      expandLabel={`Open full-size screenshot: ${alt}`}
      dialogTitle={alt}
    />
  );
}

function MosaicHeroScene() {
  return (
    <figure className={styles.heroScene} aria-labelledby="mosaic-hero-title">
      <figcaption className={styles.sceneCopy}>
        <h1 className={styles.sceneTitle} id="mosaic-hero-title">
          {mosaicCaseStudyMeta.title}
        </h1>
        <p className={styles.sceneSubtitle}>See the pattern in your pieces</p>
        <p className={styles.sceneText}>
          An emotion journal that turns quick emotional check-ins into a visual record you can
          return to over time.
        </p>
      </figcaption>

      <div className={styles.phoneStage} aria-hidden="true">
        <div className={styles.calendarHalo}>
          {heroCalendar.cells.map((cell) =>
            cell.kind === 'day' ? (
              <span
                className={styles.calendarHaloTile}
                key={`${cell.id}-halo`}
                style={getMosaicTileColorStyle(cell.colors[0])}
              />
            ) : null,
          )}
        </div>

        <div className={styles.phoneFrame}>
          <div className={styles.phoneScreen}>
            <div className={styles.phoneTop}>
              <p className={styles.phoneMonth}>{heroCalendar.monthLabel}</p>
              <span className={styles.phoneBadge}>{heroCalendar.daysInMonth} day streak</span>
            </div>

            <div className={styles.calendarGrid}>
              {heroCalendar.cells.map((cell, cellIndex) => {
                if (cell.kind === 'blank') {
                  return <span className={styles.calendarBlank} key={cell.id} aria-hidden="true" />;
                }

                return (
                  <MosaicTile
                    key={cell.id}
                    colors={cell.colors}
                    delay={`${cellIndex * 0.09}s`}
                    variant="hero-calendar"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <dl className={styles.heroMeta} aria-label="Mosaic case study details">
        {HERO_META_ITEMS.map((item) => (
          <div className={styles.heroMetaItem} key={item.label}>
            <dt className={styles.heroMetaLabel}>{item.label}</dt>
            <dd className={styles.heroMetaValue}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

export default function MosaicCaseStudy() {
  return (
    <main className={styles.page}>
      <CaseStudyBackLink />

      <div className={styles.mosaicScope}>
        <MosaicHeroScene />

        <div className={styles.content}>
          <CaseStudySection title="Overview">
            <p>
              Mosaic is an emotion journal built for quick, low-pressure reflection. People start
              with one of seven emotion families, add detail only when it helps, and can save a
              check-in in as few as three taps. Up to four check-ins become one daily mosaic tile,
              creating a visual record that makes shifts over time easier to revisit.
            </p>
          </CaseStudySection>

          <CaseStudySection title="The problem" spacing="compact">
            <p>
              Mood tracking can become another task to manage. In competitive app review research, I
              repeatedly saw frustration with long check-in flows, unclear emotion language, privacy
              concerns, and tools that either oversimplified a day or demanded too much effort.
              Mosaic was designed to hold that balance: quick enough for everyday use, expressive
              enough for nuance, and calm enough to support honest reflection.
            </p>
          </CaseStudySection>

          <CaseStudySection title="Competitive review signals" spacing="spacious">
            <p className={styles.researchMethod}>
              To understand where existing mood trackers break down, I reviewed 150+ public App
              Store reviews across 5+ mood-tracking and journaling apps. I grouped repeated feedback
              into three themes that shaped Mosaic’s interaction model.
            </p>

            <div className={styles.researchGrid}>
              {researchSignals.map((quote) => (
                <article className={styles.researchQuote} key={quote.label}>
                  <p className={styles.researchLabel}>{quote.label}</p>

                  <blockquote className={styles.researchExcerpt}>
                    <p>&ldquo;{quote.excerpt}&rdquo;</p>
                  </blockquote>

                  <div className={styles.researchBlock}>
                    <p className={styles.researchRowLabel}>Product risk</p>
                    <p className={styles.researchRowText}>{quote.risk}</p>
                  </div>

                  <div className={styles.researchBlock}>
                    <p className={styles.researchRowLabel}>Design response</p>
                    <p className={styles.researchRowText}>{quote.response}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className={styles.researchInsightNote}>
              Reviews also showed that logging alone was not enough. People wanted a clearer way to
              look back at emotional patterns without being pushed into a dense dashboard. That
              informed Mosaic’s weekly and monthly insight views.
            </p>
          </CaseStudySection>

          <CaseStudySection title="Key interaction decisions" spacing="spacious">
            <p className={styles.interactionLead}>
              The goal was not to fit every possible tracking option into one check-in. It was to
              make the first choice easy while ensuring that each entry could become more useful
              over time.
            </p>

            <div className={`${styles.dividedList} ${styles.interactionDecisionList}`}>
              <article className={styles.interactionDecision}>
                <p className={styles.interactionDecisionEyebrow}>Start simple</p>
                <h3 className={styles.interactionDecisionTitle}>
                  Start simple, add detail when it helps
                </h3>
                <p className={styles.interactionDecisionText}>
                  People do not always need the same level of emotional specificity. Mosaic begins
                  with seven emotion families, then lets someone explore more specific feelings only
                  when they want to. The default stays quick, without treating every day as simple.
                </p>

                <div className={styles.interactionFlowVisual}>
                  {CHECK_IN_SCREENSHOTS.map((screenshot) => (
                    <MosaicScreenshot
                      key={screenshot.alt}
                      src={screenshot.src}
                      alt={screenshot.alt}
                      sizes="(min-width: 680px) 33vw, 100vw"
                    />
                  ))}
                </div>

                <p className={styles.interactionFlowCaption}>
                  Every check-in starts with a broad choice. More specific feelings, notes, and
                  context tags remain available without becoming required steps.
                </p>
              </article>

              <article className={styles.interactionDecision}>
                <p className={styles.interactionDecisionEyebrow}>Represent change</p>
                <h3 className={styles.interactionDecisionTitle}>
                  Let a day hold more than one feeling
                </h3>
                <p className={styles.interactionDecisionText}>
                  A single label cannot always represent a full day. Mosaic allows up to four
                  check-ins, then combines them into one daily tile. That makes emotional shifts
                  visible without turning a day into a scattered list of separate logs.
                </p>

                <div>
                  <div
                    className={styles.tileProgression}
                    role="img"
                    aria-label="Daily tile progression showing one to four emotion segments"
                  >
                    <MosaicTile
                      colors={[getMosaicEmotionColor('happy')]}
                      variant="progression"
                      ariaHidden
                    />
                    <MosaicTile
                      colors={[getMosaicEmotionColor('happy'), getMosaicEmotionColor('calm')]}
                      variant="progression"
                      ariaHidden
                    />
                    <MosaicTile
                      colors={[
                        getMosaicEmotionColor('happy'),
                        getMosaicEmotionColor('sad'),
                        getMosaicEmotionColor('calm'),
                      ]}
                      variant="progression"
                      ariaHidden
                    />
                    <MosaicTile
                      colors={[
                        getMosaicEmotionColor('happy'),
                        getMosaicEmotionColor('calm'),
                        getMosaicEmotionColor('sad'),
                        getMosaicEmotionColor('surprised'),
                      ]}
                      variant="progression"
                      ariaHidden
                    />
                  </div>

                  <p className={styles.tileProgressionCaption}>
                    Each new check-in adds another segment, so one tile can hold the shape of a
                    changing day.
                  </p>
                </div>
              </article>

              <article className={styles.interactionDecision}>
                <p className={styles.interactionDecisionEyebrow}>Reflect gently</p>
                <h3 className={styles.interactionDecisionTitle}>
                  Turn reflection into a pattern, not a score
                </h3>
                <p className={styles.interactionDecisionText}>
                  Check-ins become more useful when they can be revisited in context. Monthly and
                  yearly mosaic views help people step back from individual moments and notice what
                  has been showing up over time, without turning reflection into a score.
                </p>

                <div className={styles.reflectionViewsPair}>
                  {REFLECTION_VIEW_SCREENSHOTS.map((screenshot) => (
                    <MosaicScreenshot
                      key={screenshot.alt}
                      src={screenshot.src}
                      alt={screenshot.alt}
                      sizes="(min-width: 680px) 50vw, 100vw"
                    />
                  ))}
                </div>

                <p className={styles.interactionFlowCaption}>
                  The monthly view keeps individual days legible. The yearly view makes the longer
                  rhythm of emotional reflection easier to see at a glance.
                </p>
              </article>
            </div>
          </CaseStudySection>

          <CaseStudySection title="Designing the visual system" spacing="spacious">
            <p className={styles.visualSystemLead}>
              Mosaic uses a dark, quiet foundation so emotional reflection can feel personal rather
              than clinical. The interface stays restrained while color, type, and small moments of
              motion give each check-in its own presence.
            </p>

            <div className={styles.visualFoundationsPanel}>
              <div className={styles.visualFoundationColumn}>
                <div className={styles.foundationGroup}>
                  <p className={styles.foundationEyebrow}>System palette</p>
                  <h3 className={styles.foundationTitle}>Quiet surfaces, clear hierarchy</h3>
                  <p className={styles.foundationText}>
                    Mosaic keeps its interface colors restrained so the colors attached to emotional
                    entries can remain the most expressive part of the experience.
                  </p>

                  <ul className={styles.colorTokenGrid} aria-label="Mosaic system palette">
                    {SYSTEM_PALETTE_TOKENS.map((token) => (
                      <li className={styles.colorToken} key={token.name}>
                        <span
                          className={styles.colorTokenSwatch}
                          style={getMosaicTileColorStyle(token.color)}
                        />
                        <span>
                          <span className={styles.colorTokenName}>{token.name}</span>
                          <span className={styles.colorTokenValue}>{token.color}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.foundationGroup}>
                  <p className={styles.foundationEyebrow}>Emotion families</p>
                  <p className={styles.foundationText}>
                    Color variation belongs to emotional entries, while the surrounding interface
                    stays intentionally quiet.
                  </p>

                  <ul className={styles.emotionColorGrid} aria-label="Mosaic emotion family colors">
                    {EMOTION_SWATCH_ORDER.map((emotionId) => {
                      const emotion = getMosaicEmotionFamily(emotionId);
                      const color = emotion.scale[0];

                      return (
                        <li className={styles.emotionColorItem} key={emotion.id}>
                          <span
                            className={styles.emotionColorSwatch}
                            style={getMosaicTileColorStyle(color)}
                          />
                          <span>
                            <span className={styles.emotionColorName}>{emotion.label}</span>
                            <span className={styles.emotionColorValue}>{color}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className={styles.visualFoundationColumn}>
                <div className={styles.foundationGroup}>
                  <p className={styles.foundationEyebrow}>Type roles</p>
                  <h3 className={styles.foundationTitle}>Editorial warmth, clear utility</h3>
                  <p className={styles.foundationText}>
                    Typography separates reflection from supporting information without making the
                    interface feel ornamental.
                  </p>

                  <div className={styles.typeRoleList}>
                    {TYPE_ROLE_ROWS.map((row) => (
                      <div className={styles.typeRole} key={row.role} data-role={row.role}>
                        <span>{row.label}</span>
                        <strong>{row.sample}</strong>
                        <p>{row.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <section className={styles.visualSubsection}>
              <h3 className={styles.visualSubheading}>Quiet interface, expressive emotion</h3>

              <div className={styles.visualFeatureLayout}>
                <div>
                  <p>
                    Mosaic keeps the interface deliberately quiet. The black canvas, softened
                    surfaces, and restrained gold accent create hierarchy without competing with the
                    colors attached to each emotion.
                  </p>
                  <p>
                    The Today screen is the clearest expression of that balance. Emotion colors
                    carry the personal signal, while the surrounding interface makes space for the
                    moment instead of treating it like a dashboard.
                  </p>
                </div>

                <MosaicScreenshot
                  src={MOSAIC_SCREENSHOTS.today.src}
                  alt={MOSAIC_SCREENSHOTS.today.alt}
                  sizes="(min-width: 760px) 24rem, 100vw"
                />
              </div>
            </section>

            <section className={styles.visualSubsection}>
              <h3 className={styles.visualSubheading}>Insights without a dashboard</h3>
              <p>
                Insights are designed as a paced reflection rather than one dense dashboard.
                Emotional summaries, recurring feelings, and timing patterns are grouped into
                distinct moments, so people can take in what stands out without having to decode
                everything at once.
              </p>

              <div className={styles.visualScreensPair}>
                {INSIGHT_SCREENSHOTS.map((screenshot) => (
                  <MosaicScreenshot
                    key={screenshot.alt}
                    src={screenshot.src}
                    alt={screenshot.alt}
                    sizes="(min-width: 680px) 50vw, 100vw"
                  />
                ))}
              </div>
            </section>

            <section className={styles.visualSubsection}>
              <h3 className={styles.visualSubheading}>Designed to adapt</h3>

              <div className={styles.accessibilityLayout}>
                <div>
                  <p>
                    Accessibility is part of the same product system, not a separate version of
                    Mosaic. High-contrast text makes subtle text and borders easier to see. Reduced
                    motion removes screen transitions and heavier animations. Haptic feedback can
                    also be turned off entirely.
                  </p>
                  <p>
                    Those settings let the interface adapt to different needs while preserving the
                    same core experience.
                  </p>
                </div>

                <MosaicScreenshot
                  src={MOSAIC_SCREENSHOTS.accessibility.src}
                  alt={MOSAIC_SCREENSHOTS.accessibility.alt}
                  sizes="(min-width: 760px) 24rem, 100vw"
                />
              </div>
            </section>
          </CaseStudySection>

          <CaseStudySection title="Architecture" spacing="spacious">
            <div className={styles.architectureContent}>
              <p className={styles.architectureTechLine}>
                <span className={styles.architectureTechLabel}>Built with</span>
                <span className={styles.architectureTechValue}>
                  React Native · Expo · TypeScript · SQLite + Drizzle · Zustand · MMKV · Unistyles
                </span>
              </p>

              <p className={styles.architectureLead}>
                The technical work focused on making a simple check-in useful beyond the moment it
                is saved. A single entry can shape the day’s mosaic and contribute to longer-term
                patterns, while Mosaic keeps the emotional language consistent across the app.
              </p>

              <div className={styles.architecturePanel}>
                <div className={styles.architecturePanelHeader}>
                  <h3 className={styles.architecturePanelTitle}>
                    One check-in, many ways to reflect
                  </h3>
                </div>

                <div className={styles.architecturePanelGrid}>
                  {ARCHITECTURE_COLUMNS.map((column) => (
                    <div className={styles.architecturePanelColumn} key={column.eyebrow}>
                      <p className={styles.architectureEyebrow}>{column.eyebrow}</p>
                      <h4 className={styles.architectureColumnTitle}>{column.title}</h4>
                      <p className={styles.architectureColumnText}>{column.text}</p>

                      {column.kind === 'data' ? (
                        <dl className={styles.architectureDataList} aria-label={column.ariaLabel}>
                          {column.items.map((item) => (
                            <div className={styles.architectureDataItem} key={item.label}>
                              <dt className={styles.architectureDataLabel}>{item.label}</dt>
                              <dd className={styles.architectureDataValue}>{item.value}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : (
                        <ul className={styles.architectureReasonList}>
                          {column.reasons.map((reason) => (
                            <li className={styles.architectureReasonItem} key={reason}>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <p className={styles.architecturePostCopy}>
                Instead of copying a label or color into every check-in, Mosaic looks up those
                display details when it needs them. That leaves room to refine wording, add
                translations, or adjust palettes over time without rewriting someone’s history.
              </p>

              <CaseStudyCallout label="Key takeaway">
                One small check-in can stay useful across the mosaic, insights, and future product
                improvements without changing someone’s history.
              </CaseStudyCallout>
            </div>
          </CaseStudySection>

          <CaseStudySection title="Early release, ongoing learning" spacing="spacious">
            <p>
              Mosaic is live and still early. The next phase is focused on learning where more depth
              would genuinely help, while keeping the core check-in private, lightweight, and easy
              to return to.
            </p>

            <div className={`${styles.dividedList} ${styles.nextDirectionsList}`}>
              <article className={styles.interactionDecision}>
                <p className={styles.interactionDecisionEyebrow}>Capacity</p>
                <h3 className={styles.interactionDecisionTitle}>
                  Validate room for a changing day
                </h3>
                <p className={styles.interactionDecisionText}>
                  The current four-entry limit keeps a day easy to read at a glance. I&apos;ll use
                  privacy-conscious interaction signals to understand whether people reach that
                  limit or want to capture more moments. A higher limit is worth testing only if the
                  daily mosaic can still make those moments easy to read.
                </p>
              </article>

              <article className={styles.interactionDecision}>
                <p className={styles.interactionDecisionEyebrow}>Private insights</p>
                <h3 className={styles.interactionDecisionTitle}>
                  Explore AI-assisted pattern reflection
                </h3>
                <p className={styles.interactionDecisionText}>
                  Explore optional AI-assisted summaries that help people notice recurring emotions,
                  shifts over time, and meaningful timing patterns in their own history. The goal is
                  to turn existing check-ins into clearer, more useful observations, with on-device
                  processing where supported.
                </p>
              </article>

              <article className={styles.interactionDecision}>
                <p className={styles.interactionDecisionEyebrow}>Color access</p>
                <h3 className={styles.interactionDecisionTitle}>
                  Make color patterns more accessible
                </h3>
                <p className={styles.interactionDecisionText}>
                  Explore alternative emotion palettes and supporting visual cues so Mosaic&apos;s
                  patterns remain easy to distinguish across different forms of color vision. The
                  goal is to preserve color as a meaningful part of reflection while making the
                  system easier for more people to read.
                </p>
              </article>
            </div>

            <CaseStudyCallout label="Key takeaway">
              Mosaic&apos;s next phase is not about more tracking. It is about learning which
              additions make private reflection clearer without making the daily ritual heavier.
            </CaseStudyCallout>
          </CaseStudySection>
        </div>
      </div>
    </main>
  );
}
