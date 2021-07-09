import React, {useState} from 'react';
import axios from "axios";
import {Todo} from "./TodoList";
import {Redirect} from "react-router";
import {useFormik} from "formik";
import {Link} from 'react-router-dom';
import validation from '../helpers/validator'

interface TodoItems {
    todos: Todo[]
    setTodos: (todos: Todo[]) => void,
}

const NewTodo = ({todos, setTodos}: TodoItems) => {

    const [redirect, setRedirect] = useState(false)


    const onSubmit = async (values: any) => {
        await axios.post('http://localhost:5000/api/todo', values).then(res => {
            if (res.status === 200) {
                let todo = res.data.todo
                setRedirect(!redirect)
                setTodos([...todos, todo])
            } else console.log("FALSE")
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
        onSubmit: onSubmit,
        validationSchema: validation
    });
    return (
        <div>
            {redirect ? <Redirect to="/"/> :
                <div>
                    <div className='form-wrapper'>
                        <form className='form-main' onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                            <h1>Create new Todo</h1>
                            <div className="form-control">
                                <input className="input-title" size={30} id='title' name="title" type="text"
                                       placeholder='Title'/>
                                {formik.errors.title ?
                                    <div className='formik-errors'>{formik.errors.title}</div> : null}
                            </div>
                            <div>
                                <textarea className="form-control-desc" rows={10} placeholder='Description'
                                          id='description' name="description"/>
                                {formik.errors.description ?
                                    <div className='formik-errors'>{formik.errors.description}</div> : null}
                            </div>
                            <div className="form-control">
                                <input size={30} className="input-year" id='year' name="year" type="text"
                                       placeholder='Year'/>
                                {formik.errors.year ? <div className='formik-errors'>{formik.errors.year}</div> : null}
                            </div>
                            <div className="form-control-check">
                                <label>Public</label>
                                <input id='isPublic' name="isPublic" type="checkbox"/>
                            </div>
                            <div className="form-control-check">
                                <label>Completed</label>
                                <input id='isCompleted' name="isCompleted" type="checkbox"/>
                            </div>
                            <div className="create-button">
                                <button className="create-button-size" type='submit'>Create</button>
                            </div>
                            <div className="create-button">
                                <Link to="/">
                                    <button className="create-button-size" type='button'>Back</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
};

export default NewTodo;