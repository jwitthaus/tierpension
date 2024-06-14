/* eslint-disable no-use-before-define */
import { Autocomplete, TextField } from "@mui/material";
import React, { Fragment } from "react";

const options = [
  { id: 1, label: "option 1" },
  { id: 2, label: "option 2" },
];

const FormAutoComplete = () => {
  return (
    <Fragment>
      <Autocomplete
        id="free-solo-2-demo"
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="search for customer name" />
        )}
      />
    </Fragment>
  );
};

export default FormAutoComplete;
