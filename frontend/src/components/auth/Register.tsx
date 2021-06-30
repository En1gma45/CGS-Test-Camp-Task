import React from "react";
import '../../index.css'
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from 'react-router-dom'


const Register = () => {
    const validationSchema = yup.object().shape({
        email: yup.string()
            .email('Invalid email')
            .required('Invalid email')
            .min(2, 'Too Short!')
            .max(30, 'Too Long!'),
        password: yup.string().required('Password is required')
    })

    const onSubmit = async (values) => {
        await axios.post('http://localhost:5000/api/register', values).then(res => console.log(res));
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });

    return (
        <div className='checkout-form-wrapper'>
            <form className='checkout-form' onSubmit={formik.handleSubmit} onChange={formik.handleChange}>
                <h1>Register</h1>
                <div className="form-group">
                    <input id='email' name="email" type="text" className='form-control' placeholder='Email'/>
                    {formik.errors.email ? <div className='formik-errors'>{formik.errors.email}</div> : null}
                </div>
                <div className="form-group">
                    <input id='password' name="password" type="password" className='form-control' placeholder='Password'/>
                    {formik.errors.password ? <div className='formik-errors'>{formik.errors.password}</div> : null}
                </div>
                <div className="form-group">
                    <input id='confirmPassword' name="confirmPassword" type="password" className='form-control' placeholder='Confirm Password'/>
                    {formik.errors.confirmPassword ? <div className='formik-errors'>{formik.errors.confirmPassword}</div> : null}
                </div>
                <div className="form-group">
                    <Link to='/login'><button type='submit' className='primary_button'>Register</button></Link>
                    <div><p>Have an account? <Link to='/login' className='redirect_link'><i className='secondary_button'>Login</i></Link></p></div>
                </div>
            </form>
        </div>
    );
}

export default Register