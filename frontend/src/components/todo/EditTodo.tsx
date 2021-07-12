import React, {useState} from 'react';
import {useFormik} from "formik";
import axios from "axios";
import {Link, Redirect, useLocation} from 'react-router-dom';
import validation from '../helpers/validator';
import TodoProvider from "../../providers/TodoProvider";


const EditTodo = ({}) => {

    const [redirect, setRedirect] = useState(false)
    const location: any = useLocation();

    const provider: TodoProvider = new TodoProvider();
    const id: string = location.state.todo._id;

    const handleSubmit = async (values: any) => {
        await provider.edit(values, id);
        setRedirect(!redirect);
    }

    const formik = useFormik({
        initialValues: {
            title: location.state.todo.title,
            description: location.state.todo.description,
            year: location.state.todo.year,
            isPublic: location.state.todo.isPublic,
            isCompleted: location.state.todo.isCompleted
        },
        validationSchema: validation,
        onSubmit: handleSubmit
    });

    return (
        redirect ? <Redirect to="/"/> :
            <div>
                <div className="form-wrapper">
                    <form className='form-main' onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                        <h1>Edit Todo</h1>
                        <div className="form-control">
                            <input defaultValue={location.state.todo.title} className="input-title" size={30} id='title'
                                   name="title" type="text"/>
                            {formik.errors.title ? <div className='formik-errors'>{formik.errors.title}</div> : null}
                        </div>
                        <div className="form-group">
                            <textarea defaultValue={location.state.todo.description} rows={10} id='description'
                                      name="description" className="form-control-desc"
                                      placeholder='Description'/>
                            {formik.errors.description ?
                                <div className='formik-errors'>{formik.errors.description}</div> : null}
                        </div>
                        <div className="form-control">
                            <input size={30} className="input-year" defaultValue={location.state.todo.year} id='year'
                                   name="year" type="text" placeholder='Year'/>
                            {formik.errors.year ? <div className='formik-errors'>{formik.errors.year}</div> : null}
                        </div>
                        <div className="form-control-check">
                            <label>Public</label>
                            <input defaultChecked={location.state.todo.isPublic} id='isPublic' name="isPublic"
                                   type="checkbox"/>
                        </div>
                        <div className="form-control-check">

                            <label>Completed</label>
                            <input defaultChecked={location.state.todo.isCompleted} id='isCompleted' name="isCompleted"
                                   type="checkbox"/>
                        </div>
                        <div className="create-button">
                            <button type='submit' className="create-button-size">Edit</button>
                        </div>
                        <div className="create-button">
                            <Link to="/">
                                <button className="create-button-size" type='button'>Back</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
    );
}


export default EditTodo;