import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route} from "react-router";
import TodoList from "./components/todo/TodoList"
import NewTodo from './components/todo/NewTodo';
import EditTodo from './components/todo/EditTodo';


const App = () => {

    return (
        <BrowserRouter>
            <Route path="/" component={TodoList} exact/>
            <Route path="/newtodo" component={NewTodo} exact/>
            <Route path="/edittodo" component={EditTodo} exact/>
        </BrowserRouter>
    )
}

export default App;
