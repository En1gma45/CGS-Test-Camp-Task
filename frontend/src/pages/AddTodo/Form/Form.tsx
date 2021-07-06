import React from 'react'
export interface FormProps {
  
}
 
const FormAddTodo: React.SFC<FormProps> = () => {
  return (
  <form action="submit" onSubmit=""> 
      <label htmlFor="FormAddTodo">Title</label>
      <input type="text" id="title" name="title" value={""} />
      <label htmlFor="description">Description</label>
      <textarea type="text" id="description" name="description" value={""} />
      <label htmlFor="year">Year</label>
      <input type="text" name="year" id="year" value={""} />
      <label htmlFor="public">Public</label>
      <input type="checkbox" id="public" name="public" checked=""/>
      <label htmlFor="completed">Completed</label>
      <input type="checkbox" name="completed" id="completed" checked="" />
      <button type="submit">Create</button>
  </form>
   );
}
 
export default FormAddTodo;