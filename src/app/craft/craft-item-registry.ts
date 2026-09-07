import Accordion from './accordion/accordion';
import Modal from './modal/modal';

export const craftItemRegistry = {
  'a11y-accordion': Accordion,
  'a11y-modal': Modal,
};

export type CraftItemSlug = keyof typeof craftItemRegistry;
