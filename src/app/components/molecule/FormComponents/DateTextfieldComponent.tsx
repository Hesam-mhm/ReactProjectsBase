import { FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { SolarCalendarOutline } from '../../../Iconify/SolarCalendarOutline';

/**
 * کامپوننت انتخاب تاریخ با قابلیت‌های پیشرفته
 *
 * ویژگی‌های اصلی:
 * - پشتیبانی از تقویم شمسی
 * - پشتیبانی از محدوده تاریخ (به روز)
 * - پشتیبانی از حالت فقط خواندنی
 * - پشتیبانی از validation
 * - پشتیبانی از RTL
 *
 * مثال‌های استفاده:
 *
 * 1. استفاده پایه:
 * <DateTextfieldComponent
 *   control={control}
 *   controllerName="date"
 *   label="تاریخ"
 * />
 *
 * 2. استفاده با محدوده تاریخ:
 * <DateTextfieldComponent
 *   control={control}
 *   controllerName="birthDate"
 *   label="تاریخ تولد"
 *   minDateSelectable={1} // 1 روز قبل
 *   maxDateSelectable={1} // 1 روز بعد
 * />
 *
 * 3. استفاده با validation:
 * <DateTextfieldComponent
 *   control={control}
 *   controllerName="appointmentDate"
 *   label="تاریخ قرار ملاقات"
 *   helperText="لطفا تاریخ معتبر وارد کنید"
 * />
 *
 * 4. استفاده با حالت فقط خواندنی:
 * <DateTextfieldComponent
 *   control={control}
 *   controllerName="registrationDate"
 *   label="تاریخ ثبت‌نام"
 *   readOnly={true}
 * />
 *
 * 5. استفاده با استایل‌های سفارشی:
 * <DateTextfieldComponent
 *   control={control}
 *   controllerName="eventDate"
 *   label="تاریخ رویداد"
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
 * 6. استفاده با محدوده تاریخ پیشرفته:
 * <DateTextfieldComponent
 *   control={control}
 *   controllerName="projectDeadline"
 *   label="مهلت پروژه"
 *   minDateSelectable={7} // یک هفته قبل
 *   maxDateSelectable={30} // یک ماه بعد
 * />
 *
 * 7. استفاده در فرم ثبت‌نام:
 * <DateTextfieldComponent
 *   control={control}
 *   controllerName="birthDate"
 *   label="تاریخ تولد"
 *   minDateSelectable={36500} // 100 سال قبل
 *   maxDateSelectable={0} // فقط تاریخ‌های گذشته
 *   helperText="لطفا تاریخ تولد خود را وارد کنید"
 * />
 *
 * 8. استفاده در فرم رزرو:
 * <DateTextfieldComponent
 *   control={control}
 *   controllerName="reservationDate"
 *   label="تاریخ رزرو"
 *   minDateSelectable={0} // فقط تاریخ‌های آینده
 *   maxDateSelectable={30} // تا یک ماه بعد
 *   helperText="لطفا تاریخ رزرو را انتخاب کنید"
 * />
 *
 * 9. استفاده بدون محدوده (بی‌نهایت):
 * <DateTextfieldComponent
 *   control={control}
 *   controllerName="anyDate"
 *   label="هر تاریخی"
 *   // minDateSelectable و maxDateSelectable پاس نشده = بی‌نهایت
 * />
 */

// تابع کمکی برای تبدیل تاریخ به فرمت yyyy-MM-dd
const formatDate = (date: Date | null): string | null => {
  if (!date) return null;

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

// تابع کمکی برای تبدیل رشته تاریخ به شیء Date
const parseDate = (dateStr: string | null): Date | null => {
  if (!dateStr) return null;

  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

type DateTextfieldComponentProps<T extends FieldValues> = {
  // کنترل فرم از react-hook-form
  control: Control<T>;
  // خطاهای فرم
  errors?: FieldErrors<T>;
  // نام فیلد در فرم
  controllerName: Path<T>;
  // برچسب فیلد
  label: string;
  // حداقل تاریخ قابل انتخاب (به روز) - اگر پاس نشود بی‌نهایت
  minDateSelectable?: number;
  // حداکثر تاریخ قابل انتخاب (به روز) - اگر پاس نشود بی‌نهایت
  maxDateSelectable?: number;
  // حالت فقط خواندنی
  readOnly?: boolean;
  // متن راهنما
  helperText?: string;
  // استایل‌های سفارشی
  sx?: any;
  required?: boolean;
  disabled?: boolean;
};

const DateTextfieldComponent = <T extends FieldValues>({
  control,
  errors,
  controllerName,
  label,
  minDateSelectable,
  maxDateSelectable,
  readOnly = false,
  helperText,
  sx,
  required = true,
  disabled = false,
}: DateTextfieldComponentProps<T>) => {
  // محاسبه تاریخ‌های حداقل و حداکثر (به روز)
  const today = new Date();
  const minDate = minDateSelectable !== undefined ? new Date(today.getTime() - minDateSelectable * 24 * 60 * 60 * 1000) : null;
  const maxDate = maxDateSelectable !== undefined ? new Date(today.getTime() + maxDateSelectable * 24 * 60 * 60 * 1000) : null;

  return (
    <FormControl fullWidth sx={sx}>
      <Controller
        name={controllerName}
        control={control}
        render={({ field: { value, onChange } }) => (
          <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <DatePicker
              readOnly={readOnly}
              disabled={disabled}
              minDate={minDate}
              maxDate={maxDate}
              value={parseDate(value)}
              onChange={(newValue) => {
                const formattedDate = formatDate(newValue);
                onChange(formattedDate);
              }}
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
              slotProps={{
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      marginTop: '8px',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                  },
                  placement: 'bottom-start',
                  modifiers: [
                    {
                      name: 'preventOverflow',
                      enabled: true,
                      options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: false,
                        rootBoundary: 'viewport',
                        padding: 8,
                      },
                    },
                  ],
                },
                textField: {
                  fullWidth: true,
                  dir: 'rtl',
                  error: Boolean(errors?.[controllerName]),
                },
              }}
              slots={{
                openPickerIcon: SolarCalendarOutline,
              }}
            />
          </LocalizationProvider>
        )}
      />
      {(errors?.[controllerName] || helperText) && (
        <FormHelperText error={Boolean(errors?.[controllerName])}>{(errors?.[controllerName]?.message as string) || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default DateTextfieldComponent;
