import React, { useContext } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FilterContext } from "./FilterProvider.jsx";

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useContext(FilterContext);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          value={searchTerm}
          size="small"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton
                onClick={handleClear}
                sx={{ visibility: searchTerm ? "visible" : "hidden" }}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
      </FormControl>
    </>
  );
};

export default Searchbar;
