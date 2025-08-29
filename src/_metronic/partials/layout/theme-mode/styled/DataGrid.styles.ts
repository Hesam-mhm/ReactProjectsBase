import { ThemeModeType } from '../ThemeModeProvider';
import { commonStyles, lighten } from './Common.styles';
import { COLORS } from './constants';

export const getDataGridStyles = (themeMode: ThemeModeType) => ({
  MuiDataGrid: {
    styleOverrides: {
      root: {
        border: 'none',
        ...commonStyles,
        fontSize: 12,
        borderRadius: 0,
        '& .MuiDataGrid-columnHeaders': {
          borderTop: '1px solid rgba(224, 224, 224, 1)',
          backgroundColor: themeMode === 'dark' ? COLORS.GREY[800] : COLORS.GREY[100],
        },
        backgroundColor: themeMode === 'dark' ? COLORS.GREY[900] : COLORS.COMMON.WHITE,
        overflowX: 'auto',
        width: '100%',
        '& .MuiDataGrid-columnHeader': {
          borderRight: '1px solid rgba(224, 224, 224, 1)',
          '&:last-child': {
            borderRight: 'none',
          },
        },
        '& .MuiDataGrid-cell': {
          borderRight: '1px solid rgba(224, 224, 224, 1)',
          '&:last-child': {
            borderRight: 'none',
          },
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: '1px solid rgba(224, 224, 224, 1)',
        },
        '& .MuiDataGrid-virtualScroller': {
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: themeMode === 'dark' ? COLORS.GREY[800] : COLORS.GREY[100],
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: themeMode === 'dark' ? COLORS.GREY[700] : COLORS.GREY[300],
            borderRadius: '4px',
            '&:hover': {
              background: themeMode === 'dark' ? COLORS.GREY[600] : COLORS.GREY[400],
            },
          },
          '& .MuiDataGrid-row': {
            '&:last-child .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
          },
        },

        '& .hideRightSeparator': {
          backgroundColor: themeMode === 'dark' ? COLORS.GREY[900] : COLORS.GREY[100],
          color: themeMode === 'dark' ? COLORS.COMMON.WHITE : COLORS.COMMON.BLACK,
          fontWeight: 500,
          fontSize: '14px',
        },
        '& .MuiDataGrid-row': {
          fontSize: '12px',
          fontWeight: '400',
          color: themeMode === 'dark' ? COLORS.GREY[200] : COLORS.GREY[800],
          backgroundColor: COLORS.COMMON.WHITE,
        },
        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
          display: '-moz-initial',
        },
        '& .hideRightSeparator > .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
          outline: 'none',
        },
        '& .MuiDataGrid-virtualScrollerContent': {
          minWidth: { xs: '100%', sm: '1000px' },
        },
      },
    },
  },
});

export const getDataGridContainerStyles = () => ({
  flexDirection: 'row',
  borderRadius: '8px',
  mx: { xs: '8px', sm: '16px' },
  backgroundColor: COLORS.COMMON.WHITE,
  boxShadow: '0px 3px 15px rgba(141,141,141,5%)',
  overflowX: 'auto',
  overflowY: 'hidden',
  position: 'relative',
  '& .MuiPagination-root': {
    '& .MuiPagination-ul': {
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '4px',
    },
    '& .MuiPaginationItem-root': {
      margin: { xs: '0 2px', sm: '0 4px' },
      minWidth: { xs: '32px', sm: '25px' },
      height: { xs: '32px', sm: '25px' },
      borderRadius: '50%',
      '&.Mui-selected': {
        backgroundColor: COLORS.SECONDARY.MAIN,
        color: COLORS.COMMON.WHITE,
        '&:hover': {
          backgroundColor: COLORS.SECONDARY.DARK,
        },
      },
      '&:not(.Mui-selected)': {
        backgroundColor: COLORS.GREY[300],
        color: COLORS.COMMON.WHITE,
        '&:hover': {
          backgroundColor: COLORS.GREY[400],
        },
      },
      '&.MuiPaginationItem-previousNext': {
        '&:not(.Mui-disabled)': {
          backgroundColor: COLORS.SECONDARY.MAIN,
          color: COLORS.COMMON.WHITE,
          '&:hover': {
            backgroundColor: COLORS.SECONDARY.DARK,
          },
        },
        '&.Mui-disabled': {
          backgroundColor: COLORS.GREY[300],
          color: COLORS.COMMON.WHITE,
          opacity: 1,
        },
      },
    },
  },
});

export const getDataGridSelectStyles = () => ({
  '& .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${COLORS.SECONDARY.MAIN}`,
    borderRadius: '8px',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${COLORS.SECONDARY.MAIN}`,
  },
  '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${COLORS.SECONDARY.MAIN}`,
  },
  '&:hover:not(.Mui-error, .Mui-focused) .MuiOutlinedInput-notchedOutline': {
    border: `1px solid ${COLORS.SECONDARY.MAIN}`,
  },
  '& .MuiOutlinedInput-input': {
    color: COLORS.SECONDARY.MAIN,
    fontSize: '14px',
  },
  '& .MuiSelect-icon': {
    right: 'auto',
    left: '32px',
    color: COLORS.SECONDARY.MAIN,
    fontSize: '24px',
  },
  '&:hover .MuiSelect-icon': {
    color: COLORS.COMMON.WHITE,
  },
  '& .MuiSelect-select': {
    paddingLeft: '32px !important',
    paddingRight: '32px !important',
    textAlign: 'right',
    direction: 'rtl',
  },
  '&:hover .MuiSelect-select': {
    backgroundColor: COLORS.SECONDARY.MAIN,
    color: COLORS.COMMON.WHITE,
    borderRadius: '8px',
  },
  width: { xs: '100%', sm: '115px' },
  height: { xs: '40px', sm: '55px' },
});
