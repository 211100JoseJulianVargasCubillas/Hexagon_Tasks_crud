import { Request, Response } from "express";
import { DeleteTaskUseCase } from "../../application/deleteTaskUseCase";


export class DeleteTaskController{
    constructor(readonly deleteTaskUseCase: DeleteTaskUseCase){}


    async deleteTask(req:Request,res:Response){
        try {

            let { uuid } = req.params;
        
            let UpdateTaskById = await this.deleteTaskUseCase.deleteTask(uuid)

            if(UpdateTaskById){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        message: UpdateTaskById
                    }
                })
            }
            else{
                return res.status(404).send({
                    status: "error",
                    message: "Task not found."
                });
            }
        } catch (error) {  
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            } 
            return res.status(500).send({
                status: "error",
                message: "An error occurred while delete the user."
            });
        }
    }
}