import { Router } from "express";
import { check } from "express-validator/check";
import TaskController from '../../controllers/task'
import { TaskBodyValidator } from "../../validation/task.validation";


const router: Router = Router()

router.get('/', TaskController.find)
router.get('/:id', TaskController.findCurrentTask)
router.post('/', TaskBodyValidator, TaskController.create)
router.delete('/:id', TaskController.delete)
router.put('/:id', TaskBodyValidator, TaskController.update)

export default router
