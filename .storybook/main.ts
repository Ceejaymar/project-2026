import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-vitest'],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],

  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      optimizeDeps: {
        include: ['clsx', 'next/link'],
      },
    });
  },
};
export default config;
