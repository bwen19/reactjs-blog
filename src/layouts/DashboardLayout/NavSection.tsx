import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import {
  CookieOutlined,
  NotificationsOutlined,
  ManageAccountsOutlined,
  ArticleOutlined,
  BorderColorOutlined,
  SupervisorAccountOutlined,
  PublishOutlined,
  SvgIconComponent,
} from '@mui/icons-material';

import { UserRole } from '@/api';
import { NavLinkMui } from '@/components';
import { useRoleAllowed } from '@/hooks';

// -------------------------------------------------------------------

interface INavGroup {
  id: number;
  title: string;
  role: UserRole;
  items: INavItem[];
}

interface INavItem {
  id: number;
  name: string;
  path: string;
  icon: SvgIconComponent;
}

const navConfig: INavGroup[] = [
  {
    id: 1,
    title: 'Dashboard',
    role: 'user',
    items: [
      { id: 1, name: 'Overview', path: '/dashboard/overview', icon: CookieOutlined },
      { id: 2, name: 'Notifications', path: '/dashboard/notifications', icon: NotificationsOutlined },
      { id: 3, name: 'Account Settings', path: '/dashboard/account', icon: ManageAccountsOutlined },
    ],
  },
  {
    id: 2,
    title: 'Author',
    role: 'author',
    items: [
      { id: 1, name: 'Author Posts', path: '/dashboard/content', icon: ArticleOutlined },
      { id: 2, name: 'New Post', path: '/dashboard/new-post', icon: BorderColorOutlined },
    ],
  },
  {
    id: 3,
    title: 'Administration',
    role: 'admin',
    items: [
      { id: 1, name: 'Users', path: '/dashboard/users', icon: SupervisorAccountOutlined },
      { id: 2, name: 'Posts', path: '/dashboard/posts', icon: PublishOutlined },
    ],
  },
];

// -------------------------------------------------------------------

interface NavItemProps {
  item: INavItem;
}

function NavItem({ item }: NavItemProps) {
  const Icon = item.icon;
  return (
    <ListItemButton
      component={NavLinkMui}
      to={item.path}
      sx={{ borderRadius: 2, alignItems: 'flex-start', mb: 0.5, py: 1, pl: 2, fontSize: '14px' }}
    >
      <ListItemIcon sx={{ my: 'auto' }}>
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText disableTypography primary={item.name} />
    </ListItemButton>
  );
}

// -------------------------------------------------------------------

interface NavGroupProps {
  group: INavGroup;
}

function NavGroup({ group }: NavGroupProps) {
  const allowed = useRoleAllowed(group.role);
  if (!allowed) return null;

  return (
    <>
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
      <List
        subheader={
          <Typography variant="caption" display="block" sx={{ ml: 0.5 }} gutterBottom>
            {group.title}
          </Typography>
        }
      >
        {group.items.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </List>
    </>
  );
}

// -------------------------------------------------------------------

export default function NavSection() {
  return (
    <Box sx={{ mx: 2 }}>
      {navConfig.map((group) => (
        <NavGroup key={group.id} group={group} />
      ))}
    </Box>
  );
}
