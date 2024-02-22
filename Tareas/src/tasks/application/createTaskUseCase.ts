import { Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";
import { v4 as uuid } from "uuid";

export class CreateTaskUseCase {
    constructor(readonly TaskRepository: TaskRepository){}
    async createUser(
        name: string,
        description: string,
        ):Promise<Task | null | Error>{
            const generateUuid = uuid();
            const status = false
            try {
                const Crete = await this.TaskRepository.Createtask(generateUuid,name,description, status) 
                return Crete
            } catch (error) {
                return null;
            }
        }
}