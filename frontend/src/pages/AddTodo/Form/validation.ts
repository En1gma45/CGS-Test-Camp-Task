import * as yup from 'yup'
const validationSchema = yup.object().shape({
  title: yup.string().typeError("Должно быть строкой").required("Обязательно"),
  description: yup.string().typeError("Должно быть строкой").required("Обязательно"),
  year: yup.string().typeError("Должно быть числом").required("Обязательно"),
  public: yup.boolean(),
  completed:yup.boolean()
})
  
export default validationSchema