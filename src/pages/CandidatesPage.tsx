import React, { useMemo, useState } from "react";
import { useDashboardContext } from "../context/DashboardContext";
import { CandidateFilter, CandidateSummary } from "../types";
import { CandidateTable } from "../components/CandidateTable";
import { filterCandidates, toCandidateSummaries } from "../utils/helpers";

export const CandidatesPage: React.FC = () => {
  const { candidates: contextCandidates, candidatesLoading, candidatesError } = useDashboardContext();
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [minScore, setMinScore] = useState<string>("");

  // OPT-4: stable filter object — only recreated when actual values change
  const filter = useMemo<CandidateFilter>(
    () => ({
      role: roleFilter.length > 0 ? roleFilter : null,
      minScore: minScore.length > 0 ? Number(minScore) : null
    }),
    [roleFilter, minScore]
  );

  // BUG-2 + OPT-3: reactive filtering with memoization — runs only when inputs change
  // PERF-2: no useResource / double-fetch — context data is used directly
  const candidatesToShow = useMemo<CandidateSummary[]>(
    () => toCandidateSummaries(filterCandidates(contextCandidates, filter)),
    [contextCandidates, filter]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <section style={{ display: "flex", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 12 }}>Role</label>
          <input
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            placeholder="Filter by role"
            style={{ padding: 4, fontSize: 12 }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12 }}>Minimum score</label>
          <input
            value={minScore}
            onChange={(event) => setMinScore(event.target.value)}
            placeholder="Min score"
            style={{ padding: 4, fontSize: 12 }}
          />
        </div>
      </section>
      <section>
        {candidatesLoading && <div>Loading candidates...</div>}
        {candidatesError && <div style={{ color: "#dc2626" }}>Error loading candidates: {candidatesError}</div>}
        <CandidateTable candidates={candidatesToShow} highlightThreshold={70} />
      </section>
    </div>
  );
};
