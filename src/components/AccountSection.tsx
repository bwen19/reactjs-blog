import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Badge, Box, Divider, List, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
import {
  AdminPanelSettingsOutlined,
  EmojiObjectsOutlined,
  LogoutOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { logoutThunk } from '@/redux/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { IMenuBase, Permission, User } from '@/api';
import MenuPopper from './MenuPopper';
import CustomIconButton from './CustomIconButton';
import { PopperNavItem } from './NavList';
import { role2Permission } from '@/utils';

interface IMenuConfig extends IMenuBase {
  rank: Permission;
  shown?: boolean;
  divider?: boolean;
}

// ========================// ToolbarIcons //======================== //

interface IProps {
  menu: IMenuConfig;
  permission: Permission;
  invisible?: boolean;
}

function ToolbarIcons({ menu, invisible, permission }: IProps) {
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
    <Tooltip title={name}>
      <CustomIconButton component={Link} to={path} sx={{ pr: 5 }}>
        <Icon sx={{ fontSize: '1.6rem' }} />
      </CustomIconButton>
    </Tooltip>
  );
}

// ========================// AccountPopper //======================== //

const UsernameWrapper = styled('div')({
  padding: '12px 4px 8px',
  display: 'flex',
  justifyContent: 'center',
});

interface AccountPopperProps {
  user: User;
  menus: IMenuConfig[];
}

function AccountPopper({ user, menus }: AccountPopperProps) {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (menu: IMenuConfig) => {
    if (menu.name === 'Logout') {
      return async (event: Event | React.SyntheticEvent) => {
        dispatch(logoutThunk());
        handleClose(event);
      };
    }
    return (event: Event | React.SyntheticEvent) => {
      navigate(menu.path);
      handleClose(event);
    };
  };

  const userRank = role2Permission(user.role);

  return (
    <>
      <CustomIconButton ref={anchorRef} onClick={handleToggle}>
        <Avatar alt="User" src={user.avatar} sx={{ width: 30, height: 30 }} />
      </CustomIconButton>
      <MenuPopper anchorEl={anchorRef.current} open={open} placement="bottom-end" onClose={handleClose}>
        <Box sx={{ minWidth: 240 }}>
          <UsernameWrapper>
            <Typography variant="body2" color="text.disabled">
              Signed in as&ensp;
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {user.username}
            </Typography>
          </UsernameWrapper>
          <Divider />
          <List component="nav" sx={{ px: 1.5 }}>
            {menus.map((menu) => userRank >= menu.rank && (
              <PopperNavItem key={menu.id} menu={menu} onClick={handleClick(menu)} divider={menu.divider} />
            ))}
          </List>
        </Box>
      </MenuPopper>
    </>
  );
}

// ========================// AccountSection //======================== //

export default function AccountSection() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { unreadCount, permission, authUser } = useAppSelector((state) => state.auth);

  const menuConfig: IMenuConfig[] = [
    {
      id: 1,
      name: 'My Homepage',
      path: `/user/${authUser!.id}`,
      Icon: PersonOutlined,
      rank: Permission.USER,
    },
    {
      id: 2,
      name: 'Notifications',
      path: '/notifications',
      Icon: NotificationsOutlined,
      rank: Permission.USER,
      shown: true,
    },
    {
      id: 3,
      name: 'Account Settings',
      path: '/settings/profile',
      Icon: SettingsOutlined,
      rank: Permission.USER,
    },
    {
      id: 4,
      name: 'Creator Center',
      path: '/creator/home',
      Icon: EmojiObjectsOutlined,
      rank: Permission.AUTHOR,
      shown: true,
    },
    {
      id: 5,
      name: 'Dashboard',
      path: '/dashboard/overview',
      Icon: AdminPanelSettingsOutlined,
      rank: Permission.ADMIN,
      shown: true,
    },
    {
      id: 6,
      name: 'Logout',
      path: '',
      Icon: LogoutOutlined,
      rank: Permission.USER,
      divider: true,
    },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isDesktop && (
        <Stack direction="row" spacing={1} sx={{ mr: 1.5 }}>
          {menuConfig.map((item) => (
            <ToolbarIcons key={item.id} menu={item} permission={permission} invisible={unreadCount === 0} />
          ))}
        </Stack>
      )}
      <AccountPopper user={authUser!} menus={menuConfig} />
    </Box>
  );
}
