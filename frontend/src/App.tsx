import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import TodoList from "./components/todo/TodoList"
import NewTodo from './components/todo/NewTodo';
import EditTodo from './components/todo/EditTodo';
import Home from "./components/Home";
import Registration from "./components/todo/Registration";
import Login from "./components/Login";
import PrivateRoute from "./components/routes/PrivateRouter";
import PublicRoute from "./components/routes/PublicRouter";


const App = () => {

    return (
        <BrowserRouter>
            <Route path="/" component={Home} exact/>
            <PrivateRoute path='/todo' component={TodoList} exact />
            <PrivateRoute path="/newtodo" component={NewTodo} exact/>
            <PrivateRoute path="/edittodo" component={EditTodo} exact/>
            <PublicRoute restricted={true} path="/registration" component={Registration} exact/>
            <PublicRoute restricted={true} path="/login" component={Login} exact/>
        </BrowserRouter>
    )
}

export default App;
