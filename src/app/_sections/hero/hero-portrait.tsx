import clsx from 'clsx';
import Image from 'next/image';

import styles from './hero.module.css';

type HeroPortraitProps = {
  className?: string;
};

export default function HeroPortrait({ className }: HeroPortraitProps) {
  return (
    <div className={clsx(styles.portrait, className)} aria-hidden="true">
      <div className={styles.portraitImage}>
        <Image src="/images/hero/los-pfp.webp" alt="" fill sizes="(min-width: 56rem) 36vw, 12rem" />
      </div>
    </div>
  );
}
