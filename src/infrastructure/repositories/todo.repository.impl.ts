import { TodoDatasource, TodoRepository } from "../../domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dto";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoRepositoryImpl implements TodoRepository{

    constructor(
        private readonly datasource: TodoDatasource,
    ){}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: any): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.update(updateTodoDto);
    }
    delete(id: any): Promise<TodoEntity> {
        return this.datasource.delete(id);
    }

}