import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dto";
import { TodoRepository } from "../../domain";

export class TodoController {

    //*Inyeccion de dependencias
    constructor(
        private readonly todoRepository:TodoRepository
    ){}

    public getTodos = async(req:Request,res:Response)=>{
        const todos = await this.todoRepository.getAll();
        res.json({
            ok:true,
            todos,
        });
    }

    public getTodoById = async(req:Request,res:Response)=>{
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({
                error:'Invalid Id',
            });
            return;
        }
        try {
            const todo = await this.todoRepository.findById(id);
            res.json({
                ok:true,
                todo
            });
        } catch (error) {
            res.status(404).json({
                ok:false,
                error
            });
        }
        
    }

    public createTodo = async(req:Request,res:Response)=>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if (error){
            res.status(400).json({
                ok:false,
                error
            });
            return;
        }

        const todo = await this.todoRepository.create(createTodoDto!);
        res.json({
            ok:true,
            todo
        })
    };

    public updateTodo = async(req:Request,res:Response)=>{
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({
                error:'Invalid Id',
            });
            return;
        }
        const [clientError,updateTodoDto] = UpdateTodoDto.create({...req.body,id});
        try {
            const todo = await this.todoRepository.update(updateTodoDto!);
            res.json({
                ok:true,
                todo
            });
            return;
        } catch (error) {
            res.status(400).json({
                ok:false,
                error: clientError ? clientError : error
            });
            return; 
        }
    };

    public deleteTodo = async(req:Request,res:Response)=>{
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({
                error:'Invalid Id',
            });
            return;
        }
        
        try {
            const todo = await this.todoRepository.delete(id);
            res.json({
                ok:true,
                todo
            })
            return;
        } catch (error) {
            res.status(404).json({
                error:`Todo ${id} not found`
            });
            return; 
        }
    }

}