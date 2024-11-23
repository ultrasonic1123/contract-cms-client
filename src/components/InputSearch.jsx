import React, { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";

const InputSearch = ({ value, setValue, onDebounce, debounceDelay = 300 }) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebounce?.(debouncedValue);
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [debouncedValue, debounceDelay, onDebounce]);

  const handleChange = (e) => {
    setValue(e.target.value);
    setDebouncedValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setDebouncedValue("");
  };

  return (
    <FormControl>
      <TextField
        size="small"
        variant="outlined"
        value={value}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment
              position="end"
              style={{ cursor: "pointer" }}
              onClick={handleClear}
            >
              <ClearIcon />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

export default InputSearch;
