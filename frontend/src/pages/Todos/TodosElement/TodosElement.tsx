import { Todo } from "../../../interfaces";
export interface TodosElementProps {
  todo: Todo,
  deleteTodo(id: string): void,
  changeTodo(id: string): void,
}
 
const TodosElement: React.SFC<TodosElementProps> = ({todo,deleteTodo,changeTodo}) => {
  return (
    <li style={{listStyle:"none",width:"300px"}}>
      <p>{todo.title}</p>
      <p>{todo.year}</p>
      <p>{todo.description}</p>
      {todo.completed ? <p>Completed</p> : <p>Not copmleted</p>}
      {todo.public ? <p>Public</p> : <p>Private</p>}
      <button onClick={() => deleteTodo(todo._id || "0")}>Delte</button>
      <button onClick={()=>changeTodo(todo._id || "0")}>Edit</button>
      </li>
   );
}
 
export default TodosElement;