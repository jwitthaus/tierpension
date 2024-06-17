import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { QueryClient, useQuery } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FilterContext } from "./components/Bookings/Toolbar/FilterProvider";
import Navbar from "./components/Navbar/Navbar";
import Billing from "./pages/Billing";
import Bookings from "./pages/Bookings";
import CalendarPage from "./pages/CalendarPage";
import ErrorPage from "./pages/ErrorPage";

const queryClient = new QueryClient();

export default function Pages(props) {
  const [bookings, setBookings] = useState([]);
  const { searchTerm } = useContext(FilterContext);

  const { isLoading, data } = useQuery(
    ["bookings-with-customers", searchTerm],
    () => {
      return axios.get(
        `http://localhost:8081/bookingsWithCustomers?search=${searchTerm}`
      );
    }
  );

  const groupBookings = (input) => {
    //statt bookings hier im code zu gruppieren, Vorschlag von Papa:
    //erst werden aus der DB die Monatsgruppen abgefragt
    //diese werden dann per forEach durchiteriert und die jeweiligen Buchungen aus der Datenbank abgefragt
    let grouped = [];
    let monthIterator = "";

    input.forEach((element) => {
      let group = format(new Date(element.Beginn_Datum), "MMMM yy");
      if (group !== monthIterator) {
        //noch keine Gruppe für den Monat
        //--> Gruppe erzeugen
        let obj = {};
        obj.title = group;
        obj.bookings = input.filter(
          (booking) =>
            format(new Date(booking.Beginn_Datum), "MMMM yy") === group
          //&& differenceInCalendarDays(booking.Ende_Datum, timelineStart) >= 0 // this should be part of the sql query to get only current bookings
        );
        grouped.push(obj);

        monthIterator = group;
      }
    });

    return grouped;
  };

  useEffect(() => {
    if (data) {
      const groupData = groupBookings(data.data);
      setBookings(groupData);
    }
  }, [data]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toolbar />
        <Routes>
          <Route index element={<Bookings />} />
          <Route path="/bookings" element={<Bookings data={bookings} />} />
          <Route
            path="/calendar"
            element={<CalendarPage data={data?.data} />}
          />
          <Route path="/billing" element={<Billing />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
