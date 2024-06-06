import { Box, ListSubheader } from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import BookingListItem from "../../BasicControls/BookingListItem";
import styles from "./CustomerList.module.css";

export default function CustomerList(props) {
  /*useEffect(() => {
    fetch("http://localhost:8081/customers")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);*/

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
        {props.data.map((sectionId) => (
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
              {sectionId.bookings.map((booking) => (
                <BookingListItem
                  key={`${sectionId.title}-${booking.dayStart}`}
                  newItem="true"
                  animal="cat"
                  medication="true"
                  intolerance="true"
                  label={`${booking.lastName}, ${booking.firstName}`}
                  onClick={() => props.scrollToDateCallback(booking.dayStart)}
                />
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Box>
  );
}
