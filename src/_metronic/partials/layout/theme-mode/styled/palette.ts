import { CustomPaletteOptions } from "../PaletteOptionType";
import { COLORS } from "./constants";

export const createPalette = (mode: "light" | "dark"): CustomPaletteOptions => {
  const isDark = mode === "dark";

  return {
    mode,
    primary: {
      main: COLORS.PRIMARY.MAIN,
      light: isDark ? COLORS.PRIMARY.LIGHT[100] : COLORS.PRIMARY.LIGHT[300],
      dark: isDark ? COLORS.PRIMARY.DARK[500] : COLORS.PRIMARY.DARK[100],
      contrastText: COLORS.COMMON.WHITE,
    },
    secondary: {
      main: COLORS.SECONDARY.MAIN,
      light: isDark ? COLORS.SECONDARY.LIGHT[100] : COLORS.SECONDARY.LIGHT[300],
      dark: isDark ? COLORS.SECONDARY.DARK[500] : COLORS.SECONDARY.DARK[100],
      contrastText: COLORS.COMMON.WHITE,
    },
    error: {
      main: COLORS.ERROR.MAIN,
      light: isDark ? COLORS.ERROR.LIGHT[100] : COLORS.ERROR.LIGHT[300],
      dark: isDark ? COLORS.ERROR.DARK[500] : COLORS.ERROR.DARK[100],
      contrastText: COLORS.COMMON.WHITE,
    },
    success: {
      main: COLORS.SUCCESS.MAIN,
      light: isDark ? COLORS.SUCCESS.LIGHT[100] : COLORS.SUCCESS.LIGHT[300],
      dark: isDark ? COLORS.SUCCESS.DARK[500] : COLORS.SUCCESS.DARK[100],
      contrastText: COLORS.COMMON.WHITE,
    },
    background: {
      default: isDark ? COLORS.COMMON.BLACK : COLORS.GREY[100],
      paper: isDark ? COLORS.GREY[900] : COLORS.COMMON.WHITE,
    },
    common: {
      white: COLORS.COMMON.WHITE,
      black: COLORS.COMMON.BLACK,
    },
    grey: {
      /** #F9F9F9 */
      100: COLORS.GREY[100],
      /** #EEEEEE */
      200: COLORS.GREY[200],
      /** #E2E2E2 */
      300: COLORS.GREY[300],
      /** #C6C6C6 */
      400: COLORS.GREY[400],
      /** #AAAAAA */
      500: COLORS.GREY[500],
      /** #8D8D8D */
      600: COLORS.GREY[600],
      /** #717171 */
      700: COLORS.GREY[700],
      /** #555555 */
      800: COLORS.GREY[800],
      /** #383838 */
      900: COLORS.GREY[900],
    },
    text: {
      primary: isDark ? COLORS.COMMON.WHITE : COLORS.COMMON.BLACK,
      secondary: isDark ? COLORS.GREY[400] : COLORS.GREY[600],
    },
  };
};
