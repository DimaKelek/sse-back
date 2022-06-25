import { Module } from '@nestjs/common';
import { TodoListsController } from './todolists.controller';
import { TodoListsService } from './todolists.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoList, TodoListSchema } from '../mongoDB/TodoList/schema';

@Module({
  controllers: [TodoListsController],
  providers: [TodoListsService],
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
  ],
})
export class TodoListsModule {}
