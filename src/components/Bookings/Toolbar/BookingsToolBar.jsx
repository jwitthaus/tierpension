import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, IconButton } from "@mui/material";
import React from "react";
import Searchbar from "../Searchbar";
import styles from "./BookingsToolBar.module.css";
import FilterPanel from "./FilterPanel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const BookingsToolBar = ({ callbackChangeDays }) => {
  const [filterOpen, setFilterOpen] = React.useState(false);

  const handleSevenDays = () => {
    callbackChangeDays();
  };

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  return (
    <div className={styles.toolbar}>
      <Box className={styles.filterButtons}>
        <div>
          <IconButton
            sx={{
              position: "relative",
              fontSize: "14px",
              fontWeight: "bold",
              alignItems: "center",
            }}
            aria-label="filter"
            onClick={() => callbackChangeDays(7)}
          >
            <CalendarTodayIcon sx={{ position: "absolute" }} />7
          </IconButton>
          <IconButton
            sx={{
              position: "relative",
              fontSize: "14px",
              fontWeight: "bold",
              alignItems: "center",
            }}
            aria-label="filter"
            onClick={() => callbackChangeDays(30)}
          >
            <CalendarTodayIcon sx={{ position: "absolute" }} />
            30
          </IconButton>
        </div>

        <IconButton aria-label="filter" onClick={handleFilterOpen}>
          <FilterListIcon />
        </IconButton>
      </Box>
      <Searchbar />

      <FilterPanel visible={filterOpen} callbackClose={handleFilterClose} />
    </div>
  );
};

export default BookingsToolBar;
