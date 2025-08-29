import { CustomPaletteOptions } from '../PaletteOptionType';
import { lighten, commonStyles } from './Common.styles';
import { COLORS } from './constants';

export const getFormStyles = (palette: CustomPaletteOptions) => ({
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          ...commonStyles,
          borderColor: palette.grey?.[500],
          transition: 'border-color 0.1s ease-in-out',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.secondary?.main ?? COLORS.SECONDARY.MAIN,
        },
        '&.Mui-focused:hover .Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.secondary?.main,
        },
        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.grey?.[300],
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.error?.main ?? COLORS.ERROR.MAIN,
        },
        '&:hover:not(.Mui-error, .Mui-focused) .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.grey?.[500],
        },
      },
      input: {
        color: palette.grey?.[700],
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        backgroundColor: palette.background?.paper,
        color: palette.grey?.[700],
        '& .MuiOutlinedInput-notchedOutline': {
          ...commonStyles,
          borderColor: palette.grey?.[500],
          transition: 'border-color 0.1s ease-in-out',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.secondary?.main ?? COLORS.SECONDARY.MAIN,
        },
        '&.Mui-focused:hover .Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.secondary?.main,
        },
        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.grey?.[300],
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.error?.main ?? COLORS.ERROR.MAIN,
        },
        '&:hover:not(.Mui-error, .Mui-focused) .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.grey?.[500],
        },
      },
      select: {
        paddingRight: '8px',
      },
      icon: {
        right: '8px',
        color: palette.grey?.[700],
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          '& .MuiOutlinedInput-notchedOutline': {
            ...commonStyles,
            borderColor: palette.grey?.[500],
            transition: 'border-color 0.1s ease-in-out',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.secondary?.main ?? COLORS.SECONDARY.MAIN,
          },
          '&.Mui-focused:hover .Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.secondary?.main,
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.grey?.[300],
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.error?.main ?? COLORS.ERROR.MAIN,
          },
          '&:hover:not(.Mui-error, .Mui-focused) .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.grey?.[500],
          },
        },
      },
      listbox: {
        backgroundColor: palette.background?.paper,
      },
      option: {
        backgroundColor: palette.background?.paper,
        color: palette.grey?.[700],
      },
      popupIndicator: {
        color: palette.grey?.[700],
      },
      clearIndicator: {
        color: palette.grey?.[700],
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        '&.Mui-focused': {
          color: palette.secondary.main ?? COLORS.SECONDARY.MAIN,
        },
        '&.Mui-error': {
          color: palette.error.main ?? COLORS.ERROR.MAIN,
        },
        fontSize: 14,
        color: palette.text?.secondary ?? COLORS.GREY[600],
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        color: palette.error.main,
        fontFamily: 'Vazirmatn FD',
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        textAlign: 'left',
        marginTop: '3px',
        marginLeft: '14px',
        marginBottom: '0',
        marginRight: '14px',
        variants: [],
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: palette.grey?.[700],
        '&.Mui-checked': {
          color: palette.secondary.main,
        },
        '&:hover': {
          backgroundColor: lighten(palette.secondary.main ?? COLORS.SECONDARY.MAIN, 0.9),
        },
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        color: palette.grey?.[800],
      },
    },
  },
});
