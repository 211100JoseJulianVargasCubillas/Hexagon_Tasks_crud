import { Request, Response } from "express";
import { GetAllTaskUseCase } from "../../application/getAllTaskUseCase"; 


export class GetAllTasksController{
    constructor(private getAllTasksUseCase: GetAllTaskUseCase){};


    async allTask(req:Request, res:Response){
        try {
            const listTask = await this.getAllTasksUseCase.getAll()
            if(listTask){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        listTask
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "Task not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the Tasks."
            });
        }
    }
}