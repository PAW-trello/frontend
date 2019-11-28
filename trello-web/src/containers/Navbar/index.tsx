import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, Nav } from 'reactstrap'

const MyNavbar = (props: any) =>(
  <Navbar color="light">
  <NavbarBrand tag={Link} to="/">Trello clone</NavbarBrand>
  <Nav>
    {props.children}
  </Nav> 
</Navbar>
)
export default MyNavbar