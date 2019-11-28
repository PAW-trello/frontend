import React from 'react'
import {Route, Link} from 'react-router-dom'
import { NavLink } from 'reactstrap'
import MyNavbar from '../containers/Navbar'
const PublicRoute =  ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={() =>
          <>
          <MyNavbar>
            <>
              <NavLink tag={Link} to="/login">Zaloguj się</NavLink>
              <NavLink tag={Link} to="/register">Zarejestruj się</NavLink>
            </>
            </MyNavbar>
          {children}
          </>
      }
    />
  );
}
export default PublicRoute