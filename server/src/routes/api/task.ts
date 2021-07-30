import { Router } from "express";
import TaskController from '../../controllers/task'
import { TaskBodyValidator } from "../../validation/task.validation";


const router: Router = Router()

router.get('/', TaskController.find)
router.post('/', TaskBodyValidator,TaskBodyValidator, TaskController.create)
router.delete('/:id', TaskController.delete)
router.put('/:id', TaskBodyValidator,TaskBodyValidator, TaskController.update)

export default router
