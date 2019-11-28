import React from "react";
import "./App.css";
import BoardList from "./containers/BoardList";
import { BrowserRouter as Router, Switch} from "react-router-dom";
import SingleBoard from "../src/containers/SingleBoard";
import { Login } from "../src/containers/Login";
import { Register } from '../src/containers/Register'
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">

        <Switch>
          <PublicRoute path="/register">
            <Register />
          </PublicRoute>
          <PublicRoute path="/login">
            <Login/>
          </PublicRoute>
          <PrivateRoute exact  path="/">
            <BoardList/>
          </PrivateRoute>
          <PrivateRoute path="/board/:id">
            <SingleBoard/>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
