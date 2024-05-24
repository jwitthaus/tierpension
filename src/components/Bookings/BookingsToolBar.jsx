import React from "react";
import styles from "./BookingsToolBar.module.css";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Unstable_Grid2";
import FilterListIcon from "@mui/icons-material/FilterList";
import NewBookingDialog from "./New Booking/NewBookingDialog";
import MyButton from "../BasicControls/MyButton";

const BookingsToolBar = () => {
  const [newBookingOpen, setNewBookingOpen] = React.useState(false);

  const handleNewBooking = () => {
    setNewBookingOpen(true);
  };

  const handleClose = () => {
    setNewBookingOpen(false);
  };

  return (
    <div className={styles.toolbar}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid container spacing={2}>
          <Grid>
            <MyButton type="secondary">Switch animal</MyButton>
          </Grid>
          <Grid>
            <MyButton type="secondary">Switch period</MyButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid>
            <MyButton type="secondary" icon={<FilterListIcon />}>
              Filter
            </MyButton>
          </Grid>
          <Grid>
            <MyButton
              type="primary"
              icon={<AddIcon />}
              onClick={handleNewBooking}
            >
              New Booking
            </MyButton>
          </Grid>
        </Grid>
      </Grid>
      <NewBookingDialog visible={newBookingOpen} handleClose={handleClose} />
    </div>
  );
};

export default BookingsToolBar;
