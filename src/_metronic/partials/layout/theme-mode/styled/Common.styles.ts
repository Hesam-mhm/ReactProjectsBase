import { CustomPaletteOptions } from "../PaletteOptionType";
import { COLORS, TRANSITIONS, TYPOGRAPHY } from "./constants";
import { styled } from "@mui/material/styles";

// Helper functions to adjust color brightness
export const adjustColor = (color: string, amount: number) => {
  color = color.replace(/^#/, "");
  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  r = Math.min(255, Math.max(0, r + amount * 255));
  g = Math.min(255, Math.max(0, g + amount * 255));
  b = Math.min(255, Math.max(0, b + amount * 255));

  return `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

export const lighten = (color: string, amount: number) =>
  adjustColor(color, amount);
export const darken = (color: string, amount: number) =>
  adjustColor(color, -amount);

// Helper function to convert hex to RGB
export const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

// Common styles
export const commonStyles = {
  borderRadius: "8px",
  transition: TRANSITIONS.DEFAULT,
  fontFamily: TYPOGRAPHY.FONT_FAMILY,
  h1: {
    fontSize: TYPOGRAPHY.FONT_SIZE.H1,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.H1,
  },
};

// Theme-specific styles
export const getThemeStyles = (themeMode: "dark" | "light") => ({
  backgroundColor:
    themeMode === "dark" ? COLORS.COMMON.BLACK : COLORS.COMMON.WHITE,
  color: themeMode === "dark" ? COLORS.COMMON.WHITE : COLORS.COMMON.BLACK,
});

export const TypographyStyles = {
  h1: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE.H1,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.H1,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
  h2: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE.H2,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.H2,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
  h3: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE.H3,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.H3,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
  h4: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE.H4,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.H4,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
  h5: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE.H5,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.H5,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
  h6: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE.H6,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.H6,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
  body1: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE.P1,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.P1,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.REGULAR,
  },
  body2: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE.P2,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.P2,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.REGULAR,
  },
  caption: {
    fontFamily: TYPOGRAPHY.FONT_FAMILY,
    fontSize: TYPOGRAPHY.FONT_SIZE.P3,
    lineHeight: TYPOGRAPHY.LINE_HEIGHT.P3,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.REGULAR,
  },
};

// اضافه کردن وزن‌های فونت داینامیک
export const getTypographyStyle = (
  variant: keyof typeof TypographyStyles,
  weight: "REGULAR" | "MEDIUM" | "BOLD" = "REGULAR"
) => ({
  ...TypographyStyles[variant],
  fontWeight: TYPOGRAPHY.FONT_WEIGHT[weight],
});

// مثال استفاده:
// const myStyle = getTypographyStyle('h1', 'BOLD'); // h1 با وزن BOLD
// const myStyle = getTypographyStyle('body1', 'MEDIUM'); // body1 با وزن MEDIUM
// const myStyle = getTypographyStyle('caption'); // caption با وزن پیش‌فرض REGULAR
