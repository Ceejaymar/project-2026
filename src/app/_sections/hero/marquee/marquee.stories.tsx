import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Marquee from './marquee';

const meta = {
  title: 'Sections/Hero/Marquee',
  component: Marquee,
} satisfies Meta<typeof Marquee>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
