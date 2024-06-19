import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { format, getHours, getMinutes, setHours, setMinutes } from "date-fns";
import "dayjs/locale/de";
import React, { Fragment, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "react-query";
import { FormAutoComplete } from "../BasicControls/FormAutoComplete";
import { FormInputDate } from "../BasicControls/FormInputDate";
import { FormInputDuration } from "../BasicControls/FormInputDuration";
import { FormInputText } from "../BasicControls/FormInputText";
import { FormInputTime } from "../BasicControls/FormInputTime";

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

const BookingDetails = ({ visible, callbackClose, selectedBooking }) => {
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

  const { handleSubmit, reset, control, setValue } = useForm({
    defaultValues: defaultValues,
  });

  //wenn dieses Formular geöffnet wird, weil eine vorhandene Buchung selektiert wird,
  //dann sollen alle Details der Buchung in die Felder übernommen werden
  useEffect(() => {
    if (selectedBooking) {
      const selectedCustomer = customerList.find(
        (customer) => customer.Nummer === selectedBooking.Kunden_ID
      );
      setValue("Kunden_ID", selectedCustomer || null);
      setValue("Beginn_Datum", new Date(selectedBooking.Beginn_Datum));
      setValue("Beginn_Start", new Date(selectedBooking.Beginn_Start));
      setValue("Beginn_Zeitraum", selectedBooking.Beginn_Zeitraum);
      setValue("Ende_Datum", new Date(selectedBooking.Ende_Datum));
      setValue("Ende_Start", new Date(selectedBooking.Ende_Start));
      setValue("Ende_Zeitraum", selectedBooking.Ende_Zeitraum);
      setValue("Tier_ID", selectedBooking.Tier_ID);
    }
  }, [selectedBooking, setValue, customerList]);

  const watchDates = useWatch({
    control,
    name: ["Beginn_Datum", "Ende_Datum"],
  });

  const watchCustomerSelection = useWatch({
    control,
    name: "Kunden_ID.Nummer",
  });

  //wenn das Datum gesetzt wurde, wird Die Zeit auf den selben Tag gesetzt
  //denn bei der Selektion der Zeit wird wirklich nur die Zeit ausgewählt und der Tag würde nicht dem selektierten Datum entsprechen
  useEffect(() => {
    let [startDate, endDate] = watchDates;
    if (startDate) {
      startDate = setHours(startDate, getHours(startTime));
      startDate = setMinutes(startDate, getMinutes(startTime));
      setValue("Beginn_Start", startDate);
    }
    if (endDate) {
      endDate = setHours(endDate, getHours(endTime));
      endDate = setMinutes(endDate, getMinutes(endTime));
      setValue("Ende_Start", endDate);
    }
  }, [watchDates, setValue]);

  const onSubmit = async (data) => {
    //create new Customer selected
    if (watchCustomerSelection === -1) {
      try {
        await axios
          .post("http://localhost:8081/customers", data)
          .then((response) => {
            //Kunden ID of added customer
            data.Kunden_ID = response.data.insertId; //we only need Kunden_ID
          });
      } catch (error) {
        console.log(error);
      }
    }
    data.Kunden_ID = data.Kunden_ID.Nummer; //we only need Kunden_ID
    data.Beginn_Datum = format(data.Beginn_Datum, "yyyy-MM-dd HH:mm:ss");
    data.Beginn_Start = format(data.Beginn_Start, "yyyy-MM-dd HH:mm:ss");
    data.Ende_Datum = format(data.Ende_Datum, "yyyy-MM-dd HH:mm:ss");
    data.Ende_Start = format(data.Ende_Start, "yyyy-MM-dd HH:mm:ss");
    try {
      await axios.post("http://localhost:8081/bookings", data);
    } catch (error) {
      console.log(error);
    }
    queryClient.invalidateQueries("bookings-with-customers");
    handleClose();
  };

  const handleClose = () => {
    reset(defaultValues);
    callbackClose();
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Fragment>
      <Dialog open={visible} onClose={handleClose} fullScreen={fullScreen}>
        <DialogTitle>
          {selectedBooking ? "Edit Booking" : "New Booking"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginTop: 1,
            }}
          >
            {watchCustomerSelection !== -1 ? (
              <FormAutoComplete
                name="Kunden_ID"
                control={control}
                label="Search customer"
                options={customerList}
                disabled={!!selectedBooking} // Disable if selectedBooking exists
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
        <DialogActions sx={{ marginX: 2, marginBottom: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            {selectedBooking ? "Save" : "Book"}
          </Button>
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

export default BookingDetails;
