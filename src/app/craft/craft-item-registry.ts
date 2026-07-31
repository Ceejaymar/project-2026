import Accordion from './accordion/accordion';

export const craftItemRegistry = {
  'a11y-accordion': Accordion,
};

export type CraftItemSlug = keyof typeof craftItemRegistry;
