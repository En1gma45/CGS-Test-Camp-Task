import {Response, Router} from "express";
import {validationResult} from "express-validator/check";
import Request from "Request";
import HttpStatusCodes from "http-status-codes";
import Todo, {ITodo} from "../../models/Todo";
import validationCheck from '../../helpers/validator';
import auth from "../../middleware/auth";
import Payload from "Payload";
import jwt from "jsonwebtoken";
import config from "config";
import extractId from "../../util/tokenUtil";

const router: Router = Router();

let mongoose = require('mongoose');


router.get(
    "/",
    validationCheck,
    async (req: Request, res: Response) => {
        let userId;
        try {
            // @ts-ignore
            userId = extractId(req.headers['x-auth-token']);
        } catch (err) {
            return res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({ msg: "Token is not valid" });
        }
        try {
            let todos: ITodo[] = await Todo.find({ userId });
            return res.status(HttpStatusCodes.OK).json(todos);
        } catch (err) {
            console.error(err.message);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
        }
    }
);


router.get(
    "/:id",
    validationCheck,
    async (req: Request, res: Response) => {
        try {

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
   validationCheck,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        let userId;
        try {
            // @ts-ignore
            userId = extractId(req.headers['x-auth-token']);
        } catch (err) {
            return res
                .status(HttpStatusCodes.UNAUTHORIZED)
                .json({ msg: "Token is not valid" });
        }

        if (!errors.isEmpty()) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({errors: errors.array()});
        }

        try {
            let body = req.body;
            body['userId'] = userId;
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
    validationCheck,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({errors: errors.array()});
        }

        try {

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