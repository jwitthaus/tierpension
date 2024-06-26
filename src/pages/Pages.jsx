import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Bookings from "./Bookings";
import CalendarPage from "./CalendarPage";
import ErrorPage from "./ErrorPage";

export default function Pages() {
  const [holidayData, setHolidayData] = useState([]);
  useEffect(() => {
    const fetchAllHolidays = async () => {
      try {
        const res = await axios.get("http://localhost:8081/holidays");
        setHolidayData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllHolidays();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toolbar />
        <Routes>
          <Route index element={<Bookings />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route
            path="/calendar"
            element={<CalendarPage holidays={holidayData} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
