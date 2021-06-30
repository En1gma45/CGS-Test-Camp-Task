import React from 'react';
import axios from "axios";
import {Todo} from "./TodoList";
import { useFormik } from "formik";
import * as yup from "yup";


interface EditTodoProps {
    todos: Todo[]
    setTodos: (todos: Todo[]) => void,
    todo: Todo
    redirect: boolean,
    setRedirect(b: boolean): void,
}

const EditTodo = ({ todos, setTodos, todo, redirect, setRedirect}: EditTodoProps) => {

    const validationSchema = yup.object().shape({
        title: yup.string()
            .required('Title is required'),
        description: yup.string(),
        year: yup.number().typeError('Must be a number'),
        isPublic: yup.boolean(),
        isCompleted: yup.boolean()
    })

    const handleEdit = async (values) => {
        await axios.put(`http://localhost:5000/todos/${todo._id}`, values).then(res => {
            setRedirect(!redirect)
            setTodos(res.data.todos)
        })
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            year: '',
            isPublic: false,
            isCompleted: false
        },
        validationSchema: validationSchema,
        onSubmit: handleEdit
    });


    return (
        <div>
            <div className='checkout-form-wrapper'>
                <form className='checkout-form' onChange={formik.handleChange} onSubmit={formik.handleSubmit} >
                    <h1>Edit Todo</h1>
                    <div className="form-group">
                        <input id='title' name="title" type="text" className='form-control' placeholder='Title'/>
                        {formik.errors.title ? <div className='formik-errors'>{formik.errors.title}</div> : null}
                    </div>
                    <div className="form-group">
                            <textarea rows={13} id='description' name="description" className='form-control'
                                      placeholder='Description'/>
                        {formik.errors.description ?
                            <div className='formik-errors'>{formik.errors.description}</div> : null}
                    </div>
                    <div className="form-group">
                        <input id='year' name="year" type="text" className='form-control' placeholder='Year'/>
                        {formik.errors.year ? <div className='formik-errors'>{formik.errors.year}</div> : null}
                    </div>
                    <div className="form-group">
                        <label>Public</label>
                        <input id='isPublic' name="isPublic" type="checkbox"/>
                    </div>
                    <div className="form-group">
                        <label>Completed</label>
                        <input id='isCompleted' name="isCompleted" type="checkbox"/>
                    </div>
                    <div className="form-group">
                        <button type='submit' className='primary_button'>Edit</button>
                    </div>
                    <div className="form-group">
                        <button onClick={() => setRedirect(!redirect)} className='primary_button'>Back to
                            Dashboard
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default EditTodo;
