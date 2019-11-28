import React from 'react'
import {Route, Link} from 'react-router-dom'
import MyNavbar from '../containers/Navbar'
import { Menu } from 'semantic-ui-react'
const PublicRoute =  ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={() =>
          <>
          <MyNavbar>
            <>
              <Menu.Item>
                <Link to="/login">Zaloguj się</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/register">Zarejestruj się</Link>
              </Menu.Item>
            </>
            </MyNavbar>
          {children}
          </>
      }
    />
  );
}
export default PublicRoute