import { PopperPlacementType } from '@mui/material';
import { Permission, UserRole } from '@/api';

// -------------------------------------------------------------------

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

export function role2Permission(role: UserRole): Permission {
  switch (role) {
    case 'user':
      return Permission.USER;
    case 'author':
      return Permission.AUTHOR;
    case 'admin':
      return Permission.ADMIN;
    default:
      return Permission.GHOST;
  }
}

// -------------------------------------------------------------------

export const placement2transform = (placement: PopperPlacementType): string => {
  switch (placement) {
    case 'bottom-start':
      return 'top left';
    case 'bottom':
      return 'top';
    case 'bottom-end':
      return 'top right';
    case 'top-end':
      return 'bottom right';
    case 'top':
      return 'bottom';
    case 'top-start':
    default:
      return 'bottom left';
  }
};
