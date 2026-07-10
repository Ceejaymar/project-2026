import type { Preview } from '@storybook/nextjs-vite';

import '../src/styles/layers.css';
import '../src/styles/reset.css';
import '../src/styles/tokens.css';
import '../src/styles/themes.css';
import '../src/styles/a11y.css';
import '../src/styles/globals.css';
import { NoiseFilter } from '../src/components/effects/noise-filter';
import { ThemeProvider } from '../src/components/theme/theme-provider';
import { geistMono, geistSans } from '../src/styles/fonts';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'dark' ? 'dark' : 'light';

      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = theme;

        document.documentElement.classList.add(
          ...geistSans.variable.split(' '),
          ...geistMono.variable.split(' '),
        );
      }

      return (
        <ThemeProvider forcedTheme={theme}>
          <NoiseFilter />
          <Story />
        </ThemeProvider>
      );
    },
  ],

  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    a11y: {
      test: 'error',
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
