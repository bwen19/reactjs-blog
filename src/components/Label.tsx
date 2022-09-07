import { alpha, styled, SxProps, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';

// -------------------------------------------------------------------

type ThemeColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
type LabelColor = 'default' | ThemeColor;
type LabelType = 'filled' | 'outlined' | 'ghost';

interface ISpan {
  ownerState: {
    color: LabelColor;
    variant: LabelType;
  };
}

const StyledSpan = styled('span')<ISpan>(({ theme, ownerState }) => {
  const isLight = theme.palette.mode === 'light';
  const { color, variant } = ownerState;

  const styleFilled = (c: ThemeColor) => ({
    color: theme.palette[c].contrastText,
    backgroundColor: theme.palette[c].main,
  });

  const styleOutlined = (c: ThemeColor) => ({
    color: theme.palette[c].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[c].main}`,
  });

  const styleGhost = (c: ThemeColor) => ({
    color: theme.palette[c][isLight ? 'dark' : 'light'],
    backgroundColor: alpha(theme.palette[c].main, 0.16),
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'default'
      ? {
          ...(variant === 'filled' && { ...styleFilled(color) }),
          ...(variant === 'outlined' && { ...styleOutlined(color) }),
          ...(variant === 'ghost' && { ...styleGhost(color) }),
        }
      : {
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[500]}`,
          }),
          ...(variant === 'ghost' && {
            color: isLight ? theme.palette.text.secondary : theme.palette.common.white,
            backgroundColor: theme.palette.grey[500],
          }),
        }),
  };
});

// ----------------------------------------------------------------------

interface IProps {
  children: React.ReactNode;
  color: LabelColor;
  variant: LabelType;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function Label(props: IProps) {
  const { children, color = 'default', variant = 'ghost', startIcon = null, endIcon = null, sx = {} } = props;
  const style = {
    width: 16,
    height: 16,
    '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
  };

  return (
    <StyledSpan
      ownerState={{ color, variant }}
      sx={{
        ...(startIcon && { pl: 0.75 }),
        ...(endIcon && { pr: 0.75 }),
        ...sx,
      }}
    >
      {startIcon && <Box sx={{ mr: 0.75, ...style }}>{startIcon}</Box>}

      {children}

      {endIcon && <Box sx={{ ml: 0.75, ...style }}>{endIcon}</Box>}
    </StyledSpan>
  );
}
