import { UserRole } from '@/api';
import { useAppSelector } from './reduxHook';

// -------------------------------------------------------------------

function getAllowedRoles(role: UserRole): UserRole[] {
  switch (role) {
    case 'admin':
      return ['admin'];
    case 'author':
      return ['admin', 'author'];
    default:
      return ['admin', 'author', 'user'];
  }
}

export default function useRoleAllowed(role: UserRole): boolean {
  const authUser = useAppSelector((state) => state.auth.authUser);
  if (!authUser) return false;

  const allowedRoles = getAllowedRoles(role);
  return allowedRoles.includes(authUser.role);
}
