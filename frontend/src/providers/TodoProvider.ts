import BaseProvider from "./BaseProvider";


class TodoService extends BaseProvider {

    create(values: any) {
        return this.post('http://localhost:5000/api/', 'todo', values);
    }
    edit(values: any, id: string) {
        return this.put('http://localhost:5000/api/', 'todo/', id, values);
    }
}

export default TodoService;
