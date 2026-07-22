import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SiteFooter from './site-nav';

const meta: Meta<typeof SiteFooter> = {
  title: 'Site/SiteFooter',
  component: SiteFooter,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {};
