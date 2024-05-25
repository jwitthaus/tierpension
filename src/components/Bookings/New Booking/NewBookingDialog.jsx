import React, { Fragment } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import CustomerSearch from "./CustomerSearch";

import { useState } from "react";
import axios from "axios";

const NewBookingDialog = ({ visible, callbackClose }) => {
  const randomIdInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [newCustomer, setNewCustomer] = useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = useState({
    id: randomIdInRange(1, 20),
    vorname: "",
    nachname: "",
    email: "",
  });

  const showNewCustomer = () => {
    setNewCustomer(true);
  };

  const handleClose = () => {
    setNewCustomer(false);
    callbackClose();
  };

  const handleCustomerSelected = (data) => {
    setSelectedCustomerData({
      ...selectedCustomerData,
      id: randomIdInRange(1, 20),
      vorname: data.Vorname,
      nachname: data.Nachname,
      email: data.Email,
    });
  };

  const handleChange = (e) => {
    setSelectedCustomerData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      await axios.post("http://localhost:8081/customers", selectedCustomerData);
      //handleClose();
    } catch (error) {
      console.log(error);
    }
  };
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
        onClose={callbackClose}
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
          <DialogContentText>
            To create a new booking, please enter your name.
          </DialogContentText>
          {!newCustomer ? (
            <CustomerSearch
              handleNewCustomerSelected={showNewCustomer}
              handleCustomerSelected={handleCustomerSelected}
            />
          ) : (
            <Fragment>
              <TextField
                autoFocus
                margin="dense"
                id="vorname"
                name="vorname"
                label="Vorname"
                type="text"
                onChange={handleChange}
                variant="standard"
              />
              <TextField
                margin="dense"
                id="nachname"
                name="nachname"
                label="Nachname"
                type="text"
                onChange={handleChange}
                variant="standard"
              />
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="text"
                onChange={handleChange}
                variant="standard"
              />
            </Fragment>
          )}
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
