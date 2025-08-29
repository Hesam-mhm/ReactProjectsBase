import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router';
import { WithChildren } from '../../../../helpers';
import { useLayout } from '../../../core';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { COLORS } from '../../../../partials/layout/theme-mode/styled/constants';

type Props = {
  to: string;
  title: string;
  icon?: ReactElement;
  fontIcon?: string;
  activeRoutes?: string[];
};

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({ children, to, title, icon, activeRoutes }) => {
  const { pathname } = useLocation();
  const { config } = useLayout();
  const theme = useTheme();

  // ✅ Smarter active check
  const isActive = activeRoutes && activeRoutes.length > 0 ? activeRoutes.some((route) => pathname.startsWith(route)) : pathname.startsWith(to);

  return (
    <div className={clsx('menu-item', { 'here show': isActive }, 'menu-accordion')} data-kt-menu-trigger="click">
      <Box
        component="span"
        className="menu-link"
        sx={{
          backgroundColor: isActive ? COLORS.GREY[200] : 'transparent',
          flexDirection: 'row',
          display: 'flex',
          height: 56,
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease-in-out',
          '&:hover, &:focus, &:active': {
            backgroundColor: COLORS.GREY[200],
          },
        }}
      >
        <Stack direction="row" alignItems="center">
          {icon &&
            React.cloneElement(icon, {
              style: {
                color: theme.palette.grey[700],
              },
            })}
          <Typography mx={2} fontSize={'14px'} fontWeight={500} color={COLORS.GREY[700]}>
            {title}
          </Typography>
        </Stack>

        <span className="menu-arrow"></span>
      </Box>

      <div
        className={clsx('menu-sub menu-sub-accordion', {
          'menu-active-bg': isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export { SidebarMenuItemWithSub };
