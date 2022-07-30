import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../mongoDB/User/schema';
import { Tokens, TokensSchema } from '../../mongoDB/Tokens/schema';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Tokens.name, schema: TokensSchema },
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
