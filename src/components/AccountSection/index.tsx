import { Link } from 'react-router-dom';
import { Badge, Box, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IMenuConfig, Permission } from '@/api';
import { useAppSelector } from '@/hooks';
import CustomIconButton from '../CustomIconButton';
import AccountPopper from './AccountPopper';
import AccountMenuConfig from './AccountMenuConfig';

// -------------------------------------------------------------------

interface IProps {
  menu: IMenuConfig;
  permission: Permission;
  invisible?: boolean;
}

function ShownOnAppbar({ menu, invisible, permission }: IProps) {
  const { name, path, Icon, rank, shown } = menu;

  if (!shown || (rank && permission < rank)) return null;

  if (name === 'Notifications') {
    return (
      <CustomIconButton component={Link} to={path} sx={{ pr: 5 }}>
        <Badge variant="dot" overlap="circular" color="error" invisible={invisible}>
          <Icon sx={{ fontSize: '1.5rem' }} />
        </Badge>
      </CustomIconButton>
    );
  }

  return (
    <CustomIconButton component={Link} to={path} sx={{ pr: 5 }}>
      <Icon sx={{ fontSize: '1.6rem' }} />
    </CustomIconButton>
  );
}

export default function AccountSection() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { unreadCount, permission } = useAppSelector((state) => state.auth);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isDesktop && (
        <Stack direction="row" spacing={1} sx={{ mr: 1 }}>
          {AccountMenuConfig.map((item) => (
            <ShownOnAppbar key={item.id} menu={item} permission={permission} invisible={unreadCount === 0} />
          ))}
        </Stack>
      )}
      <AccountPopper />
    </Box>
  );
}
