import React from 'react'
import {Route, Redirect, Link, useHistory} from 'react-router-dom'
import api from './api'
import { NavLink } from 'reactstrap'
import MyNavbar from '../containers/Navbar'
import { toast } from 'react-toastify'
const PrivateRoute =  ({ children, ...rest }: any) => {
  const history = useHistory()
  const logout = () => {
    api.logout()
    toast.success("Wylogowano")
    history.push('/login')
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
         !!api.headers() ? (
          <>
            <MyNavbar>
              <NavLink tag={Link} to="#" onClick={logout}> Wyloguj się </NavLink>
            </MyNavbar>
            {children}
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute