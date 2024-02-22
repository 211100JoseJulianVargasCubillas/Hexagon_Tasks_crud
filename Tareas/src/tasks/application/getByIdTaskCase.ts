import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";



export class GetByIdUseCase{
    constructor(readonly taskRepository:TaskRepository ){}

    async getId(uuid:string):Promise<Task | null>{
        try {
            const getTaskById = await this.taskRepository.getById(uuid);
            return getTaskById;
        } catch (error) {
            return null
        }
    }
}