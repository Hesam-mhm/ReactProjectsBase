import { CustomPaletteOptions } from '../PaletteOptionType';
import { lighten, hexToRgb, commonStyles } from './Common.styles';
import { COLORS } from './constants';

export const getButtonStyles = (palette: CustomPaletteOptions) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: '500',
        fontSize: '14px',
        padding: '16px 24px',
        '& .MuiButton-startIcon, & .MuiButton-endIcon': {
          '& > *:first-of-type': {
            width: '24px',
            height: '24px',
          },
        },
      },

      contained: ({ ownerState }: any) => {
        const colorKey = ownerState.color || 'primary';
        const colorObj = COLORS[colorKey.toUpperCase()];
        const mainColor = palette[colorKey]?.main ?? colorObj?.MAIN ?? palette.primary.main;
        const lightColor = colorObj?.LIGHT?.[500] ?? palette[colorKey]?.light;

        return {
          backgroundColor: mainColor,
          color: COLORS.COMMON.WHITE,
          ...commonStyles,
          boxShadow: `0px 4px 16px rgba(${hexToRgb(mainColor)}, 0.3)`,
          '&:disabled': {
            backgroundColor: palette.grey?.[300],
            color: palette.grey?.[600],
          },
          '&:hover': {
            backgroundColor: lightColor,
            boxShadow: `0px 4px 16px rgba(${hexToRgb(mainColor)}, 0.3)`,
          },
          '&:active': {
            backgroundColor: lightColor,
            boxShadow: `0px 4px 16px rgba(${hexToRgb(mainColor)}, 0.3)`,
          },
        };
      },

      outlined: ({ ownerState }: any) => {
        const colorKey = ownerState.color ?? 'secondary';
        const colorObj = COLORS[colorKey.toUpperCase()];
        const mainColor = palette[colorKey]?.main ?? colorObj?.MAIN ?? palette.secondary.main;
        const borderColor = lighten(mainColor, 0.2);

        return {
          borderColor,
          ...commonStyles,
          color: mainColor,

          '&:hover, &:active': {
            backgroundColor: mainColor,
            borderColor: mainColor,
            color: COLORS.COMMON.WHITE,
          },

          '&:disabled': {
            borderColor: palette.grey?.[300],
            color: palette.grey?.[600],
          },
        };
      },
    },
  },
});
