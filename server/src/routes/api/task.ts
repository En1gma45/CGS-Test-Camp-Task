import { Router } from "express";
import verifyToken from "../../middlewares/authorization.middleware";
import TaskController from "../../controllers/task";
import { TaskBodyValidator } from "../../validation/task.validation";

const router: Router = Router();

router.get("/", verifyToken, TaskController.find);
router.post("/", verifyToken, TaskBodyValidator, TaskController.create);
router.delete("/:id", verifyToken, TaskController.delete);
router.put("/:id", verifyToken, TaskBodyValidator, TaskController.update);

export default router;
