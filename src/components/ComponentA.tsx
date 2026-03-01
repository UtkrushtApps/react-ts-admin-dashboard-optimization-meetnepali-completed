import React from "react";
import { OverviewMetric } from "../types";
import { MetricCard } from "./MetricCard";

export type ComponentAProps = {
  metrics: OverviewMetric[];
};

// OPT-1: React.memo prevents re-renders when metrics prop hasn't changed
export const ComponentA: React.FC<ComponentAProps> = React.memo(({ metrics }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {metrics.map((metric) => (
        <MetricCard key={metric.key} metric={metric} />
      ))}
    </div>
  );
});
