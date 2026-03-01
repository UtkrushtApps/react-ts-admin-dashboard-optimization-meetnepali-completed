import React from "react";
import { useResource } from "../hooks/useCustomHook";
import { fetchAssessments, fetchCandidates } from "../api/client";
import { Assessment, AssessmentSummary, Candidate } from "../types";

// BUG-1: build a Map from the already-fetched candidates list — zero extra API calls
const mapAssessmentsToSummaries = (
  assessments: Assessment[],
  candidates: Candidate[]
): AssessmentSummary[] => {
  const candidateMap = new Map(candidates.map((c) => [c.id, c]));
  return assessments.map((assessment) => {
    const candidate = candidateMap.get(assessment.candidateId);
    return {
      id: assessment.id,
      candidateName: candidate ? candidate.name : "Unknown",
      status: assessment.status,
      skillArea: assessment.skillArea,
      score: assessment.score
    };
  });
};

export const AssessmentsPage: React.FC = () => {
  const { data, loading, error, refetch } = useResource<AssessmentSummary[], []>(
    "assessments-page",
    async () => {
      // Fetch both in parallel — one round-trip instead of 1800+ sequential awaits
      const [assessments, candidates] = await Promise.all([fetchAssessments(), fetchCandidates()]);
      return mapAssessmentsToSummaries(assessments, candidates);
    },
    []
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Assessments</h2>
        <button style={{ padding: "4px 8px", fontSize: 12 }} onClick={refetch}>
          Refresh
        </button>
      </section>
      <section>
        {loading && <div>Loading assessments...</div>}
        {error && <div style={{ color: "#dc2626" }}>Error loading assessments: {error}</div>}
        {!loading && !error && data && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Candidate</th>
                <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Skill Area</th>
                <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Status</th>
                <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>{item.candidateName}</td>
                  <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>{item.skillArea}</td>
                  <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>{item.status}</td>
                  <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>{item.score ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};
