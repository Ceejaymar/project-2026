import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import MorphingPills from './morphing-pills';
import MorphingPillsCSS from './morphing-pills-css';
import MorphingPillsMotion from './morphing-pills-motion';

const meta: Meta<typeof MorphingPills> = {
  title: 'Site/Morphing Pills',
  component: MorphingPills,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MorphingPills>;

export const Comparison: Story = {};

export const CSSOnly: Story = {
  render: () => <MorphingPillsCSS />,
};

export const MotionOnly: Story = {
  render: () => <MorphingPillsMotion />,
};
