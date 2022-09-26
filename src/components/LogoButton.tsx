import { Link } from 'react-router-dom';
import { ButtonBase, SvgIcon } from '@mui/material';
import { ReactComponent as Logo } from '@/assets/images/logo.svg';

// ========================// LogoButton //======================== //

export default function LogoButton() {
  return (
    <ButtonBase sx={{ pb: 0.5 }} disableRipple component={Link} to="/">
      <SvgIcon component={Logo} viewBox="0 0 92 32" fill="none" sx={{ width: 86, height: 26 }} />
    </ButtonBase>
  );
}
