import clsx from 'clsx';
import { KTIcon } from '../../../helpers'; // Ensure this helper exists and is imported correctly
import { useThemeMode } from './ThemeModeProvider'; // Adjust import path as needed
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
  toggleBtnClass?: string;
  toggleBtnIconClass?: string;
  menuPlacement?: string;
  menuTrigger?: string;
};

const ThemeModeSwitcher = ({
  toggleBtnClass = '',
  toggleBtnIconClass = 'fs-1',
  menuPlacement = 'bottom-end',
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
  const { mode, menuMode, updateMode, updateMenuMode } = useThemeMode();
  const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const calculatedMode = mode === 'system' ? systemMode : mode;
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchMode = (_mode: 'light' | 'dark' | 'system') => {
    updateMenuMode(_mode);
    updateMode(_mode);
    handleClose();
  };

  return (
    <>
      <IconButton
        className={clsx('btn btn-icon', toggleBtnClass)}
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {calculatedMode === 'dark' && (
          <KTIcon iconName='moon' className={clsx('theme-light-hide', toggleBtnIconClass)} />
        )}
        {calculatedMode === 'light' && (
          <KTIcon iconName='night-day' className={clsx('theme-dark-hide', toggleBtnIconClass)} />
        )}
      </IconButton>

      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: {
            minWidth: 175,
            borderRadius: 1,
            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
            bgcolor: theme => theme.palette.background.paper,
          },
        }}
      >
        <MenuItem
          selected={menuMode === 'light'}
          onClick={() => switchMode('light')}
        >
          <KTIcon iconName='night-day' className='fs-1' />
          <Typography sx={{ ml: 1 }}>Light</Typography>
        </MenuItem>
        <MenuItem
          selected={menuMode === 'dark'}
          onClick={() => switchMode('dark')}
        >
          <KTIcon iconName='moon' className='fs-1' />
          <Typography sx={{ ml: 1 }}>Dark</Typography>
        </MenuItem>
        <MenuItem
          selected={menuMode === 'system'}
          onClick={() => switchMode('system')}
        >
          <KTIcon iconName='screen' className='fs-1' />
          <Typography sx={{ ml: 1 }}>System</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export { ThemeModeSwitcher };
