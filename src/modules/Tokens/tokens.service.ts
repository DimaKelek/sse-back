import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatedUserType } from '../Users/types';
import { GenerateTokenReturnType, TokenInfoType } from '../Authorization/types';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Tokens, TokensDocument } from '../../mongoDB/Tokens/schema';
import { TokensDataType, TokensMessages } from './types';
import { MessageResponseType } from '../../types/defaultTypes';
import { EXCEPTIONS } from '../../common/constants/strings';

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
    const { id, email, fullName, role } = newUser;
    const payload: TokenInfoType = { id, email, fullName, role };

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

      return await this.tokensModel.create({ _id: userId, refreshToken });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('### Some error', error);
    }
  }

  async removeTokens(
    refreshToken: string,
  ): Promise<MessageResponseType | void> {
    const removedInfo = await this.tokensModel.deleteOne({
      refreshToken,
    });

    if (removedInfo.acknowledged && removedInfo.deletedCount > 0) {
      return {
        message: TokensMessages.Removed,
      };
    }

    throw new HttpException(
      EXCEPTIONS.TokenIsNotFound,
      HttpStatus.UNAUTHORIZED,
    );
  }

  async createAndSaveTokens(
    user: CreatedUserType,
  ): Promise<GenerateTokenReturnType> {
    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
