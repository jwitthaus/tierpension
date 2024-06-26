import { Box, ListSubheader } from "@mui/material";
import List from "@mui/material/List";
import React, { useContext } from "react";
import BookingListItem from "../../BasicControls/BookingListItem";
import styles from "./CustomerList.module.css";
import { TimelineSettingsContext } from "../Timeline/TimelineSettingsProvider";

export default function CustomerList({ itemClickedCallback }) {
  const { groupedBookings } = useContext(TimelineSettingsContext);

  return (
    <Box>
      <List
        className={styles.customerList}
        sx={{
          height: "100%",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {groupedBookings.map((sectionId) => (
          <li key={sectionId.title}>
            <ul>
              <ListSubheader
                sx={{
                  color: "#bbbbbb",
                  fontSize: "small",
                  height: "30px",
                  lineHeight: "30px",
                }}
              >
                {sectionId.title}
              </ListSubheader>
              {sectionId.bookings.map((booking) => {
                const bookingState = booking.BuchStatus_ID;

                return (
                  <BookingListItem
                    key={booking.LfdNr}
                    newItem={bookingState === 60 ? true : false}
                    animal="cat"
                    medication="true"
                    intolerance="true"
                    label={booking.NameIntern}
                    onClick={() => itemClickedCallback(booking)}
                  />
                );
              })}
            </ul>
          </li>
        ))}
      </List>
    </Box>
  );
}

/*return (
    <Box>
      <List
        className={styles.customerList}
        sx={{
          height: "100%",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {props.data.map((booking) => (
          <li key={booking.LfdNr}>
            <ul>
              <BookingListItem
                key={booking.LfdNr}
                newItem="true"
                animal="cat"
                medication="true"
                intolerance="true"
                label={booking.NameIntern}
                onClick={() => props.scrollToDateCallback(booking.Beginn_Datum)}
              />
            </ul>
          </li>
        ))}
      </List>
    </Box>
  );*/
