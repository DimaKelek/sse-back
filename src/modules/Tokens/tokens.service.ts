import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatedUserType } from '../Users/types';
import { GenerateTokenReturnType, TokenInfoType } from '../Authorization/types';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Tokens, TokensDocument } from '../../mongoDB/Tokens/schema';
import { TokenPayloadType, TokensDataType, ValidateTokenReturnType } from './types';
import { MessageType, Responses } from '../../common/constants/strings';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Tokens.name)
    private tokensModel: Model<TokensDocument>,
  ) {}

  async generateTokens(newUser: CreatedUserType): Promise<GenerateTokenReturnType> {
    const { id, email, fullName, role } = newUser;
    const payload: TokenInfoType = { id, email, fullName, role };
    const access_secret = process.env.ACCESS_SECRET_KEY;
    const refresh_secret = process.env.REFRESH_SECRET_KEY;

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: access_secret,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '30d',
        secret: refresh_secret,
      }),
    };
  }

  async saveRefreshToken(userId: ObjectId, refreshToken: string): Promise<TokensDataType> {
    try {
      const tokensData = await this.tokensModel.findById(userId);

      if (tokensData) {
        return this.tokensModel.findByIdAndUpdate(userId, { refreshToken });
      }

      return await this.tokensModel.create({ _id: userId, refreshToken });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('### Some error', error);
    }
  }

  async removeTokens(refreshToken: string): Promise<MessageType> {
    const removedInfo = await this.tokensModel.deleteOne({
      refreshToken,
    });

    if (removedInfo.acknowledged && removedInfo.deletedCount > 0) {
      return Responses.success;
    }

    throw new HttpException(Responses.tokens.tokenNotFound, HttpStatus.UNAUTHORIZED);
  }

  async createAndSaveTokens(user: CreatedUserType): Promise<GenerateTokenReturnType> {
    const tokens = await this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async findRefreshToken(refreshToken: string): Promise<string | null> {
    const tokensData = await this.tokensModel.findOne({ refreshToken });

    if (!tokensData) {
      return null;
    }

    return tokensData.refreshToken;
  }

  async validateToken(token: string, secret: string): Promise<ValidateTokenReturnType> {
    try {
      const payload: TokenPayloadType = this.jwtService.verify(token, {
        secret,
      });

      return { ...Responses.success, userId: payload.id };
    } catch (e) {
      if (e.message === 'jwt expired') {
        return { ...Responses.tokens.tokenExpired, userId: null };
      } else {
        return { ...Responses.unknown, userId: null };
      }
    }
  }
}
