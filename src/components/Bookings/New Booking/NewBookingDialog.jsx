import React, { Fragment } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField, createFilterOptions } from "@mui/material";
import CustomerSearch from "./CustomerSearch";

const filter = createFilterOptions();

const NewBookingDialog = ({ visible, callbackClose }) => {
  const [newCustomer, setNewCustomer] = React.useState(false);
  const [selectedCustomerData, setSelectedCustomerData] = React.useState({
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
      vorname: data.Vorname,
      nachname: data.Nachname,
      email: data.Email,
    });
  };

  const handleSubmit = (data) => {
    if (newCustomer) {
      /*wenn ein neuer Kunde angelegt wurde, dann muss hier der neue Datenbankeintrag für Kunde angelegt werden 
      und dann erst die Buchung angelegt werden*/
      console.log("new " + data.vorname);
      const vorname = data.vorname;
      const nachname = data.nachname;
      const email = data.email;
      handleClose();
    } else {
      /*wenn ein vorhandener Kund selektiert wurde kann direkt eine Buchung mit dem Kunden erzeugt werden
      Die Daten für den ausgewählten Kunden sind in selectedCustomerData enthalten. 
      Aber Vorsicht! Ein neuer Kunde wird nicht in der Variable gepflegt*/
    }
  };

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
                variant="standard"
              />
              <TextField
                margin="dense"
                id="nachname"
                name="nachname"
                label="Nachname"
                type="text"
                variant="standard"
              />
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="text"
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
