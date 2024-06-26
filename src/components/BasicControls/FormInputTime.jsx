import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import de from "date-fns/locale/de";
import { Controller } from "react-hook-form";
export const FormInputTime = ({ name, control, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <Controller
        name={name}
        rules={{
          required: "required",
        }}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <TimePicker
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
          );
        }}
      />
    </LocalizationProvider>
  );
};
