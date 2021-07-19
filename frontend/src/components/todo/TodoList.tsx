import React, {useState, useEffect} from 'react';
import {MdEdit} from 'react-icons/all'
import {IoMdTrash} from 'react-icons/all'
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import TodoProvider from "../../providers/TodoProvider";
import {resetLocal} from "../utils";

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

    const provider: TodoProvider = new TodoProvider();


    const handleDelete = async (todo: { _id: string; }) => {
        const id = todo._id;
        await provider.deleteTodo(id);
        provider.readTodo().then(response => {
            setTodos(response.data.reverse());
            setLoading(false)
    } )}

    useEffect(() => {
       provider.readTodo().then(response => {
            setTodos(response.data.reverse());
            setLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }


    return (
        <div>
            <div className="create-button">
                <input type="button" value="RESET" onClick={() => resetLocal()} />
                <Link style={{ textDecoration: 'none' }} to="/newtodo">
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
                                } ><MdEdit size='25px' className='icon edit_icon'/></Link>
                                <IoMdTrash size='25px' className='icon edit_icon' onClick={() => handleDelete(todo)}/>
                            </div>
                        </div>
                ))}
            </div>
        </div>);
};

export default TodoList;