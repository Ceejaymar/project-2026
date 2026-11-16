import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MorphingPills from './morphing-pills';

const meta: Meta<typeof MorphingPills> = {
  title: 'Craft/Morphing Pills',
  component: MorphingPills,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MorphingPills>;

export const Default: Story = {};
