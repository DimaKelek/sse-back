import { Module } from '@nestjs/common';
import { TodoListsModule } from './todolists/todolist.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_CONNECT),
    TodoListsModule,
  ],
})
export class AppModule {}
