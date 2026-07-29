import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { caseStudySlugs, getCaseStudy } from '../_case-studies/case-study-registry';

type ProjectCaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: 'Project not found',
    };
  }

  return {
    title: `${caseStudy.title} | Projects`,
    description: caseStudy.summary,
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const CaseStudyComponent = caseStudy.Component;

  return <CaseStudyComponent />;
}
