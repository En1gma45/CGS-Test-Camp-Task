import React from 'react';
import { Formik,Form } from 'formik'
import CInput from '../../../shared/components/input';
import validationSchema from './validation';
export interface FormFormikProps {
  
}
 
const FormFormik: React.SFC<FormFormikProps> = () => {
  
  return (
    <Formik
        initialValues={{
        title: "",
        description: "",
        year: "",
        public: false,
        completed:false
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
      validationSchema={validationSchema}
    
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
        <div>
          <Form onClick={handleSubmit}>
            <CInput idForInput="title" nameInput="title" value={values.title} handleChangeInput={handleChange} typeInput="text" nameLabel="title" />
            <label htmlFor="description">Description</label>
            <textarea onChange={handleChange} id="description" name="description" />
            <CInput idForInput="year" nameInput="year" value={values.year} handleChangeInput={handleChange} typeInput="text" nameLabel="year" />
            <CInput idForInput="public" nameInput="public" checked={values.public} handleChangeInput={handleChange} typeInput="checkbox" nameLabel="public" />
            <CInput idForInput="completed" nameInput="completed" checked={values.completed} handleChangeInput={handleChange} typeInput="checkbox" nameLabel="completed"/>
            <button
              disabled={!dirty && !isValid}
              type="submit"
            >Отправить</button>
            </Form>
          </div>
        }}
        </Formik>
   );
}
 
export default FormFormik;