import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import CustomThemeProvider from './themes';
import { useAppDispatch } from './hooks/reduxHook';
import { autoLoginThunk } from './redux/authSlice';
import ConfirmDialog from './components/ConfirmDialog';
import AlertMessage from './components/AlertMessage';

// ---------------------------------------------------------------------------

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(autoLoginThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <CustomThemeProvider>
        <Routes />
        <ConfirmDialog />
        <AlertMessage />
      </CustomThemeProvider>
    </BrowserRouter>
  );
}
