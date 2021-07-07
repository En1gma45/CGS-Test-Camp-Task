import {Request, Response, Router} from "express"
import {ITodo} from "todoTypes";
import Todo from "../../models/todoModel";
import auth from "../../middleware/auth";
const router: Router = Router()

router.get("/todos", auth, async (req: Request, res: Response): Promise<void> => {
    const isCompleted = JSON.parse(<string>req.query.isCompleted)
    const isPublic = JSON.parse(<string>req.query.isPublic)
    try {
        const PAGE_SIZE = 4;
        const page = parseInt(<string>req.query.page || "0");
        const total = await Todo.countDocuments({});
        const todos: ITodo[] = await Todo.find({ author: req.user, isCompleted: isCompleted, isPublic: isPublic }).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
        res.status(200).json({ totalPages: Math.ceil(total / PAGE_SIZE), todos })
    } catch (error) {
        console.log(error)
    }
})


router.get("/todo/:id" , auth, async (req: Request, res: Response): Promise<void> => {
    try {
        const todo: ITodo = await Todo.findOne({ author: req.user })
        res.status(200).json(todo)
    } catch (error) {
        console.log(error)
    }
})


router.post("/todos" , auth, async (req: Request, res: Response): Promise<void> => {
        try {
            const body = req.body as Pick<ITodo, "title" | "description" | "year" | "isPublic" | "isCompleted">
            const todo: ITodo = new Todo({
                title: body.title,
                description: body.description,
                year: body.year,
                isPublic: body.isPublic,
                isCompleted: body.isCompleted,
                author: req.user
            })

            const newTodo: ITodo = await todo.save()
            const allTodos: ITodo[] = await Todo.find({author: req.user})

            res
                .status(200)
                .json({message: "Todo added", todo: newTodo, todos: allTodos})
        } catch (error) {
            console.log(error)
        }

})


router.put("/todos/:id" , auth, async (req: Request, res: Response): Promise<void> => {
        try {
            const {
                params: {id},
                body,
            } = req
            const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
                {_id: id},
                body
            )
            const allTodos: ITodo[] = await Todo.find({author: req.user})
            res.status(200).json({
                message: "Todo updated",
                todo: updateTodo,
                todos: allTodos,
            })
        } catch (error) {
            console.log(error)
        }
})

router.delete("/todos/:id" , auth, async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
                req.params.id
            )
            const allTodos: ITodo[] = await Todo.find({author: req.user})
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




