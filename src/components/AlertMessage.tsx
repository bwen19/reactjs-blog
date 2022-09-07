import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Alert, AlertProps, Snackbar, Portal } from '@mui/material';
import { useAlert } from '@/hooks';

// -------------------------------------------------------------------
// Define alert bar for snackbar
const forwardFunc: ForwardRefRenderFunction<HTMLDivElement, AlertProps> = (props, ref) => (
  <Alert elevation={6} ref={ref} variant="filled" {...props} />
);

const AlertBar = forwardRef<HTMLDivElement, AlertProps>(forwardFunc);

// -------------------------------------------------------------------

export default function AlertMessage() {
  const { open, message, severity, alertId, onClose } = useAlert();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    onClose();
  };

  if (!message) return null;

  return (
    <Portal>
      <Snackbar
        open={open}
        key={alertId}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <AlertBar onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </AlertBar>
      </Snackbar>
    </Portal>
  );
}
