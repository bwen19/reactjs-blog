import { AlertColor } from '@mui/material';
import { useAppDispatch, useAppSelector } from './reduxHook';
import { closeAlert, showAlert } from '@/redux/alertSlice';

// -------------------------------------------------------------------

export default function useAlert() {
  const { open, message, severity, alertId } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  const alertMsg = (msg: string, svt?: AlertColor) => {
    dispatch(showAlert({ message: msg, severity: svt }));
  };

  const onClose = () => {
    dispatch(closeAlert());
  };

  return { open, message, severity, alertId, alertMsg, onClose };
}
