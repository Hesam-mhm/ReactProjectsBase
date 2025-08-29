import { createContext, useContext, useEffect, useState } from "react";
import {ThemeProvider as MuiThemeProvider,createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeModeComponent } from "../../../assets/ts/layout";
import { toAbsoluteUrl } from "../../../helpers";
import { MuiStyledComponents } from "./styled";
import { createPalette } from "./styled/palette";

export type ThemeModeType = "dark" | "light" | "system";
export const themeModelSKey = "kt_theme_mode_value";
export const themeMenuModeLSKey = "kt_theme_mode_menu";

const systemMode = ThemeModeComponent.getSystemMode() as "light" | "dark";

type ThemeModeContextType = {
  mode: ThemeModeType;
  menuMode: ThemeModeType;
  updateMode: (_mode: ThemeModeType) => void;
  updateMenuMode: (_mode: ThemeModeType) => void;
};

const themeModeSwitchHelper = (_mode: ThemeModeType) => {
  const mode = _mode !== "system" ? _mode : systemMode;
  const imageUrl =
    "media/patterns/header-bg" + (mode === "light" ? ".jpg" : "-dark.jpg");
  document.body.style.backgroundImage = `url("${toAbsoluteUrl(imageUrl)}")`;
};

const getThemeModeFromLocalStorage = (lsKey: string): ThemeModeType => {
  if (!localStorage) {
    return "light";
  }

  const data = localStorage.getItem(lsKey);
  if (data === "dark" || data === "light" || data === "system") {
    return data;
  }

  if (document.documentElement.hasAttribute("data-bs-theme")) {
    const dataTheme = document.documentElement.getAttribute("data-bs-theme");
    if (
      dataTheme &&
      (dataTheme === "dark" || dataTheme === "light" || dataTheme === "system")
    ) {
      return dataTheme;
    }
  }

  return "system";
};

const defaultThemeMode: ThemeModeContextType = {
  mode: getThemeModeFromLocalStorage(themeModelSKey),
  menuMode: getThemeModeFromLocalStorage(themeMenuModeLSKey),
  updateMode: (_mode: ThemeModeType) => {},
  updateMenuMode: (_mode: ThemeModeType) => {},
};

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: defaultThemeMode.mode,
  menuMode: defaultThemeMode.menuMode,
  updateMode: (_mode: ThemeModeType) => {},
  updateMenuMode: (_menuMode: ThemeModeType) => {},
});

const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeModeType>(defaultThemeMode.mode);
  const [menuMode, setMenuMode] = useState<ThemeModeType>(
    defaultThemeMode.menuMode
  );

  const updateMode = (
    _mode: ThemeModeType,
    saveInLocalStorage: boolean = true
  ) => {
    setMode(_mode);
    if (saveInLocalStorage && localStorage) {
      localStorage.setItem(themeModelSKey, _mode);
    }

    if (saveInLocalStorage) {
      const updatedMode = _mode === "system" ? systemMode : _mode;
      document.documentElement.setAttribute("data-bs-theme", updatedMode);
    }
    ThemeModeComponent.init();
  };

  const updateMenuMode = (
    _menuMode: ThemeModeType,
    saveInLocalStorage: boolean = true
  ) => {
    setMenuMode(_menuMode);
    if (saveInLocalStorage && localStorage) {
      localStorage.setItem(themeMenuModeLSKey, _menuMode);
    }
  };

  useEffect(() => {
    updateMode(mode, false);
    updateMenuMode(menuMode, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const themeMode  = mode === "system" ? systemMode : mode

  const theme = () =>
    createTheme({
      direction: "rtl",
      typography: {
        fontFamily: "Vazirmatn FD",
      },
      palette: createPalette(themeMode),
      components: MuiStyledComponents({  palette: createPalette(themeMode),  themeMode }),
    });


  return (
    <ThemeModeContext.Provider
      value={{ mode, menuMode, updateMode, updateMenuMode }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export { ThemeModeProvider, useThemeMode, systemMode, themeModeSwitchHelper };
