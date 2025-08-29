import { parseISO, format } from 'date-fns';
import * as dateTool from 'date-fns-jalali';

type UtilsType = {
  formatToShamsiDate: (date: string | Date, formatStr?: string) => string;
  formatNumber: (number: number) => string;
  formatCurrency: (amount: number) => string;
  truncateText: (text: string, maxLength: number) => string;
  isValidEmail: (email: string) => boolean;
  isValidPhoneNumber: (phone: string) => boolean;
  /**
   * تبدیل تاریخ به فرمت YYYY-MM-DD HH:mm:ss
   * @example
   * formatToNormalGeorgianDateTime('2024-03-20') // => '20-03-2024 00:00:00'
   * formatToNormalGeorgianDateTime(new Date()) // => '20-03-2024 16:47:27'
   */
  formatToNormalGeorgianDateTime: (date: string | Date, formatStr?: string) => string;
};

export const utils: UtilsType = {
  /**
   * تبدیل تاریخ به فرمت فارسی
   * @example
   * formatToShamsiDate('2024-03-20') // => '1403/01/01'
   * formatToShamsiDate(new Date(), 'yyyy/MM/dd HH:mm') // => '1403/01/01 14:30'
   * formatToShamsiDate('2024-03-20', 'dd MMMM yyyy') // => '1 فروردین 1403'
   */
  formatToShamsiDate: (date: string | Date, formatStr: string = 'yyyy/MM/dd') => {
    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      return dateTool.format(parsedDate, formatStr);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  },
  /**
   * تبدیل تاریخ به فرمت DD-MM-YYYY HH:mm:ss
   * @example
   * formatToNormalGeorgianDateTime(new Date()) // => '2024-03-02 16:47:27'
   */
  formatToNormalGeorgianDateTime: (date: string | Date, formatStr: string = 'yyyy-MM-dd HH:mm:ss') => {
    try {
      const parsedDate = typeof date === 'string' ? parseISO(date) : date;
      return format(parsedDate, formatStr);
    } catch (error) {
      console.error('Error formatting date time:', error);
      return '';
    }
  },
  /**
   * فرمت‌بندی اعداد به فرمت فارسی
   * @example
   * formatNumber(1000000) // => '۱,۰۰۰,۰۰۰'
   * formatNumber(1234.56) // => '۱,۲۳۴.۵۶'
   */
  formatNumber: (number: number) => {
    return new Intl.NumberFormat('fa-IR').format(number);
  },

  /**
   * نمایش مبالغ به ریال
   * @example
   * formatCurrency(1000000) // => 'ریال ۱,۰۰۰,۰۰۰'
   * formatCurrency(5000000) // => 'ریال ۵,۰۰۰,۰۰۰'
   */
  formatCurrency: (amount: number) => {
    const formatted = new Intl.NumberFormat('fa-IR', {
      maximumFractionDigits: 0,
      style: 'decimal',
    }).format(amount);

    return `${formatted} ریال`;
  },

  /**
   * کوتاه کردن متن‌های طولانی
   * @example
   * truncateText('این یک متن طولانی است', 10) // => 'این یک متن...'
   * truncateText('متن کوتاه', 20) // => 'متن کوتاه'
   */
  truncateText: (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  },

  /**
   * اعتبارسنجی ایمیل
   * @example
   * isValidEmail('test@example.com') // => true
   * isValidEmail('invalid-email') // => false
   */
  isValidEmail: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * اعتبارسنجی شماره موبایل
   * @example
   * isValidPhoneNumber('09123456789') // => true
   * isValidPhoneNumber('1234567890') // => false
   */
  isValidPhoneNumber: (phone: string) => {
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone);
  },
};
