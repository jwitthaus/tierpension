import { CssBaseline } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { TimelineSettingsProvider } from "./components/Bookings/Timeline/TimelineSettingsProvider";
import { FilterProvider } from "./components/Bookings/Toolbar/FilterProvider";
import Pages from "./pages/Pages";

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
