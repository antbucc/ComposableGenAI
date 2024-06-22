// src/components/Navbar/Navbar.styles.ts
import styled from 'styled-components';


export const NavbarContainer = styled.nav`
  width: 100%;
  background-color: #333;
  padding: 27px 30px; /* Adjust padding to maintain overall height */
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 3px solid black; 
  box-shadow: inset 0 -3px 0 0 orange;
  z-index: 1000;
`;

export const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  margin: 0 15px;
  transition: color 0.3s ease;
  display: inline-block; /* Inline-block to avoid flexbox */

  &:hover {
    color: orange;
  }
`;
