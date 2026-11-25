import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MagneticSlider from './magnetic-slider';

const meta: Meta<typeof MagneticSlider> = {
  title: 'Site/magneticSlider',
  component: MagneticSlider,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MagneticSlider>;

export const Default: Story = {};
