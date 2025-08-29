import { COLORS } from './constants';
import { CustomPaletteOptions } from '../PaletteOptionType';

export const getRadioStyles = (palette: CustomPaletteOptions) => ({
  MuiRadio: {
    styleOverrides: {
      root: {
        color: COLORS.GREY[400],
        '&.Mui-checked': {
          color: COLORS.SECONDARY.MAIN,
        },
      },
    },
  },
});
