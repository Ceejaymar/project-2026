import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ExternalLink from './external-link';

const meta: Meta<typeof ExternalLink> = {
  title: 'Primitives/ExternalLink',
  component: ExternalLink,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ExternalLink>;

export const Default: Story = {
  args: {
    href: 'https://github',
    children: 'View code',
  },
};
