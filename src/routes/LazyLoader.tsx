import React, { lazy, Suspense } from 'react';
import { styled } from '@mui/material/styles';
import { LinearProgress } from '@mui/material';

// ---------------------------------------------------------------------------

const ProgressWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
});

// ---------------------------------------------------------------------------

export default function LazyLoader(factory: () => Promise<{ default: React.ComponentType }>) {
  const Component = lazy(factory);
  const LinearLoading = (
    <ProgressWrapper>
      <LinearProgress color="primary" />
    </ProgressWrapper>
  );

  return function LazyComponent() {
    return (
      <Suspense fallback={LinearLoading}>
        <Component />
      </Suspense>
    );
  };
}
