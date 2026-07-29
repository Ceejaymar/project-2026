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

function getMosaicTileLayout(colors: readonly string[]): MosaicTileLayout {
  const layout = MOSAIC_TILE_LAYOUTS[colors.length - 1];

  if (!layout) {
    throw new Error('MosaicTile expects one to four colors.');
  }

  return layout;
}

export default function MosaicTile({ colors, variant, delay, ariaHidden }: MosaicTileProps) {
  return (
    <span
      className={styles.tile}
      data-layout={getMosaicTileLayout(colors)}
      data-variant={variant}
      style={getMosaicTileStyle(delay)}
      aria-hidden={ariaHidden ? true : undefined}
    >
      {colors.map((color) => (
        <span className={styles.segment} key={`${color}`} style={getMosaicTileColorStyle(color)} />
      ))}
    </span>
  );
}
