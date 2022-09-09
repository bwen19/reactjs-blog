import { UserRole } from '@/api';

export const role2color = (role: UserRole) => {
  switch (role) {
    case 'admin':
      return 'error';
    case 'author':
      return 'secondary';
    case 'user':
      return 'primary';
    default:
      return 'primary';
  }
};

export const delete2color = (isDeleted: boolean) => {
  if (isDeleted) return 'error';
  return 'primary';
};

// -------------------------------------------------------------------
