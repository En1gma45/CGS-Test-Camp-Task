import React, {useState, useEffect} from 'react';
import axios from "axios";
import {MdEdit} from 'react-icons/all'
import {IoMdTrash} from 'react-icons/all'
import Button from '@material-ui/core/Button';
import {Link, Redirect } from 'react-router-dom';

export interface Todo {
    _id: string
    title: string
    description: string
    year: number
    isPublic: boolean
    isCompleted: boolean
}


const TodoList = ({}) => {


    const [isLoading, setLoading] = useState(true);
    const [todos, setTodos] = useState<any[]>([])



    const handleDelete = (todo: { _id: string; }) => {
        axios.delete(`http://localhost:5000/api/todo/${todo._id}`).then(res => {
            if (res.status === 200) {
                axios.get('http://localhost:5000/api/todo/').then(response => {
                    setTodos(response.data);
                    setLoading(false)
                })
            }
        })
    }


    useEffect(() => {
        axios.get('http://localhost:5000/api/todo/').then(response => {
            setTodos(response.data);
            setLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }


    return (
        <div>
            <div className="create-button">
                <Link to="/newtodo">
                <Button variant="contained" color="primary">
                    Create new Todo
                </Button>
                </Link>
            </div>
            <div>
                {todos.map(todo => (
                        <div key={todo._id} className='todo-list'>
                            <div className='todo-list-info'>
                                <p><b>{todo.title} {todo.year}</b></p>
                                <div>{todo.description}</div>
                                <p>
                                    <i>{todo.isCompleted ? 'Completed' : 'Not Completed'}, {todo.isPublic ? 'Public' : 'Private'}</i>
                                </p>
                            </div>
                            <div className='todo-buttons'>
                                <Link to={{
                                    pathname: "/edittodo",
                                    state : {
                                        todo: todo
                                    }}
                                } ><MdEdit size='25px' className='icon edit_icon'></MdEdit></Link>
                                <IoMdTrash size='25px' className='icon edit_icon' onClick={() => handleDelete(todo)}/>
                            </div>
                        </div>
                ))}
            </div>
        </div>);
};

export default TodoList;