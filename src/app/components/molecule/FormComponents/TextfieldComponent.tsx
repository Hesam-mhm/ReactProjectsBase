import { FormControl, FormHelperText, IconButton, InputAdornment, Stack, SxProps, TextField, Theme, Typography } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import get from 'lodash/get';
import { DeleteIcon } from '../../../Iconify/DeleteIcon';

const convertPersianToEnglish = (value: string) => {
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

  let convertedValue = value;
  for (let i = 0; i < 10; i++) {
    convertedValue = convertedValue.replace(persianNumbers[i], i.toString());
    convertedValue = convertedValue.replace(arabicNumbers[i], i.toString());
  }
  return convertedValue;
};

const formatNumberWithCommas = (value: string): string => {
  // Remove all non-digit characters except decimal point
  const numericValue = value.replace(/[^\d.]/g, '');

  // Check if it's a valid number
  if (!numericValue || isNaN(Number(numericValue))) {
    return value;
  }

  // Split by decimal point
  const parts = numericValue.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Format integer part with commas
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return with decimal part if it exists
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

const removeCommas = (value: string): string => {
  return value.replace(/,/g, '');
};

//* <T extends FieldValues,>:It tells TypeScript that this component is generic and can work with any form data structure T that extends
//* <T extends FieldValues>: T is a generic type parameter that extends FieldValues. This ensures that T can be any object that represents the form's data structure, such as { name: string; age: number }.
//* Path<T>: The type Path<T> ensures that the controllerName is a valid key within the type T.
//* errors[controllerName]: Computed Property Names
// example of Computed Property Names:
// const property = 'name';
// const obj = {
//   name: 'John Doe',
//   age: 30,
// };
// console.log(obj.property);       // undefined, because there is no 'property' property on 'obj'
// console.log(obj[property]);      // 'John Doe', because 'property' holds the value 'name'
interface ErrorObject {
  message?: string;
  type?: string;
  ref?: any;
}
type TextfieldComponentProps<T extends FieldValues> = {
  control: Control<T>;
  errors?: FieldErrors<T>;
  controllerName: Path<T>;
  label: string;
  value?: string;
  readOnly?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  suffixText?: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
  onChangeTextField?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  required?: boolean;
  formatNumber?: boolean;
};
//   helperText?: string;

const TextfieldComponent = <T extends FieldValues>({
  control,
  errors,
  controllerName,
  label,
  rows = 4,
  readOnly = false,
  disabled = false,
  multiline = false,
  suffixText,
  type,
  placeholder = '',
  helperText = '',
  startIcon,
  endIcon,
  sx = {},
  onChangeTextField,
  inputProps,
  required = true,
  formatNumber = false,
}: TextfieldComponentProps<T>) => {
  const getNestedErrorMessage = (errors: any, path: string): string | undefined => {
    const error = get(errors, path) as ErrorObject | undefined;
    if (error?.message) return error.message;
    if (typeof error === 'object') {
      return Object.values(error).find((val: ErrorObject) => val?.message)?.message;
    }
    return undefined;
  };

  const errorMessage = getNestedErrorMessage(errors, controllerName as string);

  return (
    <>
      <FormControl fullWidth>
        <Controller
          name={controllerName}
          control={control}
          render={({ field: { value, onChange, onBlur } }) => {
            // Format the display value if formatNumber is enabled
            const displayValue = formatNumber && value ? formatNumberWithCommas(value.toString()) : value || '';

            return (
              <TextField
                value={displayValue}
                onChange={(e) => {
                  const convertedValue = convertPersianToEnglish(e.target.value);

                  if (formatNumber) {
                    // Remove commas first, then save the clean value (without commas)
                    const cleanValue = removeCommas(convertedValue);
                    onChange(cleanValue);
                  } else {
                    onChange(convertedValue);
                  }

                  onChangeTextField && onChangeTextField(e);
                }}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                onBlur={onBlur}
                label={
                  <>
                    {label}
                    {!readOnly && !disabled && required && (
                      <Typography component="span" color="error">
                        *
                      </Typography>
                    )}
                  </>
                }
                type={type}
                placeholder={placeholder}
                multiline={multiline}
                rows={rows}
                disabled={disabled}
                error={Boolean(errorMessage)}
                sx={{
                  "& input[type='number']": {
                    '&::-webkit-inner-spin-button': {
                      WebkitAppearance: 'none',
                      margin: 0,
                    },
                  },
                  ...sx,
                }}
                InputProps={{
                  readOnly: readOnly,
                  inputProps: { ...inputProps, min: 0 },
                  startAdornment: endIcon && <InputAdornment position="start">{endIcon}</InputAdornment>,
                  endAdornment: (
                    <Stack direction={'row'}>
                      {suffixText ? (
                        <InputAdornment position="end">
                          <Typography sx={{ color: disabled ? '#e2e2e2' : 'inherit' }}>{suffixText}</Typography>
                        </InputAdornment>
                      ) : value && !readOnly && !disabled ? (
                        <InputAdornment position="end">
                          <IconButton onClick={() => onChange('')} edge="end">
                            <DeleteIcon />
                          </IconButton>
                        </InputAdornment>
                      ) : null}
                      {startIcon && <InputAdornment position="end">{startIcon}</InputAdornment>}
                    </Stack>
                  ),
                }}
              />
            );
          }}
        />
        {(errorMessage || helperText) && (
          <FormHelperText error={Boolean(errorMessage)}>{typeof errorMessage === 'string' ? errorMessage : helperText}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default TextfieldComponent;
