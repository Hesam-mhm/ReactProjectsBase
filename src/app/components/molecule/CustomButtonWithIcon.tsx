import { LoadingButton } from '@mui/lab';
import { SxProps } from '@mui/material';
import { ReactNode } from 'react';

type CustomButtonWithIconType = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactNode;
  buttonTitle: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  sx?: SxProps;
  height?: string;
  loading?: boolean;
};

const CustomButtonWithIcon = ({
  onClick,
  startIcon,
  buttonTitle,
  disabled = false,
  type = 'button',
  fullWidth = false,
  variant = 'contained',
  color = 'primary',
  sx,
  height,
  loading = false,
}: CustomButtonWithIconType) => {
  return (
    <>
      <LoadingButton
        variant={variant}
        startIcon={startIcon ?? undefined}
        onClick={onClick ?? undefined}
        disabled={disabled}
        fullWidth={fullWidth}
        type={type}
        color={color}
        loading={loading}
        sx={{ ...sx, px: '16px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', height: height }}
      >
        {buttonTitle}
      </LoadingButton>
    </>
  );
};

export default CustomButtonWithIcon;
