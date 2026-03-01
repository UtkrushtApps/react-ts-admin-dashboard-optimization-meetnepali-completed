import React from "react";
import { CandidateSummary } from "../types";

export type CandidateRowProps = {
  candidate: CandidateSummary;
  highlightThreshold: number;
};

export const CandidateRow: React.FC<CandidateRowProps> = ({ candidate, highlightThreshold }) => {
  const highlight = candidate.score >= highlightThreshold;

  return (
    <tr style={{ backgroundColor: highlight ? "#ecfdf5" : "transparent" }}>
      <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>{candidate.name}</td>
      <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>{candidate.score}</td>
      <td style={{ padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>{candidate.totalAssessments}</td>
    </tr>
  );
};
