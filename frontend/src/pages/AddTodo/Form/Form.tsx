import React,{useState,useEffect} from 'react'
import { Todo } from '../../../interfaces';
export interface FormProps {
  formData:Todo,
  handleChangeInput(event: React.ChangeEvent<HTMLInputElement>): void,
  handleChangeArea(event: React.ChangeEvent<HTMLTextAreaElement>): void,
  handleChangeCheckBox(event: React.ChangeEvent<HTMLInputElement>): void
  handleSubmit(event: React.FormEvent<HTMLFormElement>): void,
  editTodo: Todo[],
  handleEdit(e: React.FormEvent<HTMLFormElement>): void
  setformData(todo:Todo):void
}
 
const FormAddTodo: React.SFC<FormProps> = ({ formData,setformData, handleChangeInput,handleChangeArea,handleChangeCheckBox,handleSubmit,editTodo,handleEdit }) => {
  const [status, setstaus] = useState(false)
  useEffect(() => {
    if (editTodo.length > 0) {
      setformData({...formData,...editTodo[0]})
    }
  },[])
  const changeStatus = () => {
    setstaus(true)
  }
  return (
    editTodo.length > 0 ? <form action="submit" onSubmit={handleEdit} > 
      <label htmlFor="FormAddTodo">Title</label>
      <input onClick={changeStatus} onChange={handleChangeInput} type="text" id="title" name="title" value={!status ? editTodo[0].title : formData.title} />
      <label htmlFor="description">Description</label>
      <textarea onClick={changeStatus} onChange={handleChangeArea}  id="description" name="description" value={!status ? editTodo[0].description:formData.description} />
      <label htmlFor="year">Year</label>
      <input onClick={changeStatus} onChange={handleChangeInput} type="text" name="year" id="year" value={!status ? editTodo[0].year:formData.year} />
      <label htmlFor="public">Public</label>
      <input onClick={changeStatus} onChange={handleChangeCheckBox} type="checkbox" id="public" name="public" checked={!status ? editTodo[0].public:formData.public}/>
      <label htmlFor="completed">Completed</label>
      <input onClick={changeStatus} onChange={handleChangeCheckBox} type="checkbox" name="completed" id="completed" checked={!status ? editTodo[0].completed:formData.completed} />
      <button type="submit">Edit</button>
  </form> : 
  <form action="submit" onSubmit={handleSubmit} > 
      <label htmlFor="FormAddTodo">Title</label>
      <input onChange={handleChangeInput} type="text" id="title" name="title" value={formData.title} />
      <label htmlFor="description">Description</label>
      <textarea onChange={handleChangeArea}  id="description" name="description" value={formData.description} />
      <label htmlFor="year">Year</label>
      <input onChange={handleChangeInput} type="text" name="year" id="year" value={formData.year} />
      <label htmlFor="public">Public</label>
      <input onChange={handleChangeCheckBox} type="checkbox" id="public" name="public" checked={formData.public}/>
      <label htmlFor="completed">Completed</label>
      <input onChange={handleChangeCheckBox} type="checkbox" name="completed" id="completed" checked={formData.completed} />
      <button type="submit">Create</button>
  </form>
   );
}
 
export default FormAddTodo;