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

export default function LazyLoad(factory: () => Promise<{ default: React.ComponentType }>) {
  const Component = lazy(factory);
  const LinearLoader = (
    <ProgressWrapper>
      <LinearProgress color="primary" />
    </ProgressWrapper>
  );

  return function LazyComponent() {
    return (
      <Suspense fallback={LinearLoader}>
        <Component />
      </Suspense>
    );
  };
}
