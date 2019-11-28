import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const MyNavbar: React.FunctionComponent = ({children}) =>(
  <Menu stackable>
    <Menu.Item>
      <Link to='/'>Trello clone</Link>
    </Menu.Item>
    <Menu.Menu position='right'>
      {children}
    </Menu.Menu>
  </Menu>
)
export default MyNavbar