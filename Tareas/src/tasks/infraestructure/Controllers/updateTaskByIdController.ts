import { Request,Response } from "express";
import { UpdateTaskByIdUseCase } from "../../application/updateTaskByIdUseCase";

export class UpdateTaskByIdController{
    constructor( readonly updateTaskByIdUseCase:UpdateTaskByIdUseCase){}

    async update(req:Request, res:Response) {
        try {
            let {
                uuid,
            } = req.params

            let {
                name,
               description
            } = req.body
        
            let UpdateTaskById = await this.updateTaskByIdUseCase.update(uuid,name,description)

            if(UpdateTaskById){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        update_task: UpdateTaskById
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "User not found "
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
                message: "An error occurred while update the user."
            });   
        }
    }
}