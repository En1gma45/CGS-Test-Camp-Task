import {Response, Router} from "express";
import {check, validationResult} from "express-validator/check";
import Request from "Request";
import HttpStatusCodes from "http-status-codes";
import Todo, {ITodo} from "../../models/Todo";

const router: Router = Router();

router.get(
    "/",
    [],
    async (req: Request, res: Response) => {
        try {
            let todos: ITodo[] = await Todo.find({});
            return res.status(HttpStatusCodes.OK).json(todos);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
);


router.get(
    "/:id",
    [],
    async (req: Request, res: Response) => {
        try {
            let mongoose = require('mongoose');

            if (!mongoose.Types.ObjectId.isValid(req.params.id))
                res.status(HttpStatusCodes.BAD_REQUEST).json({"error": "Wrong id format"})

            let ObjectID = require('mongodb').ObjectID;
            let todo: ITodo = await Todo.findOne({_id: new ObjectID(req.params.id)});

            if (todo == null)
                res.status(HttpStatusCodes.NOT_FOUND).json({"error": "Todo with given id was not found"});

            return res.status(HttpStatusCodes.OK).json(todo);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
);

router.post(
    "/",
    [
        check("title", "Please include a valid title").isLength({min: 5, max: 50}),
        check("description", "Please include a valid description").isLength({min: 5, max: 100}),
        check("year", "Please include a valid year").isInt({min: 1970, max: 2040}),
        check("isPublic", "Please include a valid public").isBoolean(),
        check("isCompleted", "Please include a valid completed").isBoolean()
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({errors: errors.array()});
        }

        try {
            let todo = new Todo(req.body);
            await todo.save();
            return res.status(200).json(todo);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
);


router.put(
    "/:id",
    [
        check("title", "Please include a valid title").isLength({min: 5, max: 50}),
        check("description", "Please include a valid description").isLength({min: 5, max: 100}),
        check("year", "Please include a valid year").isInt({min: 1970, max: 2040}),
        check("isPublic", "Please include a valid public").isBoolean(),
        check("isCompleted", "Please include a valid completed").isBoolean()
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({errors: errors.array()});
        }

        try {
            let mongoose = require('mongoose');

            if (!mongoose.Types.ObjectId.isValid(req.params.id))
                res.status(HttpStatusCodes.BAD_REQUEST).json({"error": "Wrong id format"})

            let ObjectID = require('mongodb').ObjectID;
            let todo: ITodo = await Todo.findOne({_id: new ObjectID(req.params.id)});

            if (todo == null)
                res.status(HttpStatusCodes.NOT_FOUND).json({"error": "Todo with given id was not found"});

            todo.title = req.body.title;
            todo.description = req.body.description;
            todo.year = req.body.year;
            todo.isPublic = req.body.isPublic;
            todo.isCompleted = req.body.isCompleted;

            await todo.save();
            return res.status(200).json({todo});
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
);

router.delete(
    "/:id",
    [],
    async (req: Request, res: Response) => {
        try {
            let mongoose = require('mongoose');

            if (!mongoose.Types.ObjectId.isValid(req.params.id))
                res.status(HttpStatusCodes.BAD_REQUEST).json({"error": "Wrong id format"})

            let ObjectID = require('mongodb').ObjectID;
            let todo: ITodo = await Todo.findOne({_id: new ObjectID(req.params.id)});

            if (todo == null)
                res.status(HttpStatusCodes.NOT_FOUND).json({"error": "Todo with given id was not found"});

            await Todo.deleteOne({_id: new ObjectID(req.params.id)});
            return res.status(HttpStatusCodes.OK).json(todo);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
);

export default router;