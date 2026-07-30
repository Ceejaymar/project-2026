import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/theme-provider';

import '@/styles/layers.css';
import '@/styles/reset.css';
import '@/styles/tokens.css';
import '@/styles/a11y.css';
import '@/styles/themes.css';
import '@/styles/globals.css';
import { NoiseFilter } from '@/components/effects/noise-filter';
import SiteFooter from '@/components/site/site-footer';
import { geistMono, geistSans, instrumentSerif } from '@/styles/fonts';
import SkipLink from '../components/a11y/skip-link';
import SiteNavigation from '../components/site/site-nav';

export const metadata: Metadata = {
  title: 'Los',
  description: 'Carlos Martinez developer portfolio website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/devicon.min.css"
        />
      </head>
      <body>
        <ThemeProvider>
          <NoiseFilter />
          <SkipLink />
          <SiteNavigation />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
