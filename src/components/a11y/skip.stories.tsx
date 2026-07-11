import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SkipLink from './skip-link';
import styles from './skip-link.module.css';

const meta: Meta<typeof SkipLink> = {
  title: 'A11y/SkipLink',
  component: SkipLink,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {
  render: () => (
    <>
      <SkipLink />
      <main id="main-content" tabIndex={-1} className={styles.demoMain}>
        <p>Press Tab to reveal the skip link.</p>
      </main>
    </>
  ),
};

export const Visible: Story = {
  render: () => (
    <>
      <SkipLink className={styles.visible} />
      <main id="main-content" tabIndex={-1} className={styles.demoMain}>
        <p>This story forces the skip link into view for visual review.</p>
      </main>
    </>
  ),
};
