import {Response, Router} from "express";
import {check, validationResult} from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Request from "../../types/Request";
import TodoTask from "../../models/ToDoTask";

const router: Router = Router();

const getTodoTasks = async (req: Request, res: Response) => {
    try {
        const todos: any = await TodoTask.find({userId: req.userId, isDeleted: false});
        return res.json(todos);
    } catch (err) {
        console.log(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}

const createTodoTask = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({errors: errors.array()});
    }

    const {title, description, year, isPublic, isCompleted} = req.body
    const todoFields = {
        title,
        description,
        year,
        isPublic,
        isCompleted
    };
    try {
        const todo = new TodoTask(todoFields)
        await todo.save();
        res.json(todo)
    } catch (err) {
        console.log(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}

const updateTodo = async (req: Request, res: Response) => {
    try {
        // Update task
       const updatedTask = await TodoTask.findOneAndUpdate({_id: req.params.id});
        res.json({msg: "ToDoTask removed", updatedTask});
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}

const deleteTodoTask = async (req: Request, res: Response) => {
    try {
        // Remove task
        await TodoTask.findOneAndRemove({_id: req.params.id});
        res.json({msg: "ToDoTask removed"});
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}


router.get('/', getTodoTasks);
router.post('/',
    [
        check("title", "Title is required").not().isEmpty(),
        check("description", "Desc is required").not().isEmpty(),
        check("year", "Year is required").not().isEmpty(),
        check("isPublic", "Public is required").not().isEmpty(),
        check("isCompleted", "Completed is required").not().isEmpty(),
    ], createTodoTask);
router.put('/',
 //[check("id", "Id is required").not().isEmpty(),],
    updateTodo);
router.delete("/", deleteTodoTask);

export default router;
