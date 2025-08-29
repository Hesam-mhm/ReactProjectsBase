/**
 * کامپوننت Select پیشرفته با قابلیت‌های متنوع
 * این کامپوننت بر پایه Material-UI Select ساخته شده و از react-hook-form پشتیبانی می‌کند
 *
 * مثال‌های استفاده:
 *
 * 1. حالت ساده:
 * ```tsx
 * <SelectComponent
 *   control={control}
 *   controllerName="category"
 *   label="دسته‌بندی"
 *   options={[
 *     { id: 1, name: "الکترونیک" },
 *     { id: 2, name: "پوشاک" }
 *   ]}
 *   labelKey="name"
 *   valueKey="id"
 * />
 * ```
 *
 * 2. حالت چند انتخابی:
 * ```tsx
 * <SelectComponent
 *   control={control}
 *   controllerName="tags"
 *   label="برچسب‌ها"
 *   options={tags}
 *   labelKey="name"
 *   valueKey="id"
 *   multiple={true}
 *   allOption={true}
 * />
 * ```
 *
 * 3. حالت جستجو:
 * ```tsx
 * <SelectComponent
 *   control={control}
 *   controllerName="city"
 *   label="شهر"
 *   options={cities}
 *   labelKey="name"
 *   valueKey="id"
 *   searchable={true}
 *   placeholder="شهر خود را جستجو کنید"
 * />
 * ```
 *
 * 4. حالت گروه‌بندی:
 * ```tsx
 * <SelectComponent
 *   control={control}
 *   controllerName="product"
 *   label="محصول"
 *   options={[
 *     { id: 1, name: "لپ‌تاپ", category: "الکترونیک" },
 *     { id: 2, name: "موبایل", category: "الکترونیک" },
 *     { id: 3, name: "پیراهن", category: "پوشاک" }
 *   ]}
 *   labelKey="name"
 *   valueKey="id"
 *   groupBy="category"
 * />
 * ```
 *
 * 5. حالت کامل با همه قابلیت‌ها:
 * ```tsx
 * <SelectComponent
 *   control={control}
 *   controllerName="filters"
 *   label="فیلترها"
 *   options={filterOptions}
 *   labelKey="name"
 *   valueKey="id"
 *   multiple={true}
 *   searchable={true}
 *   placeholder="فیلترها را انتخاب کنید"
 *   showClear={true}
 *   groupBy="type"
 *   noneOption={true}
 *   allOption={true}
 *   required={true}
 * />
 * ```
 */

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Box,
  Checkbox,
  ListItemText,
  OutlinedInput,
  SelectChangeEvent,
  useTheme,
} from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useMemo, useEffect, useRef } from 'react';
import CustomLoading from '../../atome/CustomLoading';
import { get } from 'lodash';

interface ErrorObject {
  message?: string;
  type?: string;
  ref?: any;
}

type SelectComponentProps<T extends FieldValues> = {
  /** کنترل فرم از react-hook-form */
  control: Control<T>;
  /** خطاهای فرم */
  errors?: FieldErrors<T>;
  /** نام فیلد در فرم */
  controllerName: Path<T>;
  /** برچسب فیلد */
  label: string;
  /** آرایه‌ای از گزینه‌های قابل انتخاب */
  options: Record<any, any>[];
  /** آیا فیلد فقط خواندنی است؟ */
  readOnly?: boolean;
  /** کلید نمایشی در گزینه‌ها */
  labelKey: string;
  /** کلید مقداری در گزینه‌ها */
  valueKey: string;
  /** آیا فیلد اجباری است؟ */
  required?: boolean;
  /** آیا فیلد غیرفعال است؟ */
  disabled?: boolean;
  /** آیا حالت چند انتخابی فعال است؟ */
  multiple?: boolean;
  /** آیا قابلیت جستجو فعال است؟ */
  searchable?: boolean;
  /** فیلدهایی که باید در آنها جستجو شود (پیش‌فرض: فقط labelKey) */
  searchFields?: string[];
  /** متن راهنما برای حالت خالی */
  placeholder?: string;
  /** آیا دکمه پاک کردن نمایش داده شود؟ */
  showClear?: boolean;
  /** کلید گروه‌بندی در گزینه‌ها */
  groupBy?: string;
  /** آیا گزینه "هیچ کدام" نمایش داده شود؟ */
  noneOption?: boolean;
  /** آیا گزینه "همه" در حالت چند انتخابی نمایش داده شود؟ */
  allOption?: boolean;
  /** آیا قابلیت تغییر مقدار فعال است؟ */
  onSelectChange?: (value: T | T[] | null) => void;
  loading?: boolean;
  onSearchChange?: (value: string) => void;
};

