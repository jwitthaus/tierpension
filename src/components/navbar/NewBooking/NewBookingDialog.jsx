import React, { Fragment, useEffect } from "react";

import { Box, Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import "dayjs/locale/de";
import { useState } from "react";
import Capacity from "../../Bookings/Capacity/Capacity";
import CustomerSearch from "./CustomerSearch";

const NewBookingDialog = ({ visible, callbackClose }) => {
  const [createNewCustomer, setCreateNewCustomer] = useState(false);
  const newCustomer = {
    Vorname: "",
    Nachname: "",
    NameIntern: "",
    Mail: "",
  };
  const newBooking = {
    Kunden_ID: null,
    Tier_ID: null,
    Beginn_Datum: "2024-06-18 00:00:00",
    Ende_Datum: "2024-06-18 00:00:00",
  };

  const showNewCustomer = () => {
    setCreateNewCustomer(true);
  };

  const handleClose = () => {
    setCreateNewCustomer(false);
    //setStartDate(null);
    //setEndDate(null);
    callbackClose();
  };

  const handleCustomerSelected = (data) => {
    newBooking.Kunden_ID = data.Nummer;
  };

  const handleChange = (e) => {
    newCustomer[e.target.name] = e.target.value;
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();
    if (createNewCustomer) {
      try {
        await axios
          .post("http://localhost:8081/customers", newCustomer)
          .then((response) => {
            //Kunden ID of added customer
            //console.log(response.data.insertId);
            newBooking.Kunden_ID = response.data.insertId;
            console.log("post new booking: " + newBooking.Kunden_ID);
          });
      } catch (error) {
        console.log(error);
      }
    }
    /*try {
      await console.log(
        axios.post("http://localhost:8081/bookings", newBooking)
      );
      //handleClose();
    } catch (error) {
      console.log(error);
    }*/
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function periodSet() {
    return startDate && endDate;
  }

  /*
  const handleSubmit = (data) => {
    if (newCustomer) {
      //wenn ein neuer Kunde angelegt wurde, dann muss hier der neue Datenbankeintrag für Kunde angelegt werden 
      //und dann erst die Buchung angelegt werden
      fetch("http://localhost:8081/customers", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: 3, //--> this id later needs to be generated in the database
          Vorname: data.vorname,
          Nachname: data.nachname,
          Email: data.email,
        }),
      })
        .then(() => {
          console.log("new customer added");
        })
        .then((response) => response.json())
        .then((responseData) => {
          window.alert(responseData);
          //Do anything else like Toast etc.
          console.log("success alert in frontend");
        });

      handleClose();
    } else {
      //wenn ein vorhandener Kund selektiert wurde kann direkt eine Buchung mit dem Kunden erzeugt werden
      //Die Daten für den ausgewählten Kunden sind in selectedCustomerData enthalten. 
      //Aber Vorsicht! Ein neuer Kunde wird nicht in der Variable gepflegt
    }
  };*/

  return (
    <Fragment>
      <Dialog
        open={visible}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            handleSubmit(formJson);
          },
        }}
      >
        <DialogTitle>New Booking</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {!createNewCustomer ? (
              <CustomerSearch
                required
                handleNewCustomerSelected={showNewCustomer}
                handleCustomerSelected={handleCustomerSelected}
              />
            ) : (
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  required
                  sx={{ flex: 1, minWidth: "150px" }}
                  autoFocus
                  margin="dense"
                  id="vorname"
                  name="Vorname"
                  label="First name"
                  type="text"
                  onChange={handleChange}
                  variant="standard"
                />
                <TextField
                  required
                  sx={{ flex: 1, minWidth: "150px" }}
                  margin="dense"
                  id="nachname"
                  name="Nachname"
                  label="Last name"
                  type="text"
                  onChange={handleChange}
                  variant="standard"
                />
                <TextField
                  required
                  sx={{ flex: 1, minWidth: "150px" }}
                  margin="dense"
                  id="email"
                  name="Mail"
                  label="Email"
                  type="text"
                  onChange={handleChange}
                  variant="standard"
                />
              </Box>
            )}
            <Box>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="de"
              >
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <DatePicker
                    required
                    id="startDate"
                    name="startDate"
                    disablePast
                    maxDate={endDate}
                    sx={{ flex: 1, minWidth: "150px" }}
                    label="Start day"
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                  <DatePicker
                    required
                    id="endDate"
                    name="endDate"
                    disablePast
                    minDate={startDate}
                    sx={{ flex: 1, minWidth: "150px" }}
                    label="End day"
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
            {periodSet() ? (
              <Capacity timelineStart={startDate} timelineEnd={endDate} />
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Book</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default NewBookingDialog;