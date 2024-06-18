/* eslint-disable no-use-before-define */
import { makeStyles } from "@material-ui/core/styles";
import {
  Autocomplete,
  ListItem,
  ListItemText,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { id } from "date-fns/locale";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

export const FormAutoComplete = ({ name, control, label, options }) => {
  const [value, setValue] = useState(options[0].Nummer);
  const [inputValue, setInputValue] = useState("");

  const filter = createFilterOptions();
  const labelNewCustomer = "Add new customer";
  const isRegularItem = (label) => {
    return label != labelNewCustomer;
  };
  const colorOfNewCustomer = (label) => {
    if (!isRegularItem(label)) return "#0000ff";
    else return "#000000";
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "required" }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <Autocomplete
          freeSolo
          value={value || null}
          options={options}
          getOptionLabel={(option) => {
            return option.Nachname + ", " + option.Vorname;
          }}
          onChange={(event, newValue) => {
            onChange(newValue || null);
          }}
          id="controllable-states-demo"
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              helperText={error ? error.message : null}
              label={label}
            />
          )}
          renderOption={(props, option) => (
            <ListItem {...props} key={option.Nummer}>
              {!isRegularItem(option.Vorname) && (
                <AddIcon fontSize="small" sx={{ color: "#0000ff" }} />
              )}
              <ListItemText
                sx={{ color: colorOfNewCustomer(option.Vorname) }}
                primary={
                  option.Nachname +
                  `${option.Nachname ? ", " : ""}` + //get rid of the comma for the dirty hack of last element (add new customer)
                  option.Vorname
                }
                secondary={option.Mail}
              />
            </ListItem>
          )}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            //adding a list item at the end of the list (add new customer) --> dirty hack to use Vorname
            if (params.inputValue !== "") {
              filtered.push({
                Vorname: labelNewCustomer,
                Nachname: "",
                Mail: "",
                Nummer: -1,
              });
            }

            return filtered;
          }}
        />
      )}
    />
  );
};
