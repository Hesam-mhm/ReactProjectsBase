import { COLORS } from './constants';
import { CustomPaletteOptions } from '../PaletteOptionType';

export const getCardStyles = (palette: CustomPaletteOptions) => ({
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: COLORS.COMMON.WHITE,
        boxShadow: '0px 16px 50px -4px rgba(28, 28, 28, 0.1)',
        borderRadius: '8px',
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      title: {
        fontWeight: 700,
        fontSize: '16px',
      },
    },
  },
});
