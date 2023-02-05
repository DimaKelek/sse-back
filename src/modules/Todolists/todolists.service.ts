import { Injectable } from '@nestjs/common';
import { CreateTodoListDtoType, TodoListDtoType } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { TodoList, TodoListDocument } from '../../mongoDB/TodoList/schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoListsService {
  constructor(@InjectModel(TodoList.name) private todoListModel: Model<TodoListDocument>) {}

  async getAllTodoLists(): Promise<TodoList[]> {
    return this.todoListModel.find().exec();
  }

  async getTodoListById(id: string): Promise<TodoList> {
    return this.todoListModel.findById(id);
  }

  async createNewTodoList(todoListDto: CreateTodoListDtoType): Promise<TodoList> {
    const newTodoList: TodoListDtoType = {
      ...todoListDto,
      isLike: false,
      numberOfTasks: 0,
      completedTasks: 0,
      image: todoListDto.image ?? null,
      description: todoListDto.description ?? null,
    };

    const newTodoListDocument = new this.todoListModel(newTodoList);

    return newTodoListDocument.save();
  }

  async removeTodoList(id: string): Promise<TodoList> {
    return this.todoListModel.findByIdAndRemove(id);
  }

  async updateTodoList(id: string, todoListDto: TodoListDtoType): Promise<TodoList> {
    return this.todoListModel.findByIdAndUpdate(id, todoListDto, { new: true });
  }
}
