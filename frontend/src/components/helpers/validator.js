import * as yup from 'yup';


const validation = yup.object().shape({
    title: yup.string().required('Please, enter the title'),
    description: yup.string().required('Please, enter the description'),
    year: yup.number().min(1970, 'Must be at least 1970').max(2040, 'Must be not more than 2040').typeError('Must be a number').required('Please, enter the year'),
    isPublic: yup.boolean(),
    isCompleted: yup.boolean()
})

export default validation;