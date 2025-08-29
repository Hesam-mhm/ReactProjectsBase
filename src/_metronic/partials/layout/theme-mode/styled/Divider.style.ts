import { COLORS } from './constants';
import { CustomPaletteOptions } from '../PaletteOptionType';

export const getDividerStyles = (palette: CustomPaletteOptions) => ({
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: COLORS.GREY[400],
      },
    },
  },
});
