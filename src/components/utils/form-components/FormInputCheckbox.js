import React, { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Controller } from "react-hook-form";


export const FormInputMultiCheckbox = ({
  name,
  control,
  setValue,
  label,
  options,
  optionsChecked
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };


  useEffect(() => {
    setValue(name, selectedItems);
    
  }, [selectedItems, name, setValue]);
  
  useEffect(()=>{
    const checkboxChecked = options.filter((tech)=>{
      return optionsChecked.some((c)=> {return c.name === tech.name})
    })

    const checkboxCheckedId = checkboxChecked.map((checkbox)=>{
      return checkbox.index
    })
    setSelectedItems(checkboxCheckedId)
  }, [optionsChecked, options])

  
  return (
    <FormControl size={"small"} variant={"outlined"} sx={{ml:3, mr:3, mt:1, mb:2}}>
      <FormLabel component="legend">{label}</FormLabel>

      <div>
        {options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={() => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(option.index)}
                        onChange={() => handleSelect(option.index)}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.name}
              key={option.index}
            />
          );
        })}
      </div>
    </FormControl>
  );
};