import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button, TextField } from "@mui/material";

const NewCustomerDialog = ({ visible, handleClose, sendDataToParent }) => {
  console.log(visible);
  const [data, setData] = React.useState({
    Vorname: "",
    Nachname: "",
    Email: "",
  });

  const handleSubmit = () => {
    sendDataToParent(data);
  };

  return (
    <Dialog open={visible} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add new customer</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="vorname"
            value={data.Vorname}
            onChange={(event) =>
              setData({
                ...data,
                Vorname: event.target.value,
              })
            }
            label="Vorname"
            type="text"
            variant="standard"
          />
          <TextField
            margin="dense"
            id="nachname"
            value={data.Nachname}
            onChange={(event) =>
              setData({
                ...data,
                Nachname: event.target.value,
              })
            }
            label="Nachname"
            type="text"
            variant="standard"
          />
          <TextField
            margin="dense"
            id="email"
            value={data.Email}
            onChange={(event) =>
              setData({
                ...data,
                Email: event.target.value,
              })
            }
            label="Email"
            type="text"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewCustomerDialog;
