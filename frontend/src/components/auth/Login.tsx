import React from "react";
import '../../index.css'
import axios from "axios";
import * as yup from 'yup'
import { useFormik } from "formik";
import {Link} from 'react-router-dom'


const Login = () => {
    const validationSchema = yup.object().shape({
            email: yup.string()
                .email('Invalid email')
                .required('Invalid email')
                .min(2, 'Too Short!')
                .max(30, 'Too Long!'),
            password: yup.string().required('Password is required')
        })

    const onSubmit = async (values) => {
        await axios.post('http://localhost:5000/api/login', values).then(res => {
            if(res.status === 200) {
                const token = res.data.token
                localStorage.setItem('token', token)
                window.location.href = '/dashboard'
            } else {

            }
        })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });

    return (
        <div className='checkout-form-wrapper'>
            <form className='checkout-form' onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
                <h1>Login</h1>
                <div className="form-group">
                    <input id='email' name="email" type="text" className='form-control' placeholder='Email'/>
                    {formik.errors.email ? <div className='formik-errors'>{formik.errors.email}</div> : null}
                </div>
                <div className="form-group">
                    <input id='password' name="password" type="password" className='form-control' placeholder='Password'/>
                    {formik.errors.password ? <div className='formik-errors'>{formik.errors.password}</div> : null}
                </div>
                <div className="form-group">
                    <button type='submit' className='primary_button'>Login</button>
                    <div><p>Don't have an account? <Link to='/register' className='redirect_link'><i className='secondary_button'>Register</i></Link></p></div>
                </div>
            </form>
        </div>
    );
}
    export default Login
