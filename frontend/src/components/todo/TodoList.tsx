import React, {useState} from 'react';
import {MdDelete, MdEdit} from "react-icons/all";
import axios from "axios";
import EditTodo from "./EditTodo";


export interface Todo {
    _id: string
    title: string
    description: string
    year: number
    isPublic: boolean
    isCompleted: boolean
}

interface TodoListProps {
    todos: Todo[],
    setTodos: (todos: Todo[]) => void,


}


const TodoList = ({todos, setTodos }: TodoListProps) => {
        const [redirect, setRedirect] = useState(false)
        const [task, setTask]: any = useState({})
        const [search, setSearch] = useState('')

        const handleDelete = todo => {
            axios.delete(`http://localhost:5000/todos/${todo._id}`, {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
                if(res.status === 200) {
                    setTodos(res.data.todos)

                }
            })
        }


         const handleEdit = (todo) => {
            setRedirect(!redirect)
            setTask(todo)
        }


        const searchedTodos = todos.filter(todo => {
            return todo.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });

        return (
            <div>
                {redirect
                    ? <EditTodo todos={todos} setTodos={setTodos} todo={task} redirect={redirect} setRedirect={setRedirect} />
                    :
                    <div>
                        <div className='filtering-todo'>
                            <input type="text" className='search-todo' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search Todo'/>
                        </div>
                        {searchedTodos.length ?
                            searchedTodos.map(todo => (
                                <div key={todo._id} className='todo_form'>
                                    <div className='todo_form_about'>
                                        <p><b>{todo.title} {todo.year}</b></p>
                                        <p>{todo.description}</p>
                                        <p><i>{todo.isCompleted ? 'Completed' : 'Not Completed'}, {todo.isPublic ? 'Public' : 'Private'}</i>
                                        </p>
                                    </div>
                                    <div className='todo_form_buttons'>
                                        <MdEdit size='25px' className='edit_icon' onClick={() => handleEdit(todo)}/>
                                        <MdDelete size='25px' className='delete_icon' onClick={() => handleDelete(todo)}/>
                                    </div>
                                </div>
                            )) :
                            <div>
                                <h1>Nothing was found</h1>
                            </div>
                        }
                    </div>

                }
            </div>
        );
    };

export default TodoList;
