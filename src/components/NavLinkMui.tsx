import { forwardRef } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

// ========================// NavLinkMui //======================== //

const NavLinkMui = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => (
  <NavLink ref={ref} to={props.to} className={({ isActive }) => `${props.className} ${isActive ? 'Mui-selected' : ''}`}>
    {props.children}
  </NavLink>
));

NavLinkMui.displayName = 'NavLinkMui';

export default NavLinkMui;
