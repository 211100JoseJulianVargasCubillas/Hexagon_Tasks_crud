import express from 'express';
import { createTaskController,getAllTasksController,getByIdCoontroller, updateTaskByIdController,deleteTaskController} from './dependencies';

export const userRoutes = express.Router();

userRoutes.post("/",createTaskController.taskController.bind(createTaskController))
userRoutes.get("/all", getAllTasksController.allTask.bind(getAllTasksController));
userRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))
userRoutes.put("/:uuid", updateTaskByIdController.update.bind(updateTaskByIdController))
userRoutes.delete("/:uuid", deleteTaskController.deleteTask.bind(deleteTaskController))