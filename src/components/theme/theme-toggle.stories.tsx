import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ThemeToggle from './theme-toggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'theme/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj<typeof ThemeToggle> = {};
