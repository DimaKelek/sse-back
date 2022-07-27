import { Injectable } from '@nestjs/common';
import { CreatedUserType } from '../Users/types';
import { GenerateTokenReturnType, TokenInfoType } from '../Authorization/types';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Tokens, TokensDocument } from '../../mongoDB/Tokens/schema';
import { TokensDataType } from './types';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Tokens.name)
    private tokensModel: Model<TokensDocument>,
  ) {}

  async generateTokens(
    newUser: CreatedUserType,
  ): Promise<GenerateTokenReturnType> {
    const { id, email, name, role } = newUser;
    const payload: TokenInfoType = { id, email, name, role };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '10m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  async saveRefreshToken(
    userId: ObjectId,
    refreshToken: string,
  ): Promise<TokensDataType> {
    try {
      const tokensData = await this.tokensModel.findById(userId);

      if (tokensData) {
        tokensData.refreshToken = refreshToken;

        return tokensData.updateOne({ _id: userId });
      }

      return await this.tokensModel.create({
        _id: userId,
        refreshToken,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('### Some error', error);
    }
  }
}
