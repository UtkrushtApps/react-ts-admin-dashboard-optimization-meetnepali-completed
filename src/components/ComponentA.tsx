import React from "react";
import { OverviewMetric } from "../types";
import { MetricCard } from "./MetricCard";

export type ComponentAProps = {
  metrics: OverviewMetric[];
};

export const ComponentA: React.FC<ComponentAProps> = ({ metrics }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {metrics.map((metric) => (
        <MetricCard key={metric.key} metric={metric} />
      ))}
    </div>
  );
};
