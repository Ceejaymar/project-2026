import type { CSSProperties } from 'react';

export type MosaicTileStyle = CSSProperties & {
  '--tile-color'?: string;
  '--tile-delay'?: string;
};

export function getMosaicTileColorStyle(color: string): MosaicTileStyle {
  return {
    '--tile-color': color,
  };
}

export function getMosaicTileStyle(delay?: string): MosaicTileStyle | undefined {
  if (!delay) {
    return undefined;
  }

  return {
    '--tile-delay': delay,
  };
}
