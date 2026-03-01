import React from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { DashboardProvider, useDashboardContext } from "./context/DashboardContext";
import { OverviewPage } from "./pages/OverviewPage";
import { CandidatesPage } from "./pages/CandidatesPage";
import { AssessmentsPage } from "./pages/AssessmentsPage";
import { DashboardTab } from "./types";

const TabNavigation: React.FC = () => {
  const location = useLocation();
  const { activeTab, setActiveTab } = useDashboardContext();

  const inferTabFromPath = (pathname: string): DashboardTab => {
    if (pathname.startsWith("/candidates")) {
      return "candidates";
    }
    if (pathname.startsWith("/assessments")) {
      return "assessments";
    }
    return "overview";
  };

  const currentTab = inferTabFromPath(location.pathname);

  if (currentTab !== activeTab) {
    setActiveTab(currentTab);
  }

  return (
    <nav style={{ display: "flex", gap: 12, padding: 16, borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ fontWeight: activeTab === "overview" ? 700 : 400 }}>Overview</Link>
      <Link to="/candidates" style={{ fontWeight: activeTab === "candidates" ? 700 : 400 }}>Candidates</Link>
      <Link to="/assessments" style={{ fontWeight: activeTab === "assessments" ? 700 : 400 }}>Assessments</Link>
    </nav>
  );
};

const AppShell: React.FC = () => {
  const { lastUpdated } = useDashboardContext();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh" }}>
      <header style={{ padding: 16, borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20 }}>Utkrusht Admin Dashboard</h1>
          <p style={{ margin: 0, fontSize: 12 }}>Proof-of-skills marketplace operations overview</p>
        </div>
        <div style={{ fontSize: 12 }}>Last updated: {lastUpdated}</div>
      </header>
      <TabNavigation />
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DashboardProvider>
      <AppShell />
    </DashboardProvider>
  );
};

export default App;
