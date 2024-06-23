import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Button, ButtonGroup, IconButton } from "@mui/material";
import React, { useCallback, useContext } from "react";
import { TimelineSettingsContext } from "../Timeline/TimelineSettingsProvider";
import styles from "./BookingsToolBar.module.css";
import FilterPanel from "./FilterPanel";
import Searchbar from "./Searchbar";

const VIEW_OPTIONS = [
  { id: 31, label: "Month" },
  { id: 7, label: "Week" },
  { id: 1, label: "Day" },
];

const BookingsToolBar = () => {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const { visibleDays, setVisibleDays } = useContext(TimelineSettingsContext);

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
          <ButtonGroup gap={0} spacing={0} isattached="true">
            {VIEW_OPTIONS.map(({ id, label }) => (
              <Button
                key={id}
                onClick={() => setVisibleDays(id)}
                sx={
                  id === visibleDays
                    ? {
                        backgroundColor: "#EDF6FF",
                        "&:hover": {
                          backgroundColor: "#D7E6F3",
                        },
                      }
                    : {}
                }
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
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
