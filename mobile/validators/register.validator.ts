import * as yup from 'yup'

export const RegisterValidation = yup.object().shape({
    username: yup.string().min(5).typeError('Username is to short').required(),
    email: yup.string().email().typeError('Enter correct email').required(),
    password: yup.string().min(6).typeError('Incorrect password').required(),
    verifyPassword: yup.string().oneOf([yup.ref('password')],'passwords don\'t match').required()
})