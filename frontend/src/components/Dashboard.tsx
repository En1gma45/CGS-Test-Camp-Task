import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import AddTodo from "./todo/AddTodo";
import axios from "axios";
import TodoList, { Todo } from "./todo/TodoList";
import {Redirect} from "react-router";


const Dashboard = () => {
    const [redirect, setRedirect] = useState(false)
    const [todoList, setTodoList] = useState<Todo[]>([])
    useEffect(() => {
        axios.get('http://localhost:5000/todos').then(res => {
            if(res.status === 200) {
                 setTodoList(res.data.todos)
            }
        })
    }, [])

    const handleRedirect = () => {
        setRedirect(!redirect)
    }

    return (
        <div>
            <Navbar />
            <div>
                {redirect
                    ? <AddTodo todos={todoList} setTodos={setTodoList}/> && <Redirect to='/add-todo'/>
                    : <div>
                            <button className='create_todo' onClick={handleRedirect}>Create New Todo</button>
                            <div>
                                <h1>Todos</h1>
                                <TodoList todos={todoList} setTodos={setTodoList} />
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Dashboard;
