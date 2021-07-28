import * as yup from 'yup'

export const TaskValidation = yup.object().shape({
    title: yup.string().min(3).typeError("Title length should be more than 3").required('Required'),
    description: yup.string().min(3).typeError("Description length should be more than 3").required('Required'),
    year: yup.number().positive().integer().typeError("Enter the correct year").required('Required'),
})