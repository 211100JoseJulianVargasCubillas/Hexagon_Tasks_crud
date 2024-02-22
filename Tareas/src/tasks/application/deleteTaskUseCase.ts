import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";


export class DeleteTaskUseCase{

    constructor(readonly TaskRepository: TaskRepository){}

    async deleteTask(uuid:string):Promise<string | null>{

        try {
            const Task = await this.TaskRepository.deleteTask(uuid);
            return Task;
        } catch (error) {
            return null
        }
    }
}