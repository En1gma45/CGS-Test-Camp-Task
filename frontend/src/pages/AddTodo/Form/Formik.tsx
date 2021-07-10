import React from 'react';
import { Formik } from 'formik'
import * as yup from 'yup'
export interface FormFormikProps {
  
}
 
const FormFormik: React.SFC<FormFormikProps> = () => {
  const validationSchema = yup.object().shape({
    name:yup.string().typeError("Должно быть строкой").required("Обязательно")
  })
  return (
  
    <Formik
        initialValues={{
          name: ""
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
      validationSchema={validationSchema}
    
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
        <div>
            <form onClick={handleSubmit}>
              <label htmlFor="">Name</label>
              <input type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              name="title"/>
            <button
              disabled={!dirty && !isValid}
              type="submit"
            >Отправить</button>
            </form>
          </div>
        }}
        </Formik>
  
    
   );
}
 
export default FormFormik;