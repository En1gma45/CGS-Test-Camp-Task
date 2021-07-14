import React from 'react'
import { Todo } from '../../interfaces';
import FormEdit from './Form/FormEdit';
import FormFormik from './Form/Formik';
export interface AddTodoPageProps {
  addToList(todo: Todo): void,
  editTodo: Todo[],
  createToggle(): void,
  editOneTodo(todo: Todo): void,
}
const AddTodoPage: React.SFC<AddTodoPageProps> = ({addToList,editTodo,createToggle,editOneTodo}) => {
  const handleEdit = (formData:Todo) => {
    editOneTodo(formData)
    createToggle()
  }
  return (
    <>
      {editTodo.length > 0 ? <FormEdit handleEdit={handleEdit} createToggle={createToggle} editTodo={editTodo}/> : <FormFormik createToggle={createToggle} addToList={addToList}  />}
      </>
   );
}
 
export default AddTodoPage;