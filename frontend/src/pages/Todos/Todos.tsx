import { useState, useEffect } from "react";
import { shallowEqual, useSelector } from 'react-redux'
import { Todo } from "../../interfaces";
import styles from './Todos.module.css'
import initialState from "./exampleinitialState";
import TodosList from "./TodosList/TodosList";
import AddTodoPage from "../AddTodo/AddTodo";
import FormFormik from '../AddTodo/Form/Formik'
export interface TodosMainPageProps {
  
}
 
const TodosMainPage: React.SFC<TodosMainPageProps> = () => {
  const [todos, settodos] = useState<Todo[]>(initialState)
  const [editTodo, seteditTodo] = useState<Todo[]>([])
  const [create, setcreate] = useState(false)
  useEffect(() => {
    
  })
  const deleteTodo = (id:string) => {
    const newTodo = [...todos]
    const filtred = newTodo.filter(elem => elem._id !== id)
    settodos(filtred)
  }
  const changeTodo = (id: string) => {
    const forChange = todos.filter(elem => elem._id === id)
    seteditTodo(forChange)
    createToggle()
  }
  const addToList = (todo:Todo) => {
    settodos([...todos,todo])
  }
  const createToggle = () => {
    setcreate(!create)
  }
  const editOneTodo = (todo:Todo) => {
    const allTodos = [...todos]
    const index = allTodos.indexOf(editTodo[0])
    allTodos[index] = todo
    settodos(allTodos)
  }
  return (
    <>
      {/* {!create && <div className={styles.btnAdd}><button  onClick={createToggle}>Create New Todo</button></div>}
      {!create ? <TodosList todos={todos}  deleteTodo={deleteTodo} changeTodo={changeTodo} /> : <AddTodoPage editOneTodo={editOneTodo} createToggle={createToggle} editTodo={editTodo} addToList={addToList}/>} */}
      <FormFormik/>
      </>
   );
}
 
export default TodosMainPage;