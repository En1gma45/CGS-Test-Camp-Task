import React, {useState} from 'react';
import {Redirect} from "react-router";
import {useFormik} from "formik";
import {Link} from 'react-router-dom';
import axios from "axios";


const Login = () => {

    const [redirect, setRedirect] = useState(false)


    const onSubmit = async (values: any) => {
        await axios.post('http://localhost:5000/api/auth', values).then(res => localStorage.setItem('token', res.data.token));
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
                                <input className="input-title" size={30} id='email' name="email" type="text"
                                       placeholder='E-mail'/>
                                {formik.errors.email ?
                                    <div className='formik-errors'>{formik.errors.email}</div> : null}
                            </div>
                            <div className="form-control">
                                <input size={30} className="input-year" id='password' name="password" type="password"
                                       placeholder='Password'/>
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