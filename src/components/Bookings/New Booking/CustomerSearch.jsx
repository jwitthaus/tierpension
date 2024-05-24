import React, { Fragment } from "react";
import {
  Autocomplete,
  ListItem,
  ListItemText,
  TextField,
  createFilterOptions,
} from "@mui/material";
import NewCustomerDialog from "./NewCustomerDialog";
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

const CustomerSearch = () => {
  const [newCustomerOpen, setNewCustomerOpen] = React.useState(false);

  const openNewCustomerDialogue = () => {
    setNewCustomerOpen(true);
  };

  const handleClose = () => {
    setNewCustomerData({
      Vorname: "",
      Nachname: "",
      Email: "",
    });
    //setNewCustomerOpen(false);
  };

  const [newCustomerData, setNewCustomerData] = React.useState({
    Vorname: "",
    Nachname: "",
    Email: "",
  });

  React.useEffect(() => {
    /*this is the vallback function for async call of setNewCustomerData.
    Whenever data has been really set we can use that data
    this is the right place to push the new customer into the database and tale this customer as the selected option*/
    console.log(newCustomerData);
    console.log("is open? " + newCustomerOpen);
  });

  const handleNewCustomerData = (data) => {
    setNewCustomerData(data);
    /*newCustomerData is always empte here because setNewCustomerData is asynchronous. we need to wait for the callback to see the data. callback is above*/
    //console.log(newCustomerData);
  };

  return (
    <Fragment>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={customers}
        onChange={(event, newValue) => {
          setTimeout(() => {
            console.log(newValue);
            if (newCustomerOptionSelected(newValue.Vorname))
              openNewCustomerDialogue();
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
            label="Search input"
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
      <NewCustomerDialog
        visible={newCustomerOpen}
        handleClose={handleClose}
        sendDataToParent={handleNewCustomerData}
      />
    </Fragment>
  );
};

const customers = [
  {
    //id is necessary to give each list item a key
    id: 1,
    Vorname: "Jörg",
    Nachname: "Witthaus",
    Email: "joerg.witthaus@gmail.com",
  },
  { id: 2, Vorname: "Holger", Nachname: "Witthaus", Email: "holwi@online.de" },
];

export default CustomerSearch;
