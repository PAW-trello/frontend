import React from "react";
import "./App.css";
import BoardList from "./containers/BoardList";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import SingleBoard from "../src/containers/SingleBoard";
import { Login } from "../src/containers/Login";
import { Register } from '../src/containers/Register'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar color="light">
          <NavbarBrand tag={Link} to="/">Trello clone</NavbarBrand>
          <Nav>
            <NavLink tag={Link} to="/login">Zaloguj się</NavLink>
            <NavLink tag={Link} to="/register">Zarejestruj się</NavLink>
          </Nav> 
        </Navbar>

        <Switch>
          <Route exact={true} path="/" component={BoardList} />
          <Route path="/board/:id" component={SingleBoard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
