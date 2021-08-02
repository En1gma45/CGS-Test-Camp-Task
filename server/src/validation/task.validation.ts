import { check } from "express-validator/check";

export const TaskBodyValidator = [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("year", "Year is required").not().isEmpty()
];
