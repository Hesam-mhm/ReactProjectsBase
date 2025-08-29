import { Box, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { TypographyStyles } from '../../../_metronic/partials/layout/theme-mode/styled/Common.styles';

type SnackbarProps = {
  title: string;
  bgColor: string;
  fontColor: string;
  icon?: ReactNode;
};

const CustomSnackbar = ({ bgColor, fontColor, icon, title }: SnackbarProps) => {
  return (
    <Box
      sx={{
        height: 56,
        bgcolor: bgColor,
        p: 2,
        marginTop: 2,
        marginX: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        borderRadius: '8px',
      }}
    >
      <Stack direction={'row'} alignItems={'center'}>
        {icon && icon}
        <Typography style={TypographyStyles.body1} color={fontColor}>
          {title}
        </Typography>
      </Stack>
    </Box>
  );
};

export default CustomSnackbar;
