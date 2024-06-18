import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import de from "date-fns/locale/de";
import { InputLabel } from "@mui/material";
export const FormInputDate = ({ name, control, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <Controller
        name={name}
        rules={{ required: "required" }}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <DatePicker
              value={value}
              onChange={onChange}
              label={label}
              slotProps={{
                textField: {
                  error: !!error,
                  helperText: error ? error.message : null,
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
            />
            //how to pass disablePast and maxDate={endDate} or minDate={startDate}
          );
        }}
      />
    </LocalizationProvider>
  );
};
