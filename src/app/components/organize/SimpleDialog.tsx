import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TypographyStyles } from '../../../_metronic/partials/layout/theme-mode/styled/Common.styles';
import { ReactNode } from 'react';

type SimpleDialogProps = {
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  buttonLoading?: boolean;
  buttonOnclick: () => void;
  dialogContentText: string;
  dialogTitle: string;
  mainButtonTitle: string;
  dialogContentElement?: ReactNode;
  onClose?: () => void;
};

const SimpleDialog = ({
  showDialog,
  setShowDialog,
  buttonLoading,
  buttonOnclick,
  dialogContentText,
  dialogTitle,
  mainButtonTitle,
  dialogContentElement = <></>,
  onClose = () => setShowDialog(false),
}: SimpleDialogProps) => {
  return (
    <>
      <Dialog open={showDialog} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: '314px', borderRadius: '8px', boxShadow: 'none' } }}>
        <DialogTitle sx={{ p: '16px', mx: '0px' }} style={TypographyStyles.h6}>
          {dialogTitle}
        </DialogTitle>
        <Divider variant="fullWidth" />
        <DialogContent sx={{ p: '16px', mx: '0px' }}>
          <DialogContentText style={TypographyStyles.body1} color={(theme) => theme.palette.grey[900]}>
            {dialogContentText}
          </DialogContentText>
          {dialogContentElement}
        </DialogContent>
        <DialogActions sx={{ p: '16px', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: 1 }}>
          <Button
            onClick={() => {
              setShowDialog(false);
            }}
            variant="outlined"
            color="secondary"
            fullWidth
          >
            انصراف
          </Button>
          <LoadingButton
            variant="contained"
            onClick={buttonOnclick}
            loading={buttonLoading}
            fullWidth
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {mainButtonTitle}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SimpleDialog;
