import React from 'react';
import './App.css';
import BoardList from "./containers/BoardList";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import SingleBoard from "./containers/SingleBoard";


const App: React.FC = () => {
    return (
        <Router>
            <div className='app'>
                <Navbar color='light'>
                    <NavbarBrand href='/'>Trello clone</NavbarBrand>
                    <Nav className='ml-auto' navbar={true}>
                        <NavItem>
                            <NavLink href='/logout'>Wyloguj się</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                <Switch>
                    <Route exact={true} path='/' component={BoardList}/>
                    <Route path='/board/:id' component={SingleBoard}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
