import React from 'react'
import styles from './BookingsToolBar.module.css'
import AddIcon from '@mui/icons-material/Add';
import { Button, Toolbar } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import FilterListIcon from '@mui/icons-material/FilterList';
import PrimaryButton from '../BasicControls/PrimaryButton';
import SecondaryButton from '../BasicControls/SecondaryButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BookingsToolBar = () => {
  const [newBookingOpen, setOpen] = React.useState(false);

  const handleNewBooking = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.toolbar}>
      <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
        <Grid container spacing={2}>
          <Grid><SecondaryButton label="Switch animal"/></Grid>
          <Grid><SecondaryButton label="Switch period"/></Grid>
        </Grid>
        <Grid container spacing={2}>
        <Grid><SecondaryButton label="Filter" icon={<FilterListIcon/>}/></Grid>
          <Grid><PrimaryButton label="New Booking" icon={<AddIcon/>} onClick={handleNewBooking}/></Grid>
        </Grid>
        </Grid>

        <Dialog
        open={newBookingOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData).entries());
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
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="lastName"
            label="Last name"
            type="lastName"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="firstName"
            label="First name"
            type="firstName"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Book</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BookingsToolBar