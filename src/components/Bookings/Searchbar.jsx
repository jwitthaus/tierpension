import React, { FunctionComponent, useState } from "react";

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { FormControl, IconButton, InputAdornment, TextField } from "@mui/material";




const Searchbar = () => {

    const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    setValue("");
  };

  return (
    <div id="app">
      <FormControl sx={{mx:2}}>
        <TextField
          value={value}
          size="small"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            style: {
                borderRadius: "12px",
              },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
                <IconButton onClick={handleClick} sx={{visibility: value ? "visible" : "hidden"}}><ClearIcon /></IconButton>
            )
          }}
        />
      </FormControl>
    </div>
  );
};

export default Searchbar;
