import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ThemeProvider } from './theme-provider';
import ThemeToggle from './theme-toggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'theme/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof ThemeToggle> = {};
