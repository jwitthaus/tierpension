import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import MyButton from "../../BasicControls/MyButton";
import Searchbar from "../Searchbar";
import styles from "./BookingsToolBar.module.css";
import FilterPanel from "./FilterPanel";

const BookingsToolBar = () => {
  const [filterOpen, setFilterOpen] = React.useState(false);

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  return (
    <div className={styles.toolbar}>
      <Box className={styles.desktopFilterButtons}>
        <div>
          <IconButton
            aria-label="filter"
            onClick={handleFilterOpen}
            className={styles.mobileFilterButton}
          >
            <FilterListIcon />
          </IconButton>
          <IconButton
            aria-label="filter"
            onClick={handleFilterOpen}
            className={styles.mobileFilterButton}
          >
            <FilterListIcon />
          </IconButton>
          <IconButton
            aria-label="filter"
            onClick={handleFilterOpen}
            className={styles.mobileFilterButton}
          >
            <FilterListIcon />
          </IconButton>
        </div>

        <IconButton
          aria-label="filter"
          onClick={handleFilterOpen}
          className={styles.mobileFilterButton}
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      <Box className={styles.searchbarAndMobileFilter}>
        <Searchbar />
      </Box>

      <FilterPanel visible={filterOpen} callbackClose={handleFilterClose} />
    </div>
  );
};

export default BookingsToolBar;
