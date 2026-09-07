import type { ComponentType } from 'react';
import Accordion from './accordion/accordion';
import Modal from './modal/modal';
import type { CraftDemoProps } from './types';

export const craftItemRegistry = {
  'a11y-accordion': Accordion,
  'a11y-modal': Modal,
} satisfies Record<string, ComponentType<CraftDemoProps>>;

export type CraftItemSlug = keyof typeof craftItemRegistry;
