import React, {useState} from 'react';
import {Redirect} from "react-router";
import {useFormik} from "formik";
import {Link} from 'react-router-dom';
import axios from "axios";
import regValidation from "../helpers/regValidator";


const Registration = () => {

    const [redirect, setRedirect] = useState(false)


    const onSubmit = async (values: any) => {
        await axios.post('http://localhost:5000/api/register', values);
        setRedirect(!redirect);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: onSubmit,
        validationSchema: regValidation
    });
    return (
        <div>
            {redirect ? <Redirect to="/"/> :
                <div>
                    <div className='form-wrapper'>
                        <form className='form-main form-reg' onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
                            <h1>Registration</h1>
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
                            <div className="form-control">
                                <input size={30} className="input-year" id='confirmPassword' name="confirmPassword" type="password"
                                       placeholder='Confirm password'/>
                                {formik.errors.confirmPassword ?
                                    <div className='formik-errors'>{formik.errors.confirmPassword}</div> : null}
                            </div>
                            <div className="create-button">
                                <button className="create-button-size" type="submit">Register</button>
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

export default Registration;