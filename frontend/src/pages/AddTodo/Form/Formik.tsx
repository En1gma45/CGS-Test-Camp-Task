import React from 'react';
import { Formik,Form } from 'formik'
import CInput from '../../../shared/components/input';
import validationSchema from './validation';
import styles from './Form.module.css'
import { Todo } from '../../../interfaces'
import { v4 } from 'uuid';
export interface FormFormikProps {
  createToggle(): void,
  addToList(todo: Todo): void,

}
 
const FormFormik: React.SFC<FormFormikProps> = ({createToggle,addToList}) => {
  return (
    <Formik
        initialValues={{
        title: "",
        description: "",
        year: "",
        public: false,
        completed: false,
        _id:""
        }}
        onSubmit={(values) => {
          console.log(values)
          values._id = v4()
          addToList(values)
          createToggle()
        }}
      validationSchema={validationSchema}
    
      >
      {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
        
      return(  <div className={styles.main}>
          <Form className={styles.form} onSubmit={handleSubmit}>
            <CInput idForInput="title" nameInput="title" value={values.title} handleChangeInput={handleChange} typeInput="text" nameLabel="Title" />
            <label htmlFor="description">Description</label>
            <textarea onChange={handleChange} id="description" value={values.description} name="description" />
            <CInput idForInput="year" nameInput="year" value={values.year} handleChangeInput={handleChange} typeInput="text" nameLabel="Year" />
            <CInput idForInput="public" nameInput="public" checked={values.public} handleChangeInput={handleChange} typeInput="checkbox" nameLabel="Public" />
            <CInput idForInput="completed"  nameInput="completed" checked={values.completed} handleChangeInput={handleChange} typeInput="checkbox" nameLabel="Completed"/>
            <button
              disabled={!dirty && !isValid}
              type="submit"
            >Create</button>
            </Form>
          </div>)
        }}
        </Formik>
   );
}
 
export default FormFormik;