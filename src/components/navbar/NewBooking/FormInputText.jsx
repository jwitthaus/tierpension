import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputText = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "required" }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => {
        console.log(error);
        return (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
          />
        );
      }}
    />
  );
};
