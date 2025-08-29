import { ThemeModeType } from '../ThemeModeProvider';
import { commonStyles, lighten } from './Common.styles';
import { COLORS } from './constants';

export const getAccordionStyles = (themeMode: ThemeModeType) => ({
  MuiAccordion: {
    styleOverrides: {
      root: {
        ...commonStyles,
        backgroundColor: themeMode === 'dark' ? COLORS.GREY[900] : COLORS.COMMON.WHITE,
        color: themeMode === 'dark' ? COLORS.GREY[100] : COLORS.GREY[900],
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.04)',
        border: `1px solid ${themeMode === 'dark' ? COLORS.GREY[800] : COLORS.GREY[200]}`,
        margin: '8px 0',
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: '0px',
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        backgroundColor: themeMode === 'dark' ? COLORS.GREY[800] : COLORS.GREY[100],
        color: themeMode === 'dark' ? COLORS.GREY[100] : COLORS.GREY[900],
        borderBottom: `1px solid ${themeMode === 'dark' ? COLORS.GREY[700] : COLORS.GREY[200]}`,
        minHeight: '48px',
        height: '48px',
        transition: 'none', // حذف انیمیشن اسکیل
        '&.Mui-expanded': {
          minHeight: '48px',
          height: '48px',
          transition: 'none',
        },
        '& .MuiAccordionSummary-content': {
          margin: '12px 0',
          transition: 'none',
          '&.Mui-expanded': {
            margin: '12px 0',
            transition: 'none',
          },
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
          color: themeMode === 'dark' ? COLORS.GREY[200] : COLORS.GREY[700],
          transition: 'none',
        },
      },
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        // padding: '16px',
        backgroundColor: themeMode === 'dark' ? COLORS.GREY[900] : COLORS.COMMON.WHITE,
        color: themeMode === 'dark' ? COLORS.GREY[100] : COLORS.GREY[900],
      },
    },
  },
});

