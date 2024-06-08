import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";

const DateTimePicker = ({ label, defaultDate, onChange, renderInput }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center px-3 rounded border border-solid border-black border-opacity-20">
        <div className="flex flex-col">
          <label className="justify-center px-1 text-xs leading-3 bg-white text-black text-opacity-60">
            {label}
          </label>
          <DatePicker
            label={label}
            value={defaultDate}
            onChange={onChange}
            renderInput={renderInput}
          />
        </div>
      </div>
    </div>
  </LocalizationProvider>
);

const TimeSelector = ({ label, defaultTime, onChange, renderInput }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center px-3 rounded border border-solid border-black border-opacity-20">
        <div className="flex flex-col">
          <label className="justify-center px-1 text-xs leading-3 bg-white text-black text-opacity-60">
            {label}
          </label>
          <TimePicker
            label={label}
            value={defaultTime}
            onChange={onChange}
            renderInput={renderInput}
          />
        </div>
      </div>
    </div>
  </LocalizationProvider>
);

function MyComponent() {
  const [startDate, setStartDate] = (React.useState < Date) | (null > null);
  const [endDate, setEndDate] = (React.useState < Date) | (null > null);
  const [startTime, setStartTime] = (React.useState < Date) | (null > null);
  const [endTime, setEndTime] = (React.useState < Date) | (null > null);

  return (
    <section className="flex flex-col p-6 tracking-normal bg-white rounded-xl max-w-[600px] max-md:px-5">
      <div className="flex flex-col justify-center px-3 text-base leading-6 rounded-xl border border-solid border-black border-opacity-20 text-black text-opacity-60 max-md:max-w-full">
        <div className="flex gap-0 py-4 max-md:flex-wrap">
          <label htmlFor="searchCustomer" className="sr-only">
            Search for customer
          </label>
          <Autocomplete
            id="searchCustomer"
            options={[]}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for customer"
                variant="standard"
              />
            )}
          />
        </div>
      </div>
      <div className="flex gap-4 mt-4 whitespace-nowrap max-md:flex-wrap">
        <DateTimePicker
          label="Start"
          defaultDate={startDate}
          onChange={setStartDate}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
        <DateTimePicker
          label="End"
          defaultDate={endDate}
          onChange={setEndDate}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      </div>
      <div className="flex gap-4 mt-4 max-md:flex-wrap">
        <TimeSelector
          label="Select time"
          defaultTime={startTime}
          onChange={setStartTime}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
        <TimeSelector
          label="Select time"
          defaultTime={endTime}
          onChange={setEndTime}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      </div>
    </section>
  );
}

export default MyComponent;
