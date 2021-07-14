import React from 'react';
import { Formik,Form } from 'formik'
import CInput from '../../../shared/components/input';
import validationSchema from './validation';
import styles from './Form.module.css'
import { Todo } from '../../../interfaces'
import { v4 } from 'uuid';
export interface FormFormikProps {
  createToggle(): void,
  editTodo: Todo[],
  handleEdit(todo:Todo): void
}
 
const FormEdit: React.SFC<FormFormikProps> = ({createToggle,editTodo,handleEdit}) => {
  console.log(editTodo)
  return (
    <Formik
        initialValues={{
        title: editTodo[0].title,
        description: editTodo[0].description,
        year: editTodo[0].year,
        public: editTodo[0].public,
        completed: editTodo[0].completed,
        _id:editTodo[0]._id
        }}
        onSubmit={(values) => {
          console.log(values)
          handleEdit(values)
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
            >Edit</button>
            </Form>
          </div>)
        }}
        </Formik>
   );
}
 
export default FormEdit;