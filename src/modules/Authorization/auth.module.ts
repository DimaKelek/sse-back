import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../Users/user.module';
import { TokensModule } from '../Tokens/tokens.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, TokensModule],
})
export class AuthModule {}
