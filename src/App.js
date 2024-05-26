import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Billing from "./pages/Billing";
import ErrorPage from "./pages/ErrorPage";

export default function App(props) {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toolbar />
        <Routes>
          <Route index element={<Bookings />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
