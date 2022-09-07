import { alpha, Theme } from '@mui/material/styles';

export default function styleOverrides(theme: Theme) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflowY: 'scroll',
          backgroundColor: '#e7ebf0',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          '&.Mui-selected': {
            color: theme.palette.primary.light,
            fontWeight: theme.typography.fontWeightBold,
          },
          '&:hover': {
            color: alpha(theme.palette.primary.light, 1),
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[700],
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.light, 0.2),
            fontWeight: theme.typography.fontWeightBold,
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main,
            },
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.2),
            '& .MuiListItemIcon-root': {
              color: theme.palette.primary.main,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[700],
          fontWeight: theme.typography.fontWeightLight,
          minWidth: '32px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          primary: {
            color: theme.palette.text.secondary,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[300],
          '& .MuiTableCell-root': {
            fontWeight: 600,
            lineHeight: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '& .MuiOutlinedInput-notchedOutlined': {
            borderColor: theme.palette.grey[300],
          },
          '&:hover $notchedOutlined': {
            borderColor: theme.palette.primary.light,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontSize: '0.9rem',
          fontWeight: 500,
          padding: '14px 14px',
          borderRadius: '8px',
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: '8px',
        },
      },
    },
  };
}
