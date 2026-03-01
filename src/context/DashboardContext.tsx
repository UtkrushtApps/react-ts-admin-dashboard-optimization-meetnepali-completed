import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { DashboardTab, OverviewData, Candidate } from "../types";
import { fetchOverviewData, fetchCandidates } from "../api/client";

export type DashboardContextValue = {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  lastUpdated: string;
  overviewData: OverviewData | null;
  setOverviewData: (data: OverviewData | null) => void;
  candidates: Candidate[];
  setCandidates: (candidates: Candidate[]) => void;
};

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export type DashboardProviderProps = {
  children: ReactNode;
};

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLastUpdated(new Date().toISOString());
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    fetchOverviewData().then((data) => {
      setOverviewData(data);
    });
    fetchCandidates().then((data) => {
      setCandidates(data);
    });
  }, [activeTab]);

  const value: DashboardContextValue = {
    activeTab,
    setActiveTab,
    lastUpdated,
    overviewData,
    setOverviewData,
    candidates,
    setCandidates
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = (): DashboardContextValue => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("DashboardContext is not available");
  }
  return ctx;
};
