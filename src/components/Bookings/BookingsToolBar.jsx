import React from "react";
import styles from "./BookingsToolBar.module.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import NewBookingDialog from "./New Booking/NewBookingDialog";
import MyButton from "../BasicControls/MyButton";
import { Box, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const BookingsToolBar = () => {
  const navigate = useNavigate();
  const [newBookingOpen, setNewBookingOpen] = React.useState(false);

  const handleNewBooking = () => {
    setNewBookingOpen(true);
  };

  const handleClose = () => {
    setNewBookingOpen(false);
  };

  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.quickfilter}>
          <MyButton type="secondary">Switch Animal</MyButton>
          <MyButton type="secondary">Switch period</MyButton>
        </Box>
        <Box className={styles.desktopButton}>
          <MyButton type="secondary" icon={<FilterListIcon />}>
            Filter
          </MyButton>
          <MyButton type="primary" icon={<Add />} onClick={handleNewBooking}>
            New Booking
          </MyButton>
        </Box>
        <Box className={styles.mobileButton}>
          <IconButton aria-label="filter">
            <FilterListIcon />
          </IconButton>
          <IconButton aria-label="new booking">
            <Add />
          </IconButton>
        </Box>
      </Box>

      <NewBookingDialog visible={newBookingOpen} callbackClose={handleClose} />
    </>
  );
};

export default BookingsToolBar;
