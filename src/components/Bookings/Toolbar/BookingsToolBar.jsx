import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import Searchbar from "./Searchbar";
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
        <Box>
          <IconButton
            sx={{
              position: "relative",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            aria-label="filter"
            onClick={() => callbackChangeDays(7)}
          >
            <CalendarTodayIcon />
            <Typography
              sx={{
                position: "absolute",
                fontSize: "x-small",
                fontWeight: "700",
                paddingTop: "4px",
              }}
            >
              7
            </Typography>
          </IconButton>
          <IconButton
            sx={{
              position: "relative",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            aria-label="filter"
            onClick={() => callbackChangeDays(31)}
          >
            <CalendarTodayIcon />
            <Typography
              sx={{
                position: "absolute",
                fontSize: "x-small",
                fontWeight: "700",
                paddingTop: "4px",
              }}
            >
              31
            </Typography>
          </IconButton>
        </Box>

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
