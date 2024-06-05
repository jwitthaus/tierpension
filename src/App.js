import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bookings from "./pages/Bookings";
import CalendarPage from "./pages/CalendarPage";
import Billing from "./pages/Billing";
import ErrorPage from "./pages/ErrorPage";
import { CssBaseline } from "@mui/material";

export default function App(props) {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Toolbar />
        <Routes>
          <Route index element={<Bookings />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
