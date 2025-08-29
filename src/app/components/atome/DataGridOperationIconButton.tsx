import { Box, IconButton, SxProps } from '@mui/material';
import { StatusColorType } from '../../types/GeneralTypes/StatusBox.type';

const DataGridOperationIconButton = ({ onClick, icon, color ,sx}: { onClick: () => void; icon: React.ReactNode; color?: StatusColorType ,sx?:SxProps }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <IconButton onClick={onClick} color={color || 'secondary'}>
        {icon}
      </IconButton>
    </Box>
  );
};

export default DataGridOperationIconButton;
