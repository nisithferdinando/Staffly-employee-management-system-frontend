import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

const SearchDropdown = ({
  label = "",
  name = "",
  value = null,
  onChange = () => {},
  api,
  apiDependency = {},
  disabled = false,
  required = false,
  placeholder = "",
  className = "",
  errorMessage = {},
  minChars = 2,
}) => {
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const finalError = errorMessage?.[name] || "";
  const isError = Boolean(finalError);

  useEffect(() => {
    if (!api || searchText.length < minChars) {
      setOptions([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api({
          searchText,
          ...apiDependency,
        });

        setOptions(res || []);
      } catch (err) {
        console.error("SearchDropdown error", err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchData, 400);
    return () => clearTimeout(debounce);
  }, [searchText, apiDependency]);

  return (
    <FormControl
      margin="dense"
      className={className}
      sx={{ width: "200px" }}
      size="small"
      error={isError}
    >
      {label && (
        <FormLabel
          sx={{ fontSize: "14px", marginBottom: "4px", color: "black" }}
        >
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </FormLabel>
      )}

      <Autocomplete
        options={options}
        loading={loading}
        value={value}
        disabled={disabled}
        popupIcon={null}
        filterOptions={(x) => x}
        onChange={(e, newValue) => onChange(name, newValue)}
        onInputChange={(e, newValue, reason) => {
          if ((reason = "input")) {
            setSearchText(newValue);
          }
        }}
        getOptionLabel={(opt) => opt?.text1 ?? ""}
        isOptionEqualToValue={(opt, val) => opt?.id === val?.id}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            error={isError}
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress size={16} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {isError && <FormHelperText>{finalError}</FormHelperText>}
    </FormControl>
  );
};

export default SearchDropdown;
