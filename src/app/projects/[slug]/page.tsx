import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CaseStudyViewTracker from '@/components/analytics/case-study-view-tracker';
import { getReferrerContext, type ReferrerContext } from '@/lib/analytics';
import { caseStudySlugs, getCaseStudy } from '../_case-studies/case-study-registry';

type ProjectCaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    from?: string;
  }>;
};

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({
    slug,
  }));
}

function getCaseStudyBackTarget(referrerContext: ReferrerContext) {
  if (referrerContext === 'projects') {
    return {
      href: '/projects',
      label: 'Back to all projects',
    };
  }

  return {
    href: '/#case-studies',
    label: 'Back to case studies',
  };
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

export default async function ProjectCaseStudyPage({
  params,
  searchParams,
}: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const CaseStudyComponent = caseStudy.Component;
  const referrerContext = getReferrerContext(resolvedSearchParams?.from);
  const backTarget = getCaseStudyBackTarget(referrerContext);
  const projectName = caseStudy.analyticsName ?? caseStudy.title;

  return (
    <>
      <CaseStudyViewTracker
        projectSlug={caseStudy.slug}
        projectName={projectName}
        referrerContext={referrerContext}
      />
      <CaseStudyComponent
        backHref={backTarget.href}
        backLabel={backTarget.label}
        projectSlug={caseStudy.slug}
        projectName={projectName}
        referrerContext={referrerContext}
      />
    </>
  );
}
