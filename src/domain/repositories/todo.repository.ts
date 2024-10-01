import { CreateTodoDto, UpdateTodoDto } from "../dto";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository{

    abstract create(createTodoDto:CreateTodoDto): Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById(id:any): Promise<TodoEntity>;
    abstract update(updateTodoDto:UpdateTodoDto): Promise<TodoEntity>;
    abstract delete(id:any): Promise<TodoEntity>;

}