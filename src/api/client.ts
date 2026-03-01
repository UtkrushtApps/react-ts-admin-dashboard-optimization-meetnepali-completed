import { Assessment, Candidate, OverviewData } from "../types";
import { buildOverviewData, generateMockAssessments, generateMockCandidates } from "../utils/helpers";

let cachedCandidates: Candidate[] | null = null;
let cachedAssessments: Assessment[] | null = null;

const ensureData = (): { candidates: Candidate[]; assessments: Assessment[] } => {
  if (!cachedCandidates) {
    cachedCandidates = generateMockCandidates(200);
  }
  if (!cachedAssessments) {
    cachedAssessments = generateMockAssessments(cachedCandidates);
  }
  return { candidates: cachedCandidates, assessments: cachedAssessments };
};

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const fetchOverviewData = async (): Promise<OverviewData> => {
  const { candidates, assessments } = ensureData();
  await wait(400);
  const data = buildOverviewData(candidates, assessments);
  return data;
};

export const fetchCandidates = async (): Promise<Candidate[]> => {
  const { candidates } = ensureData();
  await wait(500);
  return candidates.slice();
};

export const fetchAssessments = async (): Promise<Assessment[]> => {
  const { assessments } = ensureData();
  await wait(600);
  return assessments.slice();
};

export const fetchCandidateById = async (id: string): Promise<Candidate | null> => {
  const { candidates } = ensureData();
  await wait(300);
  const found = candidates.find((c) => c.id === id) || null;
  return found;
};
