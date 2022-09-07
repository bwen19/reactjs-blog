import { CottageOutlined, InfoOutlined } from '@mui/icons-material';

// -------------------------------------------------------------------

export interface MenuItem {
  id: number;
  name: string;
  path: string;
  icon: JSX.Element;
}

const mainMenuConfig: MenuItem[] = [
  { id: 1, name: 'Home', path: '/', icon: <CottageOutlined sx={{ fontSize: 18 }} /> },
  { id: 2, name: 'About', path: '/about', icon: <InfoOutlined sx={{ fontSize: 18 }} /> },
];

export default mainMenuConfig;
