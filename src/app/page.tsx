import Button from '@/components/primitives/button/button';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main id="main-content" tabIndex={-1} className={styles.main}>
        <Button variant="primary" href="/">
          Button
        </Button>
      </main>
    </div>
  );
}
