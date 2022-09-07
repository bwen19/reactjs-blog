import { showConfirm, closeConfirm } from '@/redux/confirmSlice';
import { useAppDispatch, useAppSelector } from './reduxHook';

// -------------------------------------------------------------------

interface ResolverFunc {
  (value: boolean): void;
}

let resFunc: ResolverFunc;

export default function useConfirm() {
  const { open, message } = useAppSelector((state) => state.confirm);
  const dispatch = useAppDispatch();

  const confirm = (msg: string): Promise<boolean> => {
    dispatch(showConfirm(msg));
    return new Promise((resolver: ResolverFunc) => {
      resFunc = resolver;
    });
  };

  const onConfirm = () => {
    if (resFunc) resFunc(true);
    dispatch(closeConfirm());
  };

  const onCancel = () => {
    if (resFunc) resFunc(false);
    dispatch(closeConfirm());
  };

  return { open, message, confirm, onConfirm, onCancel };
}
