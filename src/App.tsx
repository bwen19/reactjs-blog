import { useEffect } from 'react';
import { autoLoginThunk } from './redux/authSlice';
import { useAppDispatch } from './hooks';
import CustomThemeProvider from './themes';
import Routes from './Routes';
import { AlertMessage, ConfirmDialog, LoginDialog, RegisterDialog } from './components';

// ========================// App //======================== //

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
