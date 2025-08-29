import { FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import get from 'lodash/get';

/**
 * کامپوننت انتخاب زمان با قابلیت‌های پیشرفته
 *
 * ویژگی‌های اصلی:
 * - پشتیبانی از فرمت 24 ساعته
 * - پشتیبانی از محدوده زمانی
 * - پشتیبانی از حالت فقط خواندنی
 * - پشتیبانی از validation
 * - پشتیبانی از RTL
 *
 * مثال‌های استفاده:
 *
 * 1. استفاده پایه:
 * <TimeTextFieldComponent
 *   control={control}
 *   controllerName="time"
 *   label="زمان"
 * />
 *
 * 2. استفاده با محدوده زمانی:
 * <TimeTextFieldComponent
 *   control={control}
 *   controllerName="startTime"
 *   label="زمان شروع"
 *   minTimeSelectable={new Date(0, 0, 0, 8, 0)} // از ساعت 8 صبح
 *   maxTimeSelectable={new Date(0, 0, 0, 17, 0)} // تا ساعت 5 بعد از ظهر
 * />
 *
 * 3. استفاده با validation:
 * <TimeTextFieldComponent
 *   control={control}
 *   controllerName="appointmentTime"
 *   label="زمان قرار ملاقات"
 *   helperText="لطفا زمان معتبر وارد کنید"
 * />
 *
 * 4. استفاده با حالت فقط خواندنی:
 * <TimeTextFieldComponent
 *   control={control}
 *   controllerName="currentTime"
 *   label="زمان فعلی"
 *   readOnly={true}
 * />
 *
 * 5. استفاده با استایل‌های سفارشی:
 * <TimeTextFieldComponent
 *   control={control}
 *   controllerName="eventTime"
 *   label="زمان رویداد"
 *   sx={{
 *     backgroundColor: 'white',
 *     borderRadius: '8px',
 *     '& .MuiOutlinedInput-root': {
 *       '&:hover fieldset': {
 *         borderColor: 'primary.main',
 *       },
 *     },
 *   }}
 * />
 *
 * 6. استفاده در فرم رزرو:
 * <TimeTextFieldComponent
 *   control={control}
 *   controllerName="reservationTime"
 *   label="زمان رزرو"
 *   minTimeSelectable={new Date(0, 0, 0, 9, 0)} // از ساعت 9 صبح
 *   maxTimeSelectable={new Date(0, 0, 0, 21, 0)} // تا ساعت 9 شب
 *   helperText="لطفا زمان رزرو را انتخاب کنید"
 * />
 *
 * 7. استفاده در فرم شیفت کاری:
 * <TimeTextFieldComponent
 *   control={control}
 *   controllerName="shiftStartTime"
 *   label="زمان شروع شیفت"
 *   minTimeSelectable={new Date(0, 0, 0, 6, 0)} // از ساعت 6 صبح
 *   maxTimeSelectable={new Date(0, 0, 0, 22, 0)} // تا ساعت 10 شب
 * />
 *
 * 8. استفاده در فرم کلاس:
 * <TimeTextFieldComponent
 *   control={control}
 *   controllerName="classTime"
 *   label="زمان کلاس"
 *   minTimeSelectable={new Date(0, 0, 0, 8, 0)} // از ساعت 8 صبح
 *   maxTimeSelectable={new Date(0, 0, 0, 20, 0)} // تا ساعت 8 شب
 *   helperText="لطفا زمان کلاس را انتخاب کنید"
 * />
 */

// تابع کمکی برای تبدیل زمان به فرمت HH:mm
const formatTime = (date: Date | null): string | null => {
  if (!date) return null;

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

// تابع کمکی برای تبدیل رشته زمان به شیء Date
const parseTime = (time: string): Date | null => {
  if (!time) return null;

  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

type TimeTextfieldComponentProps<T extends FieldValues> = {
  // کنترل فرم از react-hook-form
  control: Control<T>;
  // خطاهای فرم
  errors?: FieldErrors<T>;
  // نام فیلد در فرم
  controllerName: Path<T>;
  // برچسب فیلد
  label: string;
  // حداقل زمان قابل انتخاب
  minTimeSelectable?: Date;
  // حداکثر زمان قابل انتخاب
  maxTimeSelectable?: Date;
  // حالت فقط خواندنی
  readOnly?: boolean;
  // متن راهنما
  helperText?: string;
  // استایل‌های سفارشی
  sx?: any;
  required?: boolean;
  disabled?: boolean;
};

const TimeTextfieldComponent = <T extends FieldValues>({
  control,
  errors,
  controllerName,
  label,
  minTimeSelectable,
  maxTimeSelectable,
  readOnly = false,
  helperText,
  sx,
  required = true,
  disabled = false,
}: TimeTextfieldComponentProps<T>) => {
  // مدیریت وضعیت باز بودن پیکر زمان
  const [open, setOpen] = useState(false);
  const errorMessage = get(errors, controllerName as string)?.message;

  return (
    <FormControl fullWidth sx={sx}>
      <Controller
        name={controllerName}
        control={control}
        render={({ field: { value, onChange } }) => (
          <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <MobileTimePicker
              readOnly={readOnly}
              minTime={minTimeSelectable}
              maxTime={maxTimeSelectable}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              value={parseTime(value)}
              disabled={disabled}
              onChange={(newValue) => {
                const formattedTime = formatTime(newValue);
                onChange(formattedTime);
              }}
              ampm={false} // استفاده از فرمت 24 ساعته
              minutesStep={1} // گام دقیقه‌ها
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    fullWidth
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
                    error={Boolean(errorMessage)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setOpen(true)} edge="end" disabled={disabled}>
                            <AccessTimeOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                ),
              }}
            />
          </LocalizationProvider>
        )}
      />
      {(errorMessage || helperText) && (
        <FormHelperText error={Boolean(errorMessage)}>{typeof errorMessage === 'string' ? errorMessage : helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default TimeTextfieldComponent;
