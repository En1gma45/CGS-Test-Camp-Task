import React, {useState} from 'react';
import {Redirect} from "react-router";
import {useFormik} from "formik";
import {Link} from 'react-router-dom';
import TodoProvider from "../providers/TodoProvider";
import BaseProvider from "../providers/BaseProvider";
import InputField from "./InputField";



const Login = () => {

    const [redirect, setRedirect] = useState(false)

    const provider: TodoProvider = new TodoProvider();


    const onSubmit = async (values: any) => {
        await provider.loginUser(values).then(res => { BaseProvider.processResult(res); localStorage.setItem('token', res.data.token)});
        setRedirect(!redirect);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: onSubmit,
    });
    return (
        <div>
            {redirect ? <Redirect to="/todo"/> :
                <div>
                    <div className='form-wrapper'>
                        <form className='form-main form-reg' onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                            <h1>Login</h1>
                            <div className="form-control">
                                <InputField className={"input-title"} size={30} id={"email"} name={"email"} type={"text"} placeholder={"E-mail"}/>
                                {formik.errors.email ?
                                    <div className='formik-errors'>{formik.errors.email}</div> : null}
                            </div>
                            <div className="form-control">
                                <InputField className={"input-year"} size={30} id={"password"} name={"password"} type={"password"} placeholder={"Password"}/>
                                {formik.errors.password ?
                                    <div className='formik-errors'>{formik.errors.password}</div> : null}
                            </div>
                            <div className="create-button">
                                <button className="create-button-size" type="submit">Login</button>
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

export default Login;