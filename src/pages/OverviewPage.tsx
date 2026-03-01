import React from "react";
import { useDashboardContext } from "../context/DashboardContext";
import { ComponentA } from "../components/ComponentA";
import { useResource } from "../hooks/useCustomHook";
import { fetchOverviewData } from "../api/client";
import { OverviewData } from "../types";

export const OverviewPage: React.FC = () => {
  const { overviewData } = useDashboardContext();

  const { data, loading, error } = useResource<OverviewData, []>(
    "overview",
    fetchOverviewData,
    []
  );

  const primaryMetrics = overviewData || data || null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <section>
        <h2 style={{ marginBottom: 8 }}>Above-the-fold summary</h2>
        {primaryMetrics ? (
          <ComponentA metrics={primaryMetrics.metrics} />
        ) : (
          <div>Loading primary overview metrics...</div>
        )}
      </section>
      <section>
        <h3 style={{ marginBottom: 8 }}>Background refresh</h3>
        {loading && <div>Refreshing overview data...</div>}
        {error && <div style={{ color: "#dc2626" }}>Error loading overview: {error}</div>}
        {!loading && !error && !primaryMetrics && <div>No overview data available.</div>}
      </section>
    </div>
  );
};
