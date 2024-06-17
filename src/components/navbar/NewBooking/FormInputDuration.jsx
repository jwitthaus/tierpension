import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Controller } from "react-hook-form";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import de from "date-fns/locale/de";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
export const FormInputDuration = ({ name, control, label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <Controller
        name={name}
        rules={{ required: "required" }}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Duration [min]
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                value={value}
                label="Duration [min]"
                onChange={onChange}
                //IconComponent={TimelapseIcon}
              >
                {durations.map((duration) => (
                  <MenuItem key={duration} value={duration}>
                    {duration}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
      />
    </LocalizationProvider>
  );
};

const durations = ["15", "30", "45", "60", "75", "90", "105", "120"];
