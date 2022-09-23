import { useEffect } from 'react';

import { useAppDispatch } from './hooks';
import { autoLoginThunk } from './redux/authSlice';
import CustomThemeProvider from './themes';
import Routes from './routes';
import { AlertMessage, ConfirmDialog, LoginDialog, RegisterDialog } from './components';

// ---------------------------------------------------------------------------

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(autoLoginThunk());
  }, [dispatch]);

  return (
    <CustomThemeProvider>
      <Routes />
      <AlertMessage />
      <ConfirmDialog />
      <LoginDialog />
      <RegisterDialog />
    </CustomThemeProvider>
  );
}
