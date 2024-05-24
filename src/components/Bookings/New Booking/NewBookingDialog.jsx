import React, { Fragment } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, createFilterOptions } from "@mui/material";
import CustomerSearch from "./CustomerSearch";

const filter = createFilterOptions();

const NewBookingDialog = ({ visible, handleClose }) => {
  const handleSubmit = () => {};

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
        <form onSubmit={handleSubmit}>
          <DialogTitle>New Booking</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new booking, please enter your name.
            </DialogContentText>
            <CustomerSearch />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Book</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default NewBookingDialog;
