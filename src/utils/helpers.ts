import { Assessment, Candidate, CandidateFilter, CandidateSummary, OverviewData, OverviewMetric } from "../types";

export const generateMockCandidates = (count: number): Candidate[] => {
  const roles = ["Frontend Engineer", "Backend Engineer", "Data Scientist", "DevOps Engineer"];
  const result: Candidate[] = [];
  let index = 0;
  while (index < count) {
    const roleIndex = index % roles.length;
    const role = roles[roleIndex];
    const score = 40 + ((index * 7) % 60);
    const candidate: Candidate = {
      id: `cand-${index + 1}`,
      name: `Candidate ${index + 1}`,
      email: `candidate${index + 1}@example.com`,
      role,
      score,
      lastAssessmentAt: new Date(Date.now() - index * 3600000).toISOString(),
      totalAssessments: 1 + ((index * 3) % 12)
    };
    result.push(candidate);
    index += 1;
  }
  return result;
};

export const generateMockAssessments = (candidates: Candidate[]): Assessment[] => {
  const skillAreas = ["React", "TypeScript", "System Design", "Machine Learning"];
  const result: Assessment[] = [];
  let index = 0;
  for (const candidate of candidates) {
    const count = candidate.totalAssessments;
    let innerIndex = 0;
    while (innerIndex < count) {
      const skillArea = skillAreas[(index + innerIndex) % skillAreas.length];
      const startedAt = new Date(Date.now() - (index + innerIndex) * 7200000).toISOString();
      const completed = (index + innerIndex) % 3 !== 0;
      const assessment: Assessment = {
        id: `asm-${candidate.id}-${innerIndex + 1}`,
        candidateId: candidate.id,
        startedAt,
        completedAt: completed ? new Date(Date.now() - (index + innerIndex) * 3600000).toISOString() : null,
        status: completed ? "completed" : "running",
        skillArea,
        score: completed ? 50 + ((index + innerIndex) * 5) % 50 : null
      };
      result.push(assessment);
      innerIndex += 1;
    }
    index += 1;
  }
  return result;
};

export const buildOverviewData = (candidates: Candidate[], assessments: Assessment[]): OverviewData => {
  let totalCandidates = 0;
  let totalAssessments = 0;
  let completedAssessments = 0;
  let runningAssessments = 0;
  let sumScore = 0;
  let scoredCount = 0;

  for (const candidate of candidates) {
    totalCandidates += 1;
    totalAssessments += candidate.totalAssessments;
    sumScore += candidate.score;
    scoredCount += 1;
  }

  for (const assessment of assessments) {
    if (assessment.status === "completed") {
      completedAssessments += 1;
    } else if (assessment.status === "running") {
      runningAssessments += 1;
    }
    if (assessment.score !== null) {
      sumScore += assessment.score;
      scoredCount += 1;
    }
  }

  const avgScore = scoredCount > 0 ? Math.round(sumScore / scoredCount) : 0;

  const metrics: OverviewMetric[] = [
    {
      key: "totalCandidates",
      label: "Total Candidates",
      value: totalCandidates,
      trend: totalCandidates % 2 === 0 ? "up" : "flat"
    },
    {
      key: "totalAssessments",
      label: "Total Assessments",
      value: totalAssessments,
      trend: totalAssessments % 3 === 0 ? "up" : "down"
    },
    {
      key: "completedAssessments",
      label: "Completed Assessments",
      value: completedAssessments,
      trend: completedAssessments % 2 === 0 ? "up" : "down"
    },
    {
      key: "runningAssessments",
      label: "Running Assessments",
      value: runningAssessments,
      trend: runningAssessments % 2 === 0 ? "flat" : "up"
    },
    {
      key: "avgScore",
      label: "Average Score",
      value: avgScore,
      trend: avgScore >= 70 ? "up" : "down"
    }
  ];

  return { metrics };
};

export const filterCandidates = (candidates: Candidate[], filter: CandidateFilter): Candidate[] => {
  const result: Candidate[] = [];
  for (const candidate of candidates) {
    if (filter.role && candidate.role !== filter.role) {
      continue;
    }
    if (filter.minScore !== null && candidate.score < filter.minScore) {
      continue;
    }
    result.push(candidate);
  }
  return result;
};

export const toCandidateSummaries = (candidates: Candidate[]): CandidateSummary[] => {
  const result: CandidateSummary[] = [];
  for (const candidate of candidates) {
    result.push({
      id: candidate.id,
      name: candidate.name,
      score: candidate.score,
      totalAssessments: candidate.totalAssessments
    });
  }
  return result;
};
