import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Request from "../../types/Request";
import Todo, { ITodo } from "../../models/Todo";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    let todos = await Todo.find({});
    res.json({ todos });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        
        const { title, description, year, isPublic, completed } = req.body;        

        const todo = new Todo({
            title,
            description,
            year,
            isPublic,
            completed
        });
        const resp = await todo.save();
        console.log(resp)
        res.status(200).json(resp);
    } catch (err) {
        console.log(err)
    }
})

router.put("/", async (req, res) => {
    try {

        const { id, title, description, year, isPublic, completed } = req.body;

        const todo = await Todo.findById(id)

        if (!todo) {
            return res.status(404).json('bad request');
        }

        const updatedTodo = {
            title,
            description,
            year,
            isPublic,
            completed
        };

        const resp = await Todo.findByIdAndUpdate(id, updatedTodo, {new: true})

        res.status(200).json(resp);
    } catch (err) {
        console.log(err)
    }
})

router.delete("/:id ", async (req, res) => {
    try {
        const id = req.params.id;
        
        const resp = await Todo.findByIdAndRemove(id);
        if (!resp) {
            return res.status(404).json('bad request');
        }
        res.status(200).json(true);
    } catch (err) {
        console.error(err);
        res.status(500).json('bad request')
    }
    

})

export default router;
