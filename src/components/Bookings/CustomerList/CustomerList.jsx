import { Box, ListSubheader } from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import BookingListItem from "../../BasicControls/BookingListItem";
import Searchbar from "../Searchbar";
import BookingsToolBar from "../Toolbar/BookingsToolBar";
import styles from "./CustomerList.module.css";

export default function CustomerList() {
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
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader>{`KW ${sectionId + 1} / 2024`}</ListSubheader>
              {[0, 1, 2].map((item) => (
                <BookingListItem
                  key={`item-${sectionId}-${item}`}
                  newItem="true"
                  animal="cat"
                  medication="true"
                  intolerance="true"
                  label="Witthaus, Jörg"
                />
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Box>
  );
}
