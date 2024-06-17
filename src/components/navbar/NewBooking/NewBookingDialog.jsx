import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "dayjs/locale/de";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Capacity from "../../Bookings/Capacity/Capacity";
import { FormInputDate } from "./FormInputDate";
import { FormInputText } from "./FormInputText";
import { FormAutoComplete } from "./FormAutoComplete";
import { format, getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { useQueryClient } from "react-query";
import { FormInputTime } from "./FormInputTime";
import { FormInputDuration } from "./FormInputDuration";

const startTime = new Date();
startTime.setHours(13);
startTime.setMinutes(0);

const startDuration = 30;

const endTime = new Date();
endTime.setHours(17);
endTime.setMinutes(0);

const endDuration = 30;

const defaultValues = {
  Kunden_ID: null,
  Vorname: "",
  Nachname: "",
  Mail: "",
  Beginn_Datum: null, //new Date(),
  Beginn_Start: startTime,
  Beginn_Zeitraum: startDuration,
  Ende_Datum: null, //new Date(),
  Ende_Start: endTime,
  Ende_Zeitraum: endDuration,
  Tier_ID: 5,
};

const NewBookingDialog = ({ visible, callbackClose }) => {
  const queryClient = useQueryClient();

  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:8081/customers");
        setCustomerList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCustomers();
  }, []);

  const { handleSubmit, watch, reset, control, setValue } = useForm({
    defaultValues: defaultValues,
  });

  const watchCustomerSelection = watch("Kunden_ID");
  const watchStartDate = watch("Beginn_Datum");
  const watchEndDate = watch("Ende_Datum");

  //the date from the time picker needs to be set to the date from the date picker, because time pickers default date is always "today"
  //but wee need to keep the picked time
  const setToSelectedDate = (dateToChange, selectedDate) => {
    let newHours = getHours(dateToChange);
    let newMinutes = getMinutes(dateToChange);
    dateToChange = selectedDate;
    dateToChange = setHours(dateToChange, newHours);
    dateToChange = setMinutes(dateToChange, newMinutes);
    dateToChange = format(dateToChange, "yyyy-MM-dd HH:mm:ss");

    return dateToChange;
  };

  const onSubmit = async (data) => {
    //create new Customer selected
    if (watchCustomerSelection === -1) {
      try {
        await axios
          .post("http://localhost:8081/customers", data)
          .then((response) => {
            //Kunden ID of added customer
            data.Kunden_ID = response.data.insertId;
          });
      } catch (error) {
        console.log(error);
      }
    }
    data.Beginn_Datum = format(data.Beginn_Datum, "yyyy-MM-dd HH:mm:ss");
    data.Beginn_Start = setToSelectedDate(data.Beginn_Start, data.Beginn_Datum);
    data.Ende_Datum = format(data.Ende_Datum, "yyyy-MM-dd HH:mm:ss");
    data.Ende_Start = setToSelectedDate(data.Ende_Start, data.Ende_Datum);
    try {
      await axios.post("http://localhost:8081/bookings", data);
    } catch (error) {
      console.log(error);
    }
    queryClient.invalidateQueries("bookings-with-customers");
    handleClose();
  };

  /*const newCustomer = {
    Vorname: "",
    Nachname: "",
    NameIntern: "",
    Mail: "",
  };
  const newBooking = {
    Kunden_ID: null,
    Tier_ID: null,
    Beginn_Datum: "2024-06-18 00:00:00",
    Ende_Datum: "2024-06-18 00:00:00",
  };*/

  const handleClose = () => {
    reset();
    callbackClose();
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <Fragment>
      <Dialog open={visible} onClose={handleClose}>
        <DialogTitle>New Booking</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginTop: 1,
            }}
          >
            {watchCustomerSelection != -1 ? (
              <FormAutoComplete
                name="Kunden_ID"
                control={control}
                label="Search customer"
                options={customerList}
              />
            ) : (
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <FormInputText
                  name="Vorname"
                  control={control}
                  label="First name"
                />
                <FormInputText
                  name="Nachname"
                  control={control}
                  label="Last name"
                />
                <FormInputText name="Mail" control={control} label="Email" />
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <FormInputDate
                name="Beginn_Datum"
                control={control}
                label="Start date"
              />
              <FormInputTime
                name="Beginn_Start"
                control={control}
                label="Time"
              />
              <FormInputDuration
                name="Beginn_Zeitraum"
                control={control}
                label="Duration"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <FormInputDate
                name="Ende_Datum"
                control={control}
                label="End date"
              />
              <FormInputTime name="Ende_Start" control={control} label="Time" />
              <FormInputDuration
                name="Ende_Zeitraum"
                control={control}
                label="Duration"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Book</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

/*
{watchStartDate && watchEndDate ? (
              <Capacity timelineStart={startDate} timelineEnd={endDate} />
            ) : null}
             */

export default NewBookingDialog;
