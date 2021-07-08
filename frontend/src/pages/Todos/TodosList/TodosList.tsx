import { Todo } from "../../../interfaces";
import TodosElement from "../TodosElement/TodosElement";
export interface TodosListProps {
  todos: Todo[],
  deleteTodo(id: string): void,
  changeTodo(id: string): void,
}
 
const TodosList: React.SFC<TodosListProps> = ({ todos,deleteTodo,changeTodo }) => {
  const renderTodo = todos.map((todo, index) => <TodosElement key={index} deleteTodo={deleteTodo} changeTodo={changeTodo}todo={todo}/>)
  return (
    <>
      {renderTodo}
      </>
   );
}
 
export default TodosList;