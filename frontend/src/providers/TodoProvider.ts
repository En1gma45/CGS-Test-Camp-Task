import BaseProvider from "./BaseProvider";


class TodoService extends BaseProvider {

    public res = 'todo/';
    public base = 'http://localhost:5000/api/';

    createTodo(values: any) {
        return this.post(this.base, this.res, values);
    }
    readTodo() {
        return this.get(this.base, this.res);
    }
    updateTodo(values: any, id: string) {
        return this.put(this.base, this.res, id, values);
    }
    deleteTodo(id: string) {
        return this.delete(this.base, this.res, id)
    }

}

export default TodoService;
