import type { ComponentType } from 'react';
import Accordion from './accordion/accordion';
import type { CraftDemoProps } from './types';

export const craftItemRegistry = {
  'a11y-accordion': Accordion,
} satisfies Record<string, ComponentType<CraftDemoProps>>;

export type CraftItemSlug = keyof typeof craftItemRegistry;
