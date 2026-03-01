import React from "react";
import { CandidateSummary } from "../types";
import { CandidateRow } from "./CandidateRow";

export type CandidateTableProps = {
  candidates: CandidateSummary[];
  highlightThreshold: number;
};

export const CandidateTable: React.FC<CandidateTableProps> = ({ candidates, highlightThreshold }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Name</th>
          <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Score</th>
          <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Assessments</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate) => (
          <CandidateRow key={candidate.id} candidate={candidate} highlightThreshold={highlightThreshold} />
        ))}
      </tbody>
    </table>
  );
};
