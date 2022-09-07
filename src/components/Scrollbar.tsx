import React from 'react';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { alpha, styled, SxProps, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ---------------------------------------------------------------------------

const StyledRoot = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}));

const StyledSimpleBar = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

// ---------------------------------------------------------------------------

interface IProps {
  children: React.ReactNode;
  sx: SxProps<Theme>;
}

export default function Scrollbar({ children, sx }: IProps) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return <Box sx={{ overflowX: 'auto', ...sx }}>{children}</Box>;
  }

  return (
    <StyledRoot>
      <StyledSimpleBar timeout={500} clickOnTrack={false} sx={sx}>
        {children}
      </StyledSimpleBar>
    </StyledRoot>
  );
}
