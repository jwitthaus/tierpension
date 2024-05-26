import React from "react";
import styles from "./Bookings.module.css";
import BookingsToolbar from "../components/Bookings/BookingsToolBar";
import Timeline from "../components/Bookings/Timeline/Timeline";
import CustomerList from "../components/Bookings/CustomerList/CustomerList";

import { Box, Container, Toolbar } from "@mui/material";
import BarchartNegative from "../components/Bookings/Capacity/BarcharNegative";
import BookingListItem from "../components/BasicControls/BookingListItem";

const Bookings = () => {
  return (
    /*<Box
      width="100%"
      height="800px"
      display="grid"
      gridTemplateColumns="260px auto"
      gridTemplateRows="100px auto 100px"
      gridAutoRows="150px"
      gap="5px"
    >
      <BookingsToolbar gridColumn="1 / 3" gridRow="1 / 2"/>

      <CustomerList gridColumn="1 / 2" gridRow="2 / 3" bgcolor="gray" />
      <Timeline gridColumn="2 / 3" gridRow="2 / 3" bgcolor="gray" />

      <Capacity gridColumn="1 / 3" gridRow="3 / 4" bgcolor="gray" />
    </Box>*/
    <Box className={styles.container}>
      <BookingsToolbar className={styles.header} />
      <BookingListItem />
      <Box className={styles.main}>
        <CustomerList className={styles.nav} />
        <Box className={styles.charts}>
          <BarchartNegative className={styles.footer} />
          <Container className={styles.scalefix}>
            <Timeline className={styles.timeline} />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Bookings;
