import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensService } from './tokens.service';

import { TokensController } from './tokens.controller';
import { JwtModule } from '@nestjs/jwt';
import { Tokens, TokensSchema } from '../../mongoDB/Tokens/schema';

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [
    MongooseModule.forFeature([{ name: Tokens.name, schema: TokensSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [TokensService],
})
export class TokensModule {}
