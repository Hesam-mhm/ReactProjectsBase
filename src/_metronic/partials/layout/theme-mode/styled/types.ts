import { Theme } from '@mui/material/styles';
import { CustomPaletteOptions } from '../PaletteOptionType';
import { ThemeModeType } from '../ThemeModeProvider';

export type StyledComponentProps = {
  palette: CustomPaletteOptions;
  themeMode: ThemeModeType;
};

export type StyleFunction = (props: StyledComponentProps) => Partial<Theme['components']>;

export type StyleConfig = {
  [key: string]: {
    styleOverrides: {
      [key: string]: any;
    };
  };
}; 