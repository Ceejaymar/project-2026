'use client';

import { LayoutGroup } from 'motion/react';

type CaseStudyLayoutGroupProps = {
  id: string;
  children: React.ReactNode;
};

export default function CaseStudyLayoutGroup({ id, children }: CaseStudyLayoutGroupProps) {
  return <LayoutGroup id={id}>{children}</LayoutGroup>;
}
