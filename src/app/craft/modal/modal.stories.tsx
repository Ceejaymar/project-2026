import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Modal from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Site/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {};
