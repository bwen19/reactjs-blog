import { Navigate } from 'react-router-dom';
import useRoleAllowed from '@/hooks/useRoleAllowed';
import { useAppSelector } from '@/hooks/reduxHook';
import { UserRole } from '@/api/common';

// ---------------------------------------------------------------------------

interface AuthGuardProps {
  element: JSX.Element;
}

export function AuthGuard({ element }: AuthGuardProps) {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? element : <Navigate to="/" replace />;
}

// ---------------------------------------------------------------------------

interface RoleGuardProps {
  allow: UserRole;
  element: JSX.Element;
}

export function RoleGuard({ allow, element }: RoleGuardProps) {
  const allowed = useRoleAllowed(allow);

  return allowed ? element : <Navigate to="/" replace />;
}
