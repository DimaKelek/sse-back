import { Module } from '@nestjs/common';
import { TodoListsModule } from './todolists/todolist.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

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
