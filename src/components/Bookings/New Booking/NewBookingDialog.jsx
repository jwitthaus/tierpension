import React, { Fragment } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField, createFilterOptions } from "@mui/material";
import CustomerSearch from "./CustomerSearch";

const filter = createFilterOptions();

const NewBookingDialog = ({ visible, handleClose }) => {
  const [newCustomer, setNewCustomer] = React.useState(false);

  const showNewCustomer = () => {
    setNewCustomer(true);
  };

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
            const lastName = formJson.lastName;
            const firstName = formJson.firstName;
            console.log(lastName);
            console.log(firstName);
            handleClose();
          },
        }}
      >
        <DialogTitle>New Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new booking, please enter your name.
          </DialogContentText>
          {!newCustomer ? (
            <CustomerSearch handleNewCustomerSelected={showNewCustomer} />
          ) : (
            <Fragment>
              <TextField
                autoFocus
                margin="dense"
                id="vorname"
                label="Vorname"
                type="text"
                variant="standard"
              />
              <TextField
                margin="dense"
                id="nachname"
                label="Nachname"
                type="text"
                variant="standard"
              />
              <TextField
                margin="dense"
                id="email"
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
