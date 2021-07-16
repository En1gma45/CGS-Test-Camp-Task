import * as yup from 'yup';

const regValidation = yup.object().shape({
    email: yup.string().email().required('Please, enter your e-mail'),
    password: yup.string().required('Please, enter your password').min(5, 'Must be at least 5 symbols').max(20, 'Must not exceed 20 symbols'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export default regValidation;