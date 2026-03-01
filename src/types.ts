export type DashboardTab = "overview" | "candidates" | "assessments";

export type AssessmentStatus = "pending" | "running" | "completed" | "failed";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  score: number;
  lastAssessmentAt: string;
  totalAssessments: number;
}

export interface Assessment {
  id: string;
  candidateId: string;
  startedAt: string;
  completedAt: string | null;
  status: AssessmentStatus;
  skillArea: string;
  score: number | null;
}

export interface OverviewMetric {
  key: string;
  label: string;
  value: number;
  trend: "up" | "down" | "flat";
}

export interface OverviewData {
  metrics: OverviewMetric[];
}

export type LoadStatus = "idle" | "loading" | "success" | "error";

export type Loadable<T> =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: string };

export type ApiResult<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export type EntityWithId = { id: string };

export type Updatable<T extends EntityWithId> = Partial<Omit<T, "id">>;

export type CandidateSummary = Pick<Candidate, "id" | "name" | "score" | "totalAssessments">;

export type CandidateFilter = {
  role: string | null;
  minScore: number | null;
};

export type AssessmentSummary = {
  id: string;
  candidateName: string;
  status: AssessmentStatus;
  skillArea: string;
  score: number | null;
};

export type ApiEntityMap = {
  candidate: Candidate;
  assessment: Assessment;
};

export type ApiEntityName = keyof ApiEntityMap;

export type ApiEntity = ApiEntityMap[ApiEntityName];

export type ResourceKey = `${ApiEntityName}:${string}`;

export type ResourceMap = Record<ResourceKey, unknown>;

export const isCandidate = (value: ApiEntity): value is Candidate => {
  return (value as Candidate).email !== undefined;
};

export const isAssessment = (value: ApiEntity): value is Assessment => {
  return (value as Assessment).skillArea !== undefined;
};
