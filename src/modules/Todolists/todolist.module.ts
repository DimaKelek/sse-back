import { Module } from '@nestjs/common';
import { TodoListsController } from './todolists.controller';
import { TodoListsService } from './todolists.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoList, TodoListSchema } from '../../mongoDB/TodoList/schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TodoListsController],
  providers: [TodoListsService],
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
    JwtModule,
  ],
})
export class TodoListsModule {}
