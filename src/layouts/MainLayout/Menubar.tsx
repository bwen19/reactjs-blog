import { Link, Stack } from '@mui/material';

import NavLinkMui from '@/components/NavLinkMui';
import mainMenuConfig from './MainMenuConfig';

// -------------------------------------------------------------------

export default function Menubar() {
  return (
    <Stack direction="row" spacing={2.5}>
      {mainMenuConfig.map((item) => (
        <Link key={item.id} component={NavLinkMui} to={item.path} sx={{ color: 'grey.300' }}>
          {item.name}
        </Link>
      ))}
    </Stack>
  );
}
