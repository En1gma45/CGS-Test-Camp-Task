import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import Request from "../../types/Request";
import HttpStatusCodes from "http-status-codes";
import Todo,{ ITodos } from "src/models/Todo";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const todo: ITodos = await Todo.find()
    if (!todo) {
     return res.status(404).json({
        status: "error",
        code: 404,
        message:"Bad request"
      })
    }
    res.json(todo)
  } catch (error) {
    console.error(error.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
})
router.post("/todo/update/:todoId",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description","Description is required").not().isEmpty(),
    check("year","Year is required").not().isEmpty()

  ],
  async (req: Request, res: Response) => {
  try {
    const { todoId } = req.params
    const updated = req.body
    const updatedTodo = Todo.findByIdAndUpdate(todoId, updated) // findByIdAndUpdate() в пармсах будет тело туду
    if (!updatedTodo) {
      return res.status(404).json({
       status: "error",
        code: 404,
        message:"Bad request"
     })
    }
    res.json(updated)
  } catch (error) {
    console.error(error.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
})
router.post("todo/post",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description","Description is required").not().isEmpty(),
    check("year","Year is required").not().isEmpty()

  ],
  async (req: Request, res: Response) => {
  try {
    const addTodo = Todo.insert(req.body)
    if (!addTodo) {
      return res.status(404).json({
       status: "error",
        code: 404,
        message:"Bad request"
     })
    }
    res.json(addTodo)
  } catch (error) {
    console.error(error.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
})
router.delete("/todo/:todoId",async (req: Request, res: Response) => {
  try {
    await Todo.findByIdAndDelete({ _id: req.todoId })
    res.json({
      message:"Element was removed"
    })
  } catch (error) {
    console.error(error.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
})

export default router

