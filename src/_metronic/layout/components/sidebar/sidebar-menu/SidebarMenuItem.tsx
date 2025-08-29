import { FC, ReactElement, ReactNode } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { checkIsActive, WithChildren } from "../../../../helpers";
import { useLayout } from "../../../core";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Stack, Typography, useTheme } from "@mui/material";
import { DotIcon } from "../../../../../app/Iconify/DotIcon";
import React from "react";
import { COLORS } from "../../../../partials/layout/theme-mode/styled/constants";

type Props = {
  to: string;
  title: string;
  outLinedIcon?: ReactElement;
  boldIcon?: ReactElement;
  fontIcon?: string;
  hasBullet?: boolean;
  isSubMenuChild?: boolean;
};

const SidebarMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  outLinedIcon,
  boldIcon,
  hasBullet = false,
  isSubMenuChild = false,
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to);
  const { config } = useLayout();
  const { app } = config;

  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        bgcolor: isActive
          ? theme.palette.primary.main
          : theme.palette.background.paper,
        height: 56,
        borderRadius: "8px",
        p: isSubMenuChild ? 0 : 2,
        my: "8px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Link
        style={{
          backgroundColor: isActive
            ? theme.palette.primary.main
            : theme.palette.background.paper,
          flexDirection: "row",
          display: "flex",
          height: 56,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        className={clsx("menu-link without-sub", { active: isActive })}
        to={to}
      >
        {hasBullet && (
          <DotIcon
            style={{
              color: isActive
                ? theme.palette.common.white
                : theme.palette.primary.main,
            }}
          />
        )}
        {isActive &&
          boldIcon &&
          React.cloneElement(boldIcon, {
            style: {
              color: COLORS.COMMON.WHITE,
            },
          })}
        {!isActive &&
          outLinedIcon &&
          React.cloneElement(outLinedIcon, {
            style: {
              color: COLORS.GREY[700],
            },
          })}
        <Typography
          mx={2}
          fontSize={"14px"}
          fontWeight={500}
          color={isActive ? theme.palette.common.white : COLORS.GREY[700]}
        >
          {title}
        </Typography>
      </Link>
      {children}
    </Stack>
  );
};

export { SidebarMenuItem };
