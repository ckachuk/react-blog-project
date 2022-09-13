import React from "react";
import { Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';

export const FormInputText = ({ name, control, label }) => {
 
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      rules={{
          required: 'The title does not have to be empty',
          minLength: {
              value: 3,
              message: "The title cannot be less than 3 characters"
          }
      }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          autoFocus
          sx={{m:3, width:'95%'}}
        />
      )}
    />
  );
};