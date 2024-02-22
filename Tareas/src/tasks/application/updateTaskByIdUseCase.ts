import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";

export class UpdateTaskByIdUseCase{
    constructor(readonly TaskRepository:TaskRepository){}

    async update(
        uuid: string,
        name?: string,
        description?: string,
        ): Promise<Task | null> {

        
        try {
            const updateTaskById = await this.TaskRepository.updateTaskById(uuid,name,description);
            return updateTaskById;
        } catch (error) {
            return null;
        }
    }
}