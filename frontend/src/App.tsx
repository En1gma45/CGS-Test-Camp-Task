import React from 'react';
import { BrowserRouter } from "react-router-dom";
import {Redirect, Route} from "react-router";
import Home from "./components/Home";
import RequireAuth from "./components/auth/RequireAuth";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AddTodo from "./components/todo/AddTodo";

const App = () => {
    const token = localStorage.getItem('token')
  return (
      <BrowserRouter>
          <Route path="/" exact>{token ? <Redirect to='/dashboard' />: <Home />}</Route>
          <Route path="/dashboard" component={RequireAuth(Dashboard)} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/add-todo/" component={RequireAuth(AddTodo)} />
      </BrowserRouter>
  )
}

export default App;
