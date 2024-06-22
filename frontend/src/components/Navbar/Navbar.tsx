// src/components/Navbar/Navbar.tsx
import React from 'react';
import { NavbarContainer, NavLink } from './Navbar.styles';

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/tasks">Tasks</NavLink>
    </NavbarContainer>
  );
};

export default Navbar;
