import { useFormContext, FieldError } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { ReactNode } from "react";

interface Props {
  name: string;
  label: string;
  error?: FieldError;
  type?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  multiline?: boolean;
  disabled?: boolean;
}

const CustomTextField: React.FC<Props> = ({ name, label, error, type, endAdornment, multiline, disabled, startAdornment }) => {
  const { register } = useFormContext();
  return (
    <FormControl error={error ? true : false} sx={{ width: "100%"}}>
      <InputLabel htmlFor={name}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={name}
        label={label}
        type={type ? type : "text"}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        multiline={multiline}
        disabled={disabled}
        sx={{
          borderRadius: "5px",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
        }}
        {...register(name)}
      />
      <FormHelperText>{error && error.message}</FormHelperText>
    </FormControl>
  );
};

export default CustomTextField;
