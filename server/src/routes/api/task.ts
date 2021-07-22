import { Router } from "express";
import { check } from "express-validator/check";
import TaskController from '../../controllers/task'


//const task = require('../../controllers/task')
const router: Router = Router()

router.get('/', TaskController.find)

router.post('/create', 
    [
        check("title", "Title is required").not().isEmpty(),
        check("description","Description is required").not().isEmpty(),
        check("year","Year is required").not().isEmpty()
    ],
    TaskController.create
)

router.delete('/delete/:id', TaskController.delete)

router.put('/update/:id',
    [
        check("title", "Title is required").not().isEmpty(),
        check("description","Description is required").not().isEmpty(),
        check("year","Year is required").not().isEmpty()
    ],
    TaskController.update
)

export default router
