import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";

export class GetAllTaskUseCase {
    constructor(readonly taskRepository: TaskRepository){}

    async getAll ():Promise<Task[] |null>{
    try {
        const listTasks= await this.taskRepository.GetAllTask();
        return listTasks
    } catch (error) {
        return null;
    }}
}