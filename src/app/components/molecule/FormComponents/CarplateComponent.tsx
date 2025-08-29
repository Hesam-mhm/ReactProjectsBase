import { FormHelperText, Grid, Stack, useTheme } from '@mui/material';
import React, { useState } from 'react';
import TextfieldComponent from './TextfieldComponent';
import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';

type CarplateComponentProps<T extends FieldValues> = {
  control: Control<T>;
  errors?: { [key: string]: FieldErrors<T> };
  controllerNameForAlphabet: Path<T>;
  controllerNameForProvince: Path<T>;
  controllerNameForThreeDigit: Path<T>;
  controllerNameForTwoDigit: Path<T>;
  labelForAlphabet: string;
  labelForProvince: string;
  labelForThreeDigit: string;
  labelForTwoDigit: string;
  readOnly?: boolean;
  disabled?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};
const CarplateComponent = <T extends FieldValues>({
  control,
  errors,
  controllerNameForAlphabet,
  controllerNameForProvince,
  controllerNameForThreeDigit,
  controllerNameForTwoDigit,
  labelForAlphabet,
  labelForProvince,
  labelForThreeDigit,
  labelForTwoDigit,
  readOnly,
  disabled,
  inputProps,
}: CarplateComponentProps<T>) => {
  const theme = useTheme();
  const [isAnyFocused, setIsAnyFocused] = useState(false);
  const activeBorder = isAnyFocused ? theme.palette.secondary.main : theme.palette.grey[500]; // آبی یا خاکستری

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={3}>
        <TextfieldComponent
          inputProps={{
            onFocus: () => setIsAnyFocused(true),
            onBlur: () => setIsAnyFocused(false),
            ...inputProps,
            min: 0,
            maxLength: 2,
          }}
          control={control}
          controllerName={controllerNameForProvince}
          label={labelForProvince}
          errors={errors?.[controllerNameForProvince]}
          readOnly={readOnly}
          disabled={disabled}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRight: '1px solid #e2e2e2',
              borderColor: activeBorder,
            },
            '& input': { textAlign: 'center' },
          }}
        />
        {errors?.[controllerNameForTwoDigit]?.message && <FormHelperText error>{errors?.[controllerNameForTwoDigit].message.toString()}</FormHelperText>}
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextfieldComponent
          inputProps={{
            onFocus: () => setIsAnyFocused(true),
            onBlur: () => setIsAnyFocused(false),
            ...inputProps,
            min: 0,
            maxLength: 3,
          }}
          control={control}
          controllerName={controllerNameForThreeDigit}
          label={labelForThreeDigit}
          errors={errors?.[controllerNameForThreeDigit]}
          readOnly={readOnly}
          disabled={disabled}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeft: 'none',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderColor: activeBorder,
              borderRight: `1px solid ${theme.palette.grey[300]}`,
            },
            '& input': { textAlign: 'center' },
          }}
        />
        {errors?.[controllerNameForTwoDigit]?.message && <FormHelperText error>{errors?.[controllerNameForTwoDigit].message.toString()}</FormHelperText>}
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextfieldComponent
          inputProps={{
            onFocus: () => setIsAnyFocused(true),
            onBlur: () => setIsAnyFocused(false),
            ...inputProps,
            min: 0,
          }}
          control={control}
          controllerName={controllerNameForAlphabet}
          label={labelForAlphabet}
          errors={errors?.[controllerNameForAlphabet]}
          readOnly={readOnly}
          disabled={disabled}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeft: 'none',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderColor: activeBorder,
              borderRight: `1px solid ${theme.palette.grey[300]}`,
            },
            '& input': { textAlign: 'center' },
          }}
        />
        {errors?.[controllerNameForTwoDigit]?.message && <FormHelperText error>{errors?.[controllerNameForTwoDigit].message.toString()}</FormHelperText>}
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextfieldComponent
          inputProps={{
            onFocus: () => setIsAnyFocused(true),
            onBlur: () => setIsAnyFocused(false),
            ...inputProps,
            min: 0,
            maxLength: 2,
          }}
          control={control}
          controllerName={controllerNameForTwoDigit}
          label={labelForTwoDigit}
          errors={errors?.[controllerNameForTwoDigit]}
          readOnly={readOnly}
          disabled={disabled}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeft: 'none',
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
              borderColor: activeBorder,
            },
            '& input': { textAlign: 'center' },
          }}
        />
        {errors?.[controllerNameForTwoDigit]?.message && <FormHelperText error>{errors?.[controllerNameForTwoDigit].message.toString()}</FormHelperText>}
      </Grid>
    </Grid>
  );
};

export default CarplateComponent;
