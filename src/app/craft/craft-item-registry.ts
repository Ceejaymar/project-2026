import Accordion from './accordion/accordion';
import Modal from './modal/modal';
import MorphingPills from './morphing-pills/morphing-pills';

export const craftItemRegistry = {
  'a11y-accordion': Accordion,
  'a11y-modal': Modal,
  'morphing-pills': MorphingPills,
};

export type CraftItemSlug = keyof typeof craftItemRegistry;
