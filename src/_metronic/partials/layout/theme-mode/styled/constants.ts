export const COLORS = {
  /** Primary color palette */
  PRIMARY: {
    /** #D71920 */
    MAIN: "#D71920",
    /** Light shades of primary color */
    LIGHT: {
      /** #FBDFE0 */
      100: "#FBDFE0",
      /** #F7CBCD */
      200: "#F7CBCD",
      /** #F4B7BA */
      300: "#F4B7BA",
      /** #F0A4A6 */
      400: "#F0A4A6",
      /** #ED9093 */
      500: "#ED9093",
      /** #E5686D */
      600: "#E5686D",
      /** #DE4146 */
      700: "#DE4146",
    },
    /** Dark shades of primary color */
    DARK: {
      /** #AD141A */
      100: "#AD141A",
      /** #830F14 */
      200: "#830F14",
      /** #590B0D */
      300: "#590B0D",
      /** #44080A */
      400: "#44080A",
      /** #2F0607 */
      500: "#2F0607",
    },
  },
  /** Secondary color palette */
  SECONDARY: {
    /** #FFA500 */
    MAIN: "#FFA500",
    /** Light shades of secondary color */
    LIGHT: {
      /** #FFF2DB */
      100: "#FFF2DB",
      /** #FFEAC5 */
      200: "#FFEAC5",
      /** #FFE3AF */
      300: "#FFE3AF",
      /** #FFDB99 */
      400: "#FFDB99",
      /** #FFD383 */
      500: "#FFD383",
      /** #FFC458 */
      600: "#FFC458",
      /** #FFB42C */
      700: "#FFB42C",
    },
    /** Dark shades of secondary color */
    DARK: {
      /** #CC8400 */
      100: "#CC8400",
      /** #996300 */
      200: "#996300",
      /** #664200 */
      300: "#664200",
      /** #4D3200 */
      400: "#4D3200",
      /** #332100 */
      500: "#332100",
    },
  },
  /** Error color palette */
  ERROR: {
    /** #FF0000 */
    MAIN: "#FF0000",
    /** Light shades of error color */
    LIGHT: {
      /** #FFDFDF */
      100: "#FFDFDF",
      /** #FFBFBF */
      200: "#FFBFBF",
      /** #FF9F9F */
      300: "#FF9F9F",
      /** #FF7F7F */
      400: "#FF7F7F",
      /** #FF5F5F */
      500: "#FF5F5F",
      /** #FF3F3F */
      600: "#FF3F3F",
      /** #FF1F1F */
      700: "#FF1F1F",
    },
    /** Dark shades of error color */
    DARK: {
      /** #DF0000 */
      100: "#DF0000",
      /** #BF0000 */
      200: "#BF0000",
      /** #9F0000 */
      300: "#9F0000",
      /** #7F0000 */
      400: "#7F0000",
      /** #5F0000 */
      500: "#5F0000",
    },
  },
  /** Success color palette */
  SUCCESS: {
    /** #00B051 */
    MAIN: "#00B051",
    /** Light shades of success color */
    LIGHT: {
      /** #DFF5E9 */
      100: "#DFF5E9",
      /** #BFEBD3 */
      200: "#BFEBD3",
      /** #9FE1BD */
      300: "#9FE1BD",
      /** #7FD7A8 */
      400: "#7FD7A8",
      /** #5FCD92 */
      500: "#5FCD92",
      /** #43BC6C */
      600: "#43BC6C",
      /** #3FC37C */
      700: "#3FC37C",
    },
    /** Dark shades of success color */
    DARK: {
      /** #009A46 */
      100: "#009A46",
      /** #00843C */
      200: "#00843C",
      /** #006E32 */
      300: "#006E32",
      /** #005828 */
      400: "#005828",
      /** #00421E */
      500: "#00421E",
    },
  },
  /** Grey color palette */
  GREY: {
    /** #F9F9F9 */
    100: "#F9F9F9",
    /** #EEEEEE */
    200: "#EEEEEE",
    /** #E2E2E2 */
    300: "#E2E2E2",
    /** #C6C6C6 */
    400: "#C6C6C6",
    /** #AAAAAA */
    500: "#AAAAAA",
    /** #8D8D8D */
    600: "#8D8D8D",
    /** #717171 */
    700: "#717171",
    /** #555555 */
    800: "#555555",
    /** #383838 */
    900: "#383838",
  },
  COMMON: {
    WHITE: "#FFFFFF",
    BLACK: "#1C1C1C",
  },
} as const;

export const TYPOGRAPHY = {
  FONT_FAMILY: "Vazirmatn FD",
  FONT_WEIGHT: {
    REGULAR: 400,
    MEDIUM: 500,
    BOLD: 700,
  },
  FONT_SIZE: {
    SMALL: "12px",
    MEDIUM: "16px",
    LARGE: "20px",
    H1: "32px",
    H2: "28px",
    H3: "24px",
    H4: "21px",
    H5: "19px",
    H6: "16px",
    P1: "14px",
    P2: "12px",
    P3: "11px",
  },
  LINE_HEIGHT: {
    H1: "54px",
    H2: "48px",
    H3: "41px",
    H4: "36px",
    H5: "32px",
    H6: "27px",
    P1: "24px",
    P2: "20px",
    P3: "19px",
  },
} as const;

export const SPACING = {
  SMALL: "8px",
  MEDIUM: "16px",
  LARGE: "24px",
} as const;

export const TRANSITIONS = {
  DEFAULT: "all 0.3s ease",
  FAST: "all 0.15s ease",
  SLOW: "all 0.5s ease",
} as const;
