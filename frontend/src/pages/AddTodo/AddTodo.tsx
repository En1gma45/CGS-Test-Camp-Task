import React, { useState } from 'react'
import useForm from '../../shared/hooks/useForm';
import initialState from './initialState'
import FormAddTodo from './Form/Form';
export interface AddTodoPageProps {
  
}
 
const AddTodoPage: React.SFC<AddTodoPageProps> = () => {
  const [formData,setFormData,handleChange,handleSubmit] = useForm(initialState)
  return (
    <FormAddTodo/>
   );
}
 
export default AddTodoPage;