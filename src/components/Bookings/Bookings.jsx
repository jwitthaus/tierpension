import React from "react";
import styles from "./Bookings.module.css";
import BookingsToolbar from "./BookingsToolBar";
import Timeline from "./Timeline/Timeline";
import Capacity from "./Capacity/Capacity";
import CustomerList from "./CustomerList/CustomerList";

import { Box } from "@mui/material";

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
      <BookingsToolbar className={styles.toolbar} />
      <Box className={styles.bookingoverview}>
        <CustomerList className={styles.customerList} />
        <Timeline className={styles.timeline} />
      </Box>
      <Capacity className={styles.capacity} />
    </Box>
  );
};

export default Bookings;
