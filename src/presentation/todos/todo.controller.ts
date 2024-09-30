import { Request, Response } from "express"

const todos = [
    {id:1,text:'Buy Milk', createdAt:new Date()},
    {id:2,text:'Buy Cheese', createdAt:new Date()},
    {id:3,text:'Buy Donuts', createdAt:new Date()}
];

export class TodoController {

    //*Inyeccion de dependencias
    constructor(){

    }

    public getTodos = (req:Request,res:Response)=>{
        res.json(todos);
    }

    public getTodoById = (req:Request,res:Response)=>{
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({
                error:'Invalid Id',
            });
            return;
        }
        const todo = todos.find(todo=>todo.id===id);
        (todo)
        ? res.json(todo)
        : res.status(404).json({
            error:`Todo ${id} not found`
        });
    }

    public createTodo = (req:Request,res:Response)=>{
        const {text} = req.body();
        if (!text){
            res.status(400).json({
                error:'Text is required'
            });
            return;
        }
        const newTodo = {
            id: todos.length + 1,
            text,
            createdAt: new Date(),
        }
        todos.push(newTodo);
        res.json({
            ok:true,
            todo:newTodo
        })
    };

    public updateTodo = (req:Request,res:Response)=>{
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({
                error:'Invalid Id',
            });
            return;
        }
        const {text} = req.body;
        if (!text){
            res.status(400).json({
                error:'Text is required'
            });
            return;
        }
        const todo = todos.find(todo=>todo.id===id);
        if(todo){
            todo.text=text;
            res.json({
                ok:true,
                todo
            })
            return;
        }
        res.status(404).json({
            error:`Todo ${id} not found`
        });
        return; 
        
    };

    public deleteTodo = (req:Request,res:Response)=>{
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({
                error:'Invalid Id',
            });
            return;
        }
        const todo = todos.find(todo=>todo.id===id);
        if(todo){
            todos.splice(todos.indexOf(todo),1);
            res.json({
                ok:true,
                todo
            })
            return;
        }
        res.status(404).json({
            error:`Todo ${id} not found`
        });
        return; 

    }

}

