import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoListsService } from './todolists.service';
import { TodoList } from '../../mongoDB/TodoList/schema';
import { TodoListDtoType } from './types';

@Controller('Todolists')
@UsePipes(new ValidationPipe())
export class TodoListsController {
  constructor(private readonly todoListService: TodoListsService) {}

  @Get()
  async getAllTodoLists(): Promise<TodoList[]> {
    return this.todoListService.getAllTodoLists();
  }

  @Get(':id')
  getTodoListById(@Param('id') id: string): Promise<TodoList> {
    return this.todoListService.getTodoListById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createNewTodoList(@Body() todoListDto: TodoListDtoType): Promise<TodoList> {
    return this.todoListService.createNewTodoList(todoListDto);
  }

  @Delete(':id')
  removeTodoList(@Param('id') id: string): Promise<TodoList> {
    return this.todoListService.removeTodoList(id);
  }

  @Put(':id')
  updateTodoList(
    @Body() todoListDto: TodoListDtoType,
    @Param('id') id: string,
  ): Promise<TodoList> {
    return this.todoListService.updateTodoList(id, todoListDto);
  }
}
