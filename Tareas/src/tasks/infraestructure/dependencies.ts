import { MySqlTaskRepository } from "./mySqlTaskRepository";
import { CreateTaskUseCase } from "../application/createTaskUseCase";
import { CreateTaskController } from "./Controllers/createTaskController";
import { GetAllTaskUseCase } from "../application/getAllTaskUseCase"; 
import { GetAllTasksController } from "./Controllers/getAllTasksController";
import { GetByIdUseCase } from "../application/getByIdTaskCase";
import { GetByIdCoontroller } from "./Controllers/getByIdController";
import { UpdateTaskByIdUseCase } from "../application/updateTaskByIdUseCase";
import { UpdateTaskByIdController } from "./Controllers/updateTaskByIdController";
import { DeleteTaskUseCase } from "../application/deleteTaskUseCase";
import { DeleteTaskController } from "./Controllers/deleteTaskController";

export const mySqlTaskRepository = new MySqlTaskRepository()

export const createTaskUseCase = new CreateTaskUseCase(mySqlTaskRepository)
export const createTaskController = new CreateTaskController ( createTaskUseCase)

export const getAllTasksUseCase = new GetAllTaskUseCase(mySqlTaskRepository);
export const getAllTasksController = new GetAllTasksController(getAllTasksUseCase);

export const getByIdUseCase = new GetByIdUseCase(mySqlTaskRepository);
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase);

export const updateTaskByIdUseCase = new UpdateTaskByIdUseCase(mySqlTaskRepository);
export const updateTaskByIdController = new UpdateTaskByIdController (updateTaskByIdUseCase);

export const deleteTaskUseCase = new DeleteTaskUseCase(mySqlTaskRepository);
export const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);