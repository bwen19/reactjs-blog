import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useConfirm } from '@/hooks';

// -------------------------------------------------------------------

export default function ConfirmDialog() {
  const { open, message, onConfirm, onCancel } = useConfirm();

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{message}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete these records? This process cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pl: 2 }}>
        <Button color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="warning" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
