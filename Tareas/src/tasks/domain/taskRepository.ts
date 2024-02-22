import { promises } from "dns";
import { Task } from "./task";

export interface TaskRepository{
    Createtask(
        uuid: string,
        name: string,
        description: string,
        status: boolean
    ):Promise<Task | null | Error>

    GetAllTask():Promise<Task[] | null>
    
    getById(uuid:string):Promise<Task | null>

    updateTaskById( //listo 
        uuid: string,
        name?: string,
        description?: string,
    ): Promise<Task | null>

    deleteTask(uuid: string):Promise<string | null>;

}