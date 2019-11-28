import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, Nav } from 'reactstrap'

const MyNavbar: React.FunctionComponent = ({children}) =>(
  <Navbar color="light">
    <NavbarBrand tag={Link} to="/">Trello clone</NavbarBrand>
    <Nav>
      {children}
    </Nav> 
  </Navbar>
)
export default MyNavbar