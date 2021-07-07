import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import AddTodo from "./todo/AddTodo";
import axios from "axios";
import TodoList, { Todo } from "./todo/TodoList";
import {Redirect} from "react-router";
import {GrPrevious, GrNext} from "react-icons/all";

const Dashboard = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [redirect, setRedirect] = useState(false)
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [isCompleted, setIsCompleted] = useState(false)
    const [isPublic, setIsPublic] = useState(false)
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);


    useEffect(() => {
        axios.get(`http://localhost:5000/todos?page=${pageNumber}&isCompleted=${isCompleted}&isPublic=${isPublic}`, {headers: {'Authorization': localStorage.getItem('token')}} ).then(res => {
            if(res.status === 200) {
                setTodoList(res.data.todos)
                setNumberOfPages(res.data.totalPages)
            }
        })
    }, [pageNumber, isCompleted, isPublic])


    const filterTodos = (sort) => {
        switch (sort) {
            case 'completed':
                setIsCompleted(true)
                break;
            case 'notCompleted':
                setIsCompleted(false)
                break;
            case 'public':
                setIsPublic(true)
                break;
            case 'private':
                setIsPublic(false)
                break;


        }
    }

    const handleRedirect = () => {
        setRedirect(!redirect)
    }

    const gotoPreviousPage = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };

    const gotoNextPage = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };

    return (
        <div>
            <Navbar />
            <div>
                {redirect
                    ? <AddTodo todos={todoList} setTodos={setTodoList}/> && <Redirect to='/add-todo'/>
                    :   <div>
                        <button className='create_todo' onClick={handleRedirect}>Create New Todo</button>
                        <div>
                            <h1>Todos</h1>
                            <div className='filtering-todo'>
                                <select className='filtering-select' onChange={e => filterTodos(e.target.value)}>
                                    <option value="">Default</option>
                                    <option value="completed">Completed Todos</option>
                                    <option value="notCompleted">Not Completed Todos</option>
                                    <option value="public">Public Todos</option>
                                    <option value="private">Private Todos</option>
                                </select>
                            </div>
                            <TodoList todos={todoList} setTodos={setTodoList} />
                            <div className='pagination'>
                                <GrPrevious className='pagination-icon' onClick={gotoPreviousPage} />

                                {pages.map((pageIndex) => (
                                    <button className='pagination-button' key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                                        {pageIndex + 1}
                                    </button>
                                ))}
                                <GrNext className='pagination-icon' onClick={gotoNextPage} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Dashboard;
