import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DashboardTab, OverviewData, Candidate } from "../types";
import { fetchOverviewData, fetchCandidates } from "../api/client";

export type DashboardContextValue = {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  overviewData: OverviewData | null;
  overviewLoading: boolean;
  overviewError: string | null;
  candidates: Candidate[];
  candidatesLoading: boolean;
  candidatesError: string | null;
  refreshCandidates: () => void;
  refreshOverview: () => void;
};

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export type DashboardProviderProps = {
  children: ReactNode;
};

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [overviewLoading, setOverviewLoading] = useState<boolean>(false);
  const [overviewError, setOverviewError] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidatesLoading, setCandidatesLoading] = useState<boolean>(false);
  const [candidatesError, setCandidatesError] = useState<string | null>(null);

  const loadOverview = useCallback(() => {
    setOverviewLoading(true);
    setOverviewError(null);
    fetchOverviewData()
      .then(setOverviewData)
      .catch((err: unknown) => {
        setOverviewError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => setOverviewLoading(false));
  }, []);

  const loadCandidates = useCallback(() => {
    setCandidatesLoading(true);
    setCandidatesError(null);
    fetchCandidates()
      .then(setCandidates)
      .catch((err: unknown) => {
        setCandidatesError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => setCandidatesLoading(false));
  }, []);

  // PERF-1: fetch once on mount only, not on every tab switch
  useEffect(() => {
    loadOverview();
    loadCandidates();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo<DashboardContextValue>(
    () => ({
      activeTab,
      setActiveTab,
      overviewData,
      overviewLoading,
      overviewError,
      candidates,
      candidatesLoading,
      candidatesError,
      refreshCandidates: loadCandidates,
      refreshOverview: loadOverview,
    }),
    [activeTab, overviewData, overviewLoading, overviewError, candidates, candidatesLoading, candidatesError, loadCandidates, loadOverview]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = (): DashboardContextValue => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("DashboardContext is not available");
  }
  return ctx;
};
