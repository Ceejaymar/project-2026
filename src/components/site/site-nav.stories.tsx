import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SiteNavigation from './site-nav';

const meta: Meta<typeof SiteNavigation> = {
  title: 'Site/SiteNavigation',
  component: SiteNavigation,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SiteNavigation>;

export const Default: Story = {};
