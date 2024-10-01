import { prisma } from "../../data/postgres";
import { TodoDatasource } from "../../domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dto";
import { TodoEntity } from "../../domain/entities/todo.entity";


export class TodoDatasourceImpl implements TodoDatasource{

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        return TodoEntity.fromObject(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo=>TodoEntity.fromObject(todo));
    }

    async findById(id: any): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: {
                id
            }
        });
        if(!todo) throw new Error(`Todo with id ${id} not found`);
        return TodoEntity.fromObject(todo);
    }

    async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const findTodo = await this.findById(updateTodoDto.id);
        const todo = await prisma.todo.update({
            where:{id:updateTodoDto.id},
            data:updateTodoDto!
        });
        return TodoEntity.fromObject(todo);
    }

    async delete(id: any): Promise<TodoEntity> {
        const todo = await prisma.todo.delete({
            where:{id}
        });
        return TodoEntity.fromObject(todo);
    }

}