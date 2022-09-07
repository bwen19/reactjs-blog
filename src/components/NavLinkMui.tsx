import { forwardRef, ForwardRefRenderFunction } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

// ---------------------------------------------------------------------------

const forwardFunc: ForwardRefRenderFunction<HTMLAnchorElement, NavLinkProps> = (props, ref) => (
  <NavLink ref={ref} to={props.to} className={({ isActive }) => `${props.className} ${isActive ? 'Mui-selected' : ''}`}>
    {props.children}
  </NavLink>
);

export default forwardRef<HTMLAnchorElement, NavLinkProps>(forwardFunc);
