import styles from './mosaic-tile.module.css';
import { getMosaicTileColorStyle, getMosaicTileStyle } from './mosaic-tile-style';

const MOSAIC_TILE_LAYOUTS = ['one', 'two', 'three', 'four'] as const;

type MosaicTileLayout = (typeof MOSAIC_TILE_LAYOUTS)[number];
type MosaicTileVariant = 'hero-calendar' | 'progression';

type MosaicTileProps = {
  colors: readonly string[];
  variant: MosaicTileVariant;
  delay?: string;
  ariaHidden?: boolean;
};

type MosaicTileSegment = {
  color: string;
  key: string;
};

function getMosaicTileLayout(colors: readonly string[]): MosaicTileLayout {
  const layout = MOSAIC_TILE_LAYOUTS[colors.length - 1];

  if (!layout) {
    throw new Error('MosaicTile expects one to four colors.');
  }

  return layout;
}

function getMosaicTileSegments(colors: readonly string[]): MosaicTileSegment[] {
  const colorCounts = new Map<string, number>();

  return colors.map((color) => {
    const occurrence = colorCounts.get(color) ?? 0;

    colorCounts.set(color, occurrence + 1);

    return {
      color,
      key: `${color}-${occurrence}`,
    };
  });
}

export default function MosaicTile({ colors, variant, delay, ariaHidden }: MosaicTileProps) {
  const segments = getMosaicTileSegments(colors);

  return (
    <span
      className={styles.tile}
      data-layout={getMosaicTileLayout(colors)}
      data-variant={variant}
      style={getMosaicTileStyle(delay)}
      aria-hidden={ariaHidden ? true : undefined}
    >
      {segments.map((segment) => (
        <span
          className={styles.segment}
          key={segment.key}
          style={getMosaicTileColorStyle(segment.color)}
        />
      ))}
    </span>
  );
}
