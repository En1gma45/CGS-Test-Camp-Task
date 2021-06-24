import {Request, Response, Router} from "express"
import {ITodo} from "todoTypes";
import Todo from "../../models/todoModel";

const router: Router = Router()

router.get("/todos", async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    } catch (error) {
        console.log(error)
    }
})


router.post("/add-todo", async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "title" | "description" | "year" | "isPublic" | "isCompleted">

        const todo: ITodo = new Todo({
            title: body.title,
            description: body.description,
            year: body.year,
            isPublic: body.isPublic,
            isCompleted: body.isCompleted,
        })

        const newTodo: ITodo = await todo.save()
        const allTodos: ITodo[] = await Todo.find()

        res
            .status(201)
            .json({ message: "Todo added", todo: newTodo, todos: allTodos })
    } catch (error) {
        console.log(error)
    }
})

router.put("/edit-todo/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req
        const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
            { _id: id },
            body
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo updated",
            todo: updateTodo,
            todos: allTodos,
        })
    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete-todo/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        )
        const allTodos: ITodo[] = await Todo.find()
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        })
    } catch (error) {
        console.log(error)
    }
})

export default router




