import Accordion from './accordion/accordion';
import MagneticSlider from './magnetic-slider/magnetic-slider';
import Modal from './modal/modal';
import MorphingPills from './morphing-pills/morphing-pills';

export const craftItemRegistry = {
  'a11y-accordion': Accordion,
  'a11y-modal': Modal,
  'morphing-pills': MorphingPills,
  'magnetic-slider': MagneticSlider,
};

export type CraftItemSlug = keyof typeof craftItemRegistry;
