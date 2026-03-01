import React, { useState } from "react";
import { useDashboardContext } from "../context/DashboardContext";
import { useResource } from "../hooks/useCustomHook";
import { fetchCandidates } from "../api/client";
import { CandidateFilter, CandidateSummary } from "../types";
import { CandidateTable } from "../components/CandidateTable";
import { filterCandidates, toCandidateSummaries } from "../utils/helpers";

export const CandidatesPage: React.FC = () => {
  const { candidates: contextCandidates } = useDashboardContext();
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [minScore, setMinScore] = useState<string>("");

  const filter: CandidateFilter = {
    role: roleFilter.length > 0 ? roleFilter : null,
    minScore: minScore.length > 0 ? Number(minScore) : null
  };

  const { data: fetchedCandidates, loading, error } = useResource<readonly CandidateSummary[], []>(
    "candidates-page",
    async () => {
      const allCandidates = contextCandidates.length > 0 ? contextCandidates : await fetchCandidates();
      const filtered = filterCandidates(allCandidates, filter);
      const summaries = toCandidateSummaries(filtered);
      return summaries;
    },
    []
  );

  const fallbackCandidates: CandidateSummary[] = toCandidateSummaries(filterCandidates(contextCandidates, filter));
  const candidatesToShow: CandidateSummary[] = (fetchedCandidates as CandidateSummary[] | null) || fallbackCandidates;

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
        {loading && <div>Loading candidates...</div>}
        {error && <div style={{ color: "#dc2626" }}>Error loading candidates: {error}</div>}
        <CandidateTable candidates={candidatesToShow} highlightThreshold={70} />
      </section>
    </div>
  );
};
