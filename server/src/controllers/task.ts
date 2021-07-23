import { Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { validationResult } from "express-validator/check";
import Task, { ITask } from '../models/Task';
import Request from "../types/Request";

class TaskController{
    //fetch all tasks
    async find(req: Request, res: Response){
        try {
            const { userId } = req.body
            const tasks: Array<ITask> = await Task.find()
            if (!tasks) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    errors: [
                        {
                            msg: "There is no tasks for this user",
                        },
                    ],
                });
            }
            res.json(tasks);
          } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
          }
    }

    //fetch current task
    async findCurrentTask(req: Request, res: Response){
        try {
            const tasks: ITask = await Task.findById({_id: req.params.id })
            if (!tasks) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    errors: [
                        {
                            msg: "There is no tasks for this user",
                        },
                    ],
                });
            }
            res.json(tasks);
          } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
          }
    }

    //create task
    async create(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
        }
        try {
            const { title, description, year, isPublic, isCompleted, userId} = req.body
            const task: ITask = await new Task({
                title,
                description,
                year,
                isPublic,
                isCompleted,
                owner: userId
            })
            task.save()
            res.json(task)
                
        } catch (err) {
            console.log(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    //delete task
    async delete(req: Request, res: Response){
        try {
            await Task.findByIdAndDelete({_id: req.params.id})
            res.json({msg: "Task removed"})
        } catch (err) {
            console.log(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    //update task
    async update(req: Request, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
        }
        try {
            const updatedData = req.body
            const updatedTask = await Task.findByIdAndUpdate({_id: req.params.id}, updatedData)
            if(!updatedTask){
                return res.status(404).json({
                    status: "error",
                    code: 404,
                    message:"Bad request"
                })
            }

            res.json(updatedTask)
            
        } catch (err) {
            console.log(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
}

export default new TaskController()
