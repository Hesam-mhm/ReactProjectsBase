import { PaletteColor, PaletteOptions } from "@mui/material";

export interface CustomPaletteOptions extends PaletteOptions {
    primary: PaletteColor;
    secondary: PaletteColor;
    error:PaletteColor
    background?: {
        default: string;
        paper: string;
    };
    text?: {
        primary: string;
        secondary: string;
        disabled?: string;
    };
}
