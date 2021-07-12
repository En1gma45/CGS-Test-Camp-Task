import axios from 'axios';

class TodoService {
    regTodo() {
        return async (values:any) => {
            await axios.post('http://localhost:5000/api/todo', values)
        }
    }
}

export default TodoService;