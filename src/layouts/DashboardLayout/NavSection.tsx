import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { useRoleAllowed } from '@/hooks';
import NavLinkMui from '@/components/NavLinkMui';
import navConfig, { INavGroup, INavItem } from './NavConfig';

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
