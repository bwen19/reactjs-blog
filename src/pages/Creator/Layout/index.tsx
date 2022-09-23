import React from 'react';
import { Outlet } from 'react-router-dom';

export default function CreatorLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
