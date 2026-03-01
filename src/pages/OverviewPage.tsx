import React from "react";
import { useDashboardContext } from "../context/DashboardContext";
import { ComponentA } from "../components/ComponentA";

// PERF-2: removed duplicate useResource(fetchOverviewData) — context already fetches this data
export const OverviewPage: React.FC = () => {
  const { overviewData, overviewLoading, overviewError } = useDashboardContext();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <section>
        <h2 style={{ marginBottom: 8 }}>Above-the-fold summary</h2>
        {overviewData ? (
          <ComponentA metrics={overviewData.metrics} />
        ) : (
          <div>Loading primary overview metrics...</div>
        )}
      </section>
      <section>
        <h3 style={{ marginBottom: 8 }}>Background refresh</h3>
        {overviewLoading && <div>Refreshing overview data...</div>}
        {overviewError && <div style={{ color: "#dc2626" }}>Error loading overview: {overviewError}</div>}
        {!overviewLoading && !overviewError && !overviewData && <div>No overview data available.</div>}
      </section>
    </div>
  );
};
