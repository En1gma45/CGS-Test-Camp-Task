import { Router } from "express";
import HttpStatusCodes from "http-status-codes";

import Todo, { ITodo } from "../../models/Todo";

const router: Router = Router();

// @route   POST api/todos
// @desc    Create a todo given its title, description, year, public and competed statuses, returns the new todo
// @access  Public
router.post("/", async (req, res) => {
  const { title, description, year, isPublic, isCompleted } = req.body;

  try {
    // Build a todo object based on ITodo
    const todoFields = { title, description, year, isPublic, isCompleted };

    const todo = new Todo(todoFields);

    await todo.save();

    res.json(todo);
  } catch(err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   GET api/todos
// @desc    Get all todos
// @access  Public
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   GET api/todos/:todoId
// @desc    Get a todo by todoId
// @access  Public
router.get("/:todoId", async (req, res) => {
  try {
    const todo: ITodo = await Todo.findOne({ _id: req.params.todoId });

    if (!todo)
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: "Todo not found" });

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: "Todo not found" });
    }
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
})

// @route   PUT api/todos/:todoId
// @desc    Update a todo by todoId
// @access  Public
router.put("/:todoId", async (req, res) => {
  const { title, description, year, isPublic, isCompleted } = req.body;

  try {
    // Build a todo object based on ITodo
    const todoFields = { title, description, year, isPublic, isCompleted };

    const todo = await Todo.findOneAndUpdate({ _id: req.params.todoId }, todoFields);
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// @route   DELETE api/todos/:todoId
// @desc    Delete a todo by todoId
// @access  Public
router.delete("/:todoId", async (req, res) => {
  try {
    // Remove todo
    await Todo.findOneAndRemove({ _id: req.params.todoId });

    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});



export default router;