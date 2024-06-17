import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useCallback, useContext } from "react";
import styles from "./BookingsToolBar.module.css";
import FilterPanel from "./FilterPanel";
import Searchbar from "./Searchbar";
import { TimelineSettingsContext } from "./TimelineSettingsProvider";

const BookingsToolBar = () => {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const { setVisibleDays } = useContext(TimelineSettingsContext);

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = useCallback(() => {
    setFilterOpen(false);
  }, []);

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
            onClick={() => setVisibleDays(7)}
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
            onClick={() => setVisibleDays(31)}
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
