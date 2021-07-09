import {check, validationResult} from "express-validator/check";


const validationCheck = [
    check("title", "Please include a valid title").isLength({min: 5, max: 50}),
    check("description", "Please include a valid description").isLength({min: 5, max: 100}),
    check("year", "Please include a valid year").isInt({min: 1970, max: 2040}),
    check("isPublic", "Please include a valid public").isBoolean(),
    check("isCompleted", "Please include a valid completed").isBoolean()
]

export default validationCheck;