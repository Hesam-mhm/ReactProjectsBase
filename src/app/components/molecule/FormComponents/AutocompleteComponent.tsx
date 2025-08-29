import { FormControl, TextField, Autocomplete, FormHelperText, Typography, AutocompleteInputChangeReason } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import get from 'lodash/get';
import { KeyboardEventHandler, useMemo } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';

interface ErrorObject {
  message?: string;
  type?: string;
  ref?: any;
}

const getNestedErrorMessage = (errors: any, path: string): string | undefined => {
  const error = get(errors, path) as ErrorObject;
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (typeof error === 'object' && error !== null) {
    return Object.values(error).find((val: any) => typeof val?.message === 'string')?.message;
  }
  return undefined;
};

/**
 * A reusable autocomplete component that integrates with react-hook-form.
 * @template T - The type of the form values (react-hook-form FieldValues)
 * @template OptionType - The type of the options in the autocomplete
 *
 * @example
 * // Basic usage with a simple object
 * type Car = { id: number; name: string; plate: string };
 * type FormData = { carId: number | null };
 *
 * const MyForm = () => {
 *   const { control, formState: { errors } } = useForm<FormData>();
 *   const cars = [
 *     { id: 1, name: 'Toyota Camry', plate: 'ABC-123' },
 *     { id: 2, name: 'Honda Civic', plate: 'XYZ-789' },
 *   ];
 *
 *   return (
 *     <AutocompleteComponent
 *       control={control}
 *       errors={errors}
 *       controllerName="carId"
 *       label="Select Car"
 *       options={cars}
 *       displayField="name"
 *       valueField="id"
 *       onItemSelect={(item) => console.log('Selected:', item)}
 *     />
 *   );
 * };
 *
 * @example
 * // With custom filtering and loading state
 * const MyAsyncForm = () => {
 *   const { control, formState: { errors } } = useForm<FormData>();
 *   const [options, setOptions] = useState<Car[]>([]);
 *   const [loading, setLoading] = useState(false);
 *
 *   useEffect(() => {
 *     setLoading(true);
 *     fetchCars().then((data) => {
 *       setOptions(data);
 *       setLoading(false);
 *     });
 *   }, []);
 *
 *   return (
 *     <AutocompleteComponent
 *       control={control}
 *       errors={errors}
 *       controllerName="carId"
 *       label="Select Car"
 *       options={options}
 *       displayField="name"
 *       valueField="id"
 *       loading={loading}
 *       filterOptions={(options, { inputValue }) =>
 *         options.filter((option) =>
 *           option.name.toLowerCase().includes(inputValue.toLowerCase())
 *         )
 *       }
 *       helperText="Search for a car by name"
 *     />
 *   );
 * };
 *
 * @example
 * // With read-only and disabled states
 * const MyReadOnlyForm = () => {
 *   const { control, formState: { errors } } = useForm<FormData>();
 *   const cars = [{ id: 1, name: 'Toyota Camry', plate: 'ABC-123' }];
 *
 *   return (
 *     <AutocompleteComponent
 *       control={control}
 *       errors={errors}
 *       controllerName="carId"
 *       label="Select Car"
 *       options={cars}
 *       displayField="name"
 *       valueField="id"
 *       readOnly={true}
 *       disabled={true}
 *       helperText="This field is read-only"
 *     />
 *   );
 * };
 */
type AutocompleteComponentProps<T extends FieldValues, OptionType extends Record<string, any>> = {
  control: Control<T>;
  errors?: FieldErrors<T>;
  controllerName: Path<T>;
  label: string;
  options: OptionType[];
  displayField: keyof OptionType & string;
  valueField: keyof OptionType & string;
  getOptionLabel?: (option: OptionType) => string;
  isOptionEqualToValue?: (option: OptionType, value: OptionType) => boolean;
  filterOptions?: (options: OptionType[], state: { inputValue: string }) => OptionType[];
  readOnly?: boolean;
  onItemSelect?: (item: OptionType | null) => void;
  onInputChange?: (event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => void;
  loading?: boolean;
  onFocus?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
};

const AutocompleteComponent = <T extends FieldValues, OptionType extends Record<string, any>>({
  control,
  errors,
  controllerName,
  label,
  options,
  displayField,
  valueField,
  getOptionLabel = (option: OptionType) => (option ? String(option[displayField]) : ''),
  isOptionEqualToValue = (option: OptionType, value: OptionType) => option[valueField] === value[valueField],
  filterOptions = createFilterOptions<OptionType>({ stringify: (option) => String(option[displayField]) }),
  readOnly = false,
  onItemSelect,
  onInputChange,
  onFocus,
  loading = false,
  onKeyDown,
  required = false,
  disabled = false,
  helperText,
}: AutocompleteComponentProps<T, OptionType>) => {
  const errorMessage = getNestedErrorMessage(errors, controllerName as string);

  return (
    <FormControl fullWidth>
      <Controller
        name={controllerName}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          // Memoize selectedOption inside render to access value
          const selectedOption = useMemo(() => {
            if (!valueField || value === undefined || value === null) return null;
            return options.find((option) => option[valueField] === value) || null;
          }, [options, valueField, value]);

          return (
            <Autocomplete
              onBlur={onBlur}
              onFocus={onFocus}
              getOptionLabel={getOptionLabel}
              isOptionEqualToValue={isOptionEqualToValue}
              value={selectedOption}
              onChange={(_, newValue: OptionType | null) => {
                onChange(newValue ? newValue[valueField] : null);
                if (onItemSelect) {
                  onItemSelect(newValue);
                }
              }}
              noOptionsText="No options found"
              onInputChange={onInputChange}
              filterOptions={filterOptions}
              readOnly={readOnly}
              options={options}
              loading={loading}
              popupIcon={<ExpandMoreIcon />}
              disabled={disabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(errorMessage)}
                  onKeyDown={onKeyDown}
                  label={
                    <>
                      {label}
                      {required && !readOnly && !disabled && (
                        <Typography component="span" color="error">
                          *
                        </Typography>
                      )}
                    </>
                  }
                />
              )}
            />
          );
        }}
      />
      {(errorMessage || helperText) && <FormHelperText error={Boolean(errorMessage)}>{errorMessage || helperText}</FormHelperText>}
    </FormControl>
  );
};

export default AutocompleteComponent;