// تنظیمات ظاهری منو
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectComponent = <T extends FieldValues>({
  control,
  errors,
  controllerName,
  label,
  options,
  readOnly = false,
  labelKey,
  valueKey,
  required = true,
  disabled = false,
  multiple = false,
  searchable = false,
  placeholder,
  showClear = false,
  groupBy,
  noneOption = false,
  allOption = false,
  loading = false,
  onSelectChange,
  onSearchChange,
}: SelectComponentProps<T>) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const getNestedErrorMessage = (errors: any, path: string): string | undefined => {
    const error = get(errors, path) as ErrorObject | undefined;
    if (error?.message) return error.message;
    if (typeof error === 'object') {
      return Object.values(error).find((val: ErrorObject) => val?.message)?.message;
    }
    return undefined;
  };

  const errorMessage = getNestedErrorMessage(errors, controllerName as string);
  const hasError = Boolean(errorMessage);
  /**
   * فیلتر کردن گزینه‌ها بر اساس عبارت جستجو
   */
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchTerm.trim()) {
      return options;
    }

    return options.filter((item) => item[labelKey]?.toString().toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm, searchable, labelKey]);

  /**
   * تابع نمایش مقدار انتخاب شده
   * در حالت چند انتخابی، مقادیر با کاما از هم جدا می‌شوند
   * در حالت تک انتخابی، مقدار انتخاب شده یا placeholder نمایش داده می‌شود
   */
  const renderValue = (selected: any) => {
    if (multiple) {
      return selected.map((value: any) => options.find((item) => item[valueKey] === value)?.[labelKey]).join(' / ');
    }
    return options.find((item) => item[valueKey] === selected)?.[labelKey] || placeholder;
  };

  /**
   * گروه‌بندی گزینه‌ها بر اساس فیلد مشخص شده
   * اگر groupBy تعیین شده باشد، گزینه‌ها بر اساس آن گروه‌بندی می‌شوند
   */
  const groupedOptions = groupBy
    ? filteredOptions.reduce((acc: any, item: any) => {
        const group = item[groupBy];
        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
      }, {})
    : null;

  return (
    <FormControl fullWidth error={hasError} disabled={disabled}>
      <InputLabel>
        {label}
        {!readOnly && !disabled && required && (
          <Typography component="span" color="error">
            *
          </Typography>
        )}
      </InputLabel>
      <Controller
        name={controllerName}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Select
            multiple={multiple}
            value={value || ''}
            onChange={(e) => {
              onChange(e);
              const selectedValue = e.target.value;

              let selectedObject: T | T[] | null = null;
              if (multiple) {
                selectedObject = options.filter((item) => selectedValue.includes(item[valueKey])) as T[];
              } else {
                selectedObject = options.find((item) => item[valueKey] === selectedValue) as T;
              }

              onSelectChange?.(selectedObject);
            }}
            onClose={() => setSearchTerm('')} // Reset search term when menu closes
            onBlur={onBlur}
            error={hasError}
            label={label}
            readOnly={readOnly}
            disabled={disabled}
            displayEmpty={!!placeholder}
            renderValue={renderValue}
            IconComponent={(props) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {showClear && value && (
                  <CloseIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(multiple ? [] : '');
                    }}
                    sx={{ mr: 1, cursor: 'pointer' }}
                  />
                )}
                <ExpandMoreIcon {...props} />
              </Box>
            )}
            MenuProps={MenuProps}
            input={searchable ? <OutlinedInput label={label} placeholder={placeholder} /> : undefined}
            // sx={{
            //   '& .MuiSelect-select': {
            //     backgroundColor: multiple && value && value.length > 0 ? theme.palette.secondary.light : 'transparent',
            //   },
            // }}
          >
            {/* فیلد جستجو در صورت فعال بودن قابلیت جستجو */}
            {searchable && (
              <Box
                sx={{
                  p: 1,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'background.paper',
                  zIndex: 1,
                }}
              >
                <TextField
                  size="small"
                  placeholder="جستجو..."
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    onSearchChange?.(e.target.value);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    // فقط کلیدهای خاصی را که می‌خواهیم از propagation جلوگیری کنیم، فیلتر می‌کنیم
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter' || e.key === 'Escape') {
                      e.stopPropagation();
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
                {loading ? (
                  <CustomLoading />
                ) : filteredOptions.length === 0 ? (
                  <Typography color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                    موردی یافت نشد
                  </Typography>
                ) : null}
              </Box>
            )}

            {/* گزینه "هیچ کدام" در صورت فعال بودن */}
            {noneOption && (
              <MenuItem value="">
                <em>هیچ کدام</em>
              </MenuItem>
            )}

            {/* گزینه "همه" در حالت چند انتخابی */}
            {allOption && multiple && (
              <MenuItem
                value={filteredOptions.map((item) => item[valueKey])}
                onClick={() => {
                  onChange(filteredOptions.map((item) => item[valueKey]));
                }}
              >
                <em>همه</em>
              </MenuItem>
            )}

            {/* نمایش گزینه‌ها به صورت گروه‌بندی شده یا ساده */}
            {groupBy
              ? Object.entries(groupedOptions).map(([group, items]: [string, any]) => [
                  <MenuItem key={group} disabled>
                    <Typography variant="subtitle2">{group}</Typography>
                  </MenuItem>,
                  ...items.map((item: any, index: number) => (
                    <MenuItem key={`${group}-${index}`} value={item[valueKey]} sx={{ pl: 4 }}>
                      {multiple ? (
                        <>
                          <Checkbox
                            checked={value?.includes(item[valueKey])}
                            sx={{
                              color: theme.palette.secondary.main,
                              '&.Mui-checked': {
                                color: theme.palette.secondary.main,
                              },
                              '&.MuiCheckbox-indeterminate': {
                                color: theme.palette.secondary.main,
                              },
                            }}
                          />
                          <ListItemText primary={item[labelKey]} />
                        </>
                      ) : (
                        <Typography>{item[labelKey]}</Typography>
                      )}
                    </MenuItem>
                  )),
                ])
              : filteredOptions.map((item, index) => (
                  <MenuItem key={index} value={item[valueKey]}>
                    {multiple ? (
                      <>
                        <Checkbox
                          checked={value?.includes(item[valueKey])}
                          sx={{
                            color: theme.palette.secondary.main,
                            '&.Mui-checked': {
                              color: theme.palette.secondary.main,
                            },
                            '&.MuiCheckbox-indeterminate': {
                              color: theme.palette.secondary.main,
                            },
                          }}
                        />
                        <ListItemText primary={item[labelKey]} />
                      </>
                    ) : (
                      <Typography>{item[labelKey]}</Typography>
                    )}
                  </MenuItem>
                ))}
          </Select>
        )}
      />
      {hasError && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default SelectComponent;
