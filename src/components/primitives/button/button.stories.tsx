import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const LinkPrimary: Story = {
  args: {
    href: '/work',
    children: 'View work',
  },
};

export const LinkSecondary: Story = {
  args: {
    href: '/contact',
    variant: 'secondary',
    children: 'Contact',
  },
};

export const ButtonPrimary: Story = {
  args: {
    type: 'button',
    children: 'Open menu',
  },
};
