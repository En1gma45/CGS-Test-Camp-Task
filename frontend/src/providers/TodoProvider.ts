import BaseProvider from "./BaseProvider";


class TodoService extends BaseProvider {

    public resRegister = 'register/'
    public resTodo = 'todo/';
    public resAuth = 'auth/'
    public base = 'http://localhost:5000/api/';

    createTodo(values: any) {
        return this.post(this.base, this.resTodo, values);
    }

    readTodo() {
        return this.get(this.base, this.resTodo);
    }

    updateTodo(values: any, id: string) {
        return this.put(this.base, this.resTodo, id, values);
    }

    deleteTodo(id: string) {
        return this.delete(this.base, this.resTodo, id)
    }

    loginUser(values: any) {
        return this.login(this.base, this.resAuth, values);
    }

    registerUser(values: any) {
        return this.register(this.base, this.resRegister, values);
    }
}

export default TodoService;
