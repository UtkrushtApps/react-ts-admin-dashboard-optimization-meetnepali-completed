### Task Overview
The current project is an internal multi-tab admin dashboard for a proof-of-skills marketplace. It shows an overview of assessments, candidate activity, and system metrics across several tabs, each composed of multiple data-driven widgets backed by simulated API calls. The application is fully functional and type-safe, but it suffers from performance issues under realistic load: many redundant API calls are fired from multiple places, large component trees re-render frequently, list views feel sluggish, and tab switching triggers work for off-screen sections. The business needs this dashboard to feel responsive for operations teams who frequently switch tabs and filter data, so your focus is on end-to-end performance optimization that requires architectural thinking about data flow, state placement, and render behavior. This is a 30–45 minute optimization task where you will analyze the existing implementation and apply multiple interconnected improvements, without altering the visible behavior of the app.

### Helpful Tips
- Consider how often different widgets trigger data fetching and whether the same data is requested multiple times from different places.
- Explore how to reduce redundant network calls by introducing simple caching or deduplication of in-flight requests.
- Review the way list data is processed and rendered and analyze whether expensive or repeated requests run more often than needed.
- Consider when components re-render even though their visible data has not changed, and how this cascades through child components.
- Think about how React's memoization primitives can provide stable references and memoized values to reduce render work.
- Think about how context provider values are created and how that affects all consumers when any part of the value changes.
- Consider the relationship between the active tab, the router, and the dashboard context, and when state updates cause global re-renders or refetches.
- Think about where state is stored today and whether some state can be colocated closer to where it is used to avoid unnecessary updates.
- Think about how custom hooks encapsulate fetching and how their dependency arrays affect when fetches run.

### Objectives
- Refactor API call patterns to eliminate redundancy and move toward more efficient caching or deduplication strategies; analyze where the same data is requested from multiple places or where list-style data leads to repeated or costly request patterns.
- Implement strategic memoization across components, hooks, and utility functions on critical rendering paths; optimize context providers so that consumers only re-render when their relevant data actually changes.
- Optimize state and data-flow patterns so that tab switches and filter updates do not trigger unnecessary fetches or cascading updates; consider where state lives and how hook dependencies affect when work runs.

### How to Verify
- Use the browser Network tab to observe API call patterns, verifying that redundant or duplicate requests have been reduced.
- Use the React DevTools Profiler to compare render frequency and render duration for key components before and after your changes.
- Interact with all tabs and UI features (including rapid tab switching and filter changes) and confirm that navigation and filtering feel more responsive.
- Verify that all existing functionality, including navigation, data display, and filtering, still behaves exactly as before.
- Confirm that the TypeScript compiler still reports no errors or warnings under strict mode after your refactors.
- Compare API call counts per interaction and render counts per user action before and after your optimizations.