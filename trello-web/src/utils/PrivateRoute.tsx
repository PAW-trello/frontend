import React from 'react'
import {Route, Redirect, Link, useHistory} from 'react-router-dom'
import api from './api'
import MyNavbar from '../containers/Navbar'
import { toast } from 'react-toastify'
import { Menu } from 'semantic-ui-react'
const PrivateRoute =  ({ children, ...rest }: any) => {
  const history = useHistory()
  const isValid = !!api.headers()
  
  const logout = () => {
    api.logout()
    toast.success("Wylogowano")
    history.push('/login')
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
          isValid? (
          <>
            <MyNavbar>
              <Menu.Item>
                <Link to="#" onClick={logout}>Wyloguj się</Link>
              </Menu.Item>
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