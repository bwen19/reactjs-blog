import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Creator() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
