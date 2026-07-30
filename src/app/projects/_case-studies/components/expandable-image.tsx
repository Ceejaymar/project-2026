import Image from 'next/image';
import type { CSSProperties } from 'react';

import styles from './expandable-image.module.css';

type ExpandableScreenshotStyle = CSSProperties & {
  '--screenshot-aspect-ratio'?: string;
  '--screenshot-object-fit'?: string;
  '--screenshot-object-position'?: string;
};

type ExpandableScreenshotProps = {
  src: string;
  alt: string;
  caption?: string;
  sizes?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover';
  objectPosition?: string;
  size?: 'wide' | 'medium';
  variant?: 'default' | 'mosaic' | 'yubico';
};

export default function ExpandableScreenshot({
  src,
  alt,
  caption,
  sizes = '100vw',
  aspectRatio = '16 / 10',
  objectFit = 'contain',
  objectPosition = 'center',
  size = 'wide',
  variant = 'default',
}: ExpandableScreenshotProps) {
  const screenshotStyle: ExpandableScreenshotStyle = {
    '--screenshot-aspect-ratio': aspectRatio,
    '--screenshot-object-fit': objectFit,
    '--screenshot-object-position': objectPosition,
  };

  return (
    <figure
      className={styles.figure}
      data-size={size}
      data-variant={variant}
      style={screenshotStyle}
    >
      <div className={styles.frame}>
        <div className={styles.imageInset}>
          <Image className={styles.image} src={src} alt={alt} fill sizes={sizes} />
        </div>
      </div>

      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
