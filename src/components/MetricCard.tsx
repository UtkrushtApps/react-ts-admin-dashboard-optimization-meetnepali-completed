import React from "react";
import { OverviewMetric } from "../types";

export type MetricCardProps = {
  metric: OverviewMetric;
};

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const color = metric.trend === "up" ? "#16a34a" : metric.trend === "down" ? "#dc2626" : "#6b7280";

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 12,
        minWidth: 140,
        display: "flex",
        flexDirection: "column",
        gap: 4
      }}
    >
      <div style={{ fontSize: 12, color: "#6b7280" }}>{metric.label}</div>
      <div style={{ fontSize: 22, fontWeight: 600 }}>{metric.value}</div>
      <div style={{ fontSize: 11, color }}>Trend: {metric.trend}</div>
    </div>
  );
};
