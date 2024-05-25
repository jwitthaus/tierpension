import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  Autocomplete,
  ListItem,
  ListItemText,
  TextField,
  createFilterOptions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const filter = createFilterOptions();

const labelNewCustomer = "Add new customer";
const newCustomerOptionSelected = (label) => {
  return label === labelNewCustomer;
};

const colorOfNewCustomer = (label) => {
  if (newCustomerOptionSelected(label)) return "#0000ff";
  else return "#000000";
};

const CustomerSearch = ({
  handleNewCustomerSelected,
  handleCustomerSelected,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8081/customers");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCustomers();
  }, []);

  return (
    <Fragment>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data}
        onChange={(event, newValue) => {
          setTimeout(() => {
            if (newCustomerOptionSelected(newValue.Vorname))
              handleNewCustomerSelected();
            else handleCustomerSelected(newValue);
          });
        }}
        getOptionLabel={(option) => {
          return option.Vorname + " " + option.Nachname;
        }}
        renderOption={(props, option) => (
          <ListItem {...props} key={option.id}>
            {newCustomerOptionSelected(option.Vorname) && (
              <AddIcon fontSize="small" sx={{ color: "#0000ff" }} />
            )}

            <ListItemText
              sx={{ color: colorOfNewCustomer(option.Vorname) }}
              primary={option.Vorname + " " + option.Nachname}
              secondary={option.Email}
            />
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="search for customer name"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              Vorname: labelNewCustomer,
              Nachname: "",
              Email: "",
              id: -1,
            });
          }

          return filtered;
        }}
      />
    </Fragment>
  );
};

export default CustomerSearch;
