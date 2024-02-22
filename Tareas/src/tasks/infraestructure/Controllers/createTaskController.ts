import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/createTaskUseCase";
import { Task } from "../../domain/task";

export class CreateTaskController {
    constructor (readonly createTaskUseCase: CreateTaskUseCase){}

    async taskController(req:Request, res:Response){
        try {
            let{name, description} = req.body

            const createU= await this.createTaskUseCase.createUser(name,description)

            if (createU instanceof Task) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        id: createU.uuid,
                        name: createU.name,
                        description: createU.description,
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the user."
                });
            }
        } catch (error) {
            return null ;
        }
    }
}