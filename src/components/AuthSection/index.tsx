import { useState } from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

// -------------------------------------------------------------------

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialog-paper': {
    width: 420,
  },
}));

// -------------------------------------------------------------------

export default function AuthSection() {
  const [open, setOpen] = useState<boolean>(false);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const [newEmail, setNewEmail] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setShowLoginForm(true);
    setOpen(false);
  };

  const handleSwitch = () => {
    setShowLoginForm((prev) => !prev);
  };

  const handleSaveEmail = (email: string) => {
    setNewEmail(email);
  };

  return (
    <>
      <Button color="neutral" size="small" variant="outlined" onClick={handleOpen}>
        Login
      </Button>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogContent>
          {showLoginForm ? (
            <LoginForm onClose={handleClose} onSwitch={handleSwitch} newEmail={newEmail} />
          ) : (
            <RegisterForm onSwitch={handleSwitch} onSaveEmail={handleSaveEmail} />
          )}
        </DialogContent>
      </StyledDialog>
    </>
  );
}
