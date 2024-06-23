import { CssBaseline } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Pages from "./pages/Pages";
import { FilterProvider } from "./components/Bookings/Toolbar/FilterProvider";
import { TimelineSettingsProvider } from "./components/Bookings/Timeline/TimelineSettingsProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <FilterProvider>
          <TimelineSettingsProvider>
            <Pages />
          </TimelineSettingsProvider>
        </FilterProvider>
      </QueryClientProvider>
    </>
  );
}
