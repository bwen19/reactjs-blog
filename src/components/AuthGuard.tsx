import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { Permission } from '@/api/common';

// ========================// Auth Guard //======================== //

interface IProps {
  rank: Permission;
  element: React.ReactElement;
}

export default function AuthGuard({ rank, element }: IProps) {
  const permission = useAppSelector((state) => state.auth.permission);

  return permission >= rank ? element : <Navigate to="/" replace />;
}
