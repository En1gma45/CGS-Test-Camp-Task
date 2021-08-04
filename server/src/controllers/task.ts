import { Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { validationResult } from "express-validator/check";
import Task, { ITask } from "../models/Task";
import Request from "../types/Request";
import { IParams } from "Params";
import { FilterQuery } from "mongoose";

class TaskController {
    // fetch all tasks
    async find(req: Request, res: Response) {
        try {

            // tslint:disable-next-line: prefer-const
            let { page, size, title, isPublic, isCompleted } = req.query;
            if (!page) {
                page = "1";
            }
            if (!size) {
                size = "5";
            }

            // tslint:disable-next-line: prefer-const
            // @ts-ignore
            const params: IParams = {};

            if (title) params.title = title as string;
            if (isPublic === "false" || isPublic === "true") params.isPublic = isPublic as string;
            if (isCompleted === "false" || isCompleted === "true") params.isCompleted = isCompleted as string;

            const limit = parseInt(size as string);
            const skip = (parseInt(page as string) - 1) * parseInt(size as string);

            console.log(params);


            const userId = res.locals.userId;
            const rangeOfTasks = await Task.count({ owner: userId });
            const tasks: Array<ITask> = await Task.find({ owner: userId}).find({...params! as FilterQuery<ITask>}).limit(limit).skip(skip);
            if (!tasks) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    errors: [
                        {
                            msg: "There is no tasks for this user",
                        },
                    ],
                });

            }
            res.json({
                query: req.query,
                countsOfPages: Math.ceil(rangeOfTasks / parseInt(size as string)),
                page,
                size,
                tasks
            });
          } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
          }
    }

    // create task
    async create(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
        }
        try {
            const { title, description, year, isPublic, isCompleted, owner } = req.body;
            const task: ITask = new Task({
                title,
                description,
                year,
                isPublic,
                isCompleted,
                owner
            });

            console.log(owner);

            await task.save();
            res.json(task);

        } catch (err) {
            console.log(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    // delete task
    async delete(req: Request, res: Response) {
        try {
            await Task.findByIdAndDelete({_id: req.params.id});
            res.json({msg: "Task removed"});
        } catch (err) {
            console.log(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }

    // update task
    async update(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
        }
        try {
            const updatedData = req.body;
            const updatedTask = await Task.findByIdAndUpdate({_id: req.params.id}, updatedData);
            if (!updatedTask) {
                return res.status(404).json({
                    status: "error",
                    code: 404,
                    message: "Bad request"
                });
            }

            res.json(updatedTask);

        } catch (err) {
            console.log(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
}

export default new TaskController();