import React, { useState } from 'react'
import {v4} from 'uuid'
import initialState from './initialState'
import FormAddTodo from './Form/Form';
import { Todo } from '../../interfaces';
import FormFormik from './Form/Formik';
export interface AddTodoPageProps {
  addToList(todo: Todo): void,
  editTodo: Todo[],
  createToggle(): void,
  editOneTodo(todo:Todo):void
}
const AddTodoPage: React.SFC<AddTodoPageProps> = ({addToList,editTodo,createToggle,editOneTodo}) => {
  const [formData, setformData] = useState<Todo>(initialState)
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setformData({
      ...formData,
      [name]: value
    })
  }
  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name,checked} = event.target
      setformData({
        ...formData,
        [name]:checked
      })
    
}
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formData._id = v4()
    addToList(formData)
    // диспатч на добавление в стейт 
    setformData(initialState)
    createToggle()
  }
  const handleChangeArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setformData({
      ...formData,
      [name]: value
    })
  }
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    editOneTodo(formData)
    setformData(initialState)
    createToggle()
  }
  console.log(formData)
  return (
    <>
    <FormAddTodo editTodo={editTodo} setformData={setformData} handleEdit={handleEdit} handleSubmit={handleSubmit} formData={formData} handleChangeInput={handleChangeInput} handleChangeCheckBox={handleChangeCheckBox} handleChangeArea={handleChangeArea} />
      <FormFormik />
      </>
   );
}
 
export default AddTodoPage;