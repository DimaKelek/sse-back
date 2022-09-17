import { Module } from '@nestjs/common';
import { TodoListsModule } from './modules/Todolists/todolist.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/Authorization/auth.module';
import { UserModule } from './modules/Users/user.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_CONNECT),
    TodoListsModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
