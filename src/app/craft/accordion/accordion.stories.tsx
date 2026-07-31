import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Accordion from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Site/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {};
