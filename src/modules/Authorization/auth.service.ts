import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../Users/user.service';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from '../Todolists/types';
import { EXCEPTIONS, MessageType, Responses } from '../../common/constants/strings';
import { RegistrationUserDtoType } from '../Users/types';
import { GenerateTokenReturnType } from './types';
import { TokensService } from '../Tokens/tokens.service';
import { ResponseType } from '../../types/defaultTypes';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
  ) {}

  async registration(userDto: RegistrationUserDtoType): Promise<MessageType> {
    const currentUser = await this.userService.getUserByEmail(userDto.email);

    if (currentUser) {
      throw new HttpException(EXCEPTIONS.UserExist, HttpStatus.BAD_REQUEST);
    }

    try {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      await this.userService.createUser({
        ...userDto,
        role: userDto.role ?? UserRoles.User,
        photo: userDto.photo ?? null,
        password: hashPassword,
      });

      return Responses.success;
    } catch (error) {
      return Responses.unknown;
    }
  }

  async signIn(userEmail: string, password: string): Promise<ResponseType<GenerateTokenReturnType>> {
    const user = await this.userService.getUserByEmail(userEmail);

    if (!user) {
      throw new HttpException(Responses.auth.signIn.userNotFound, HttpStatus.NOT_FOUND);
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new HttpException(Responses.auth.signIn.invalidPassword, HttpStatus.NOT_FOUND);
    }

    const tokens = await this.tokensService.createAndSaveTokens(user);

    return {
      ...Responses.success,
      data: tokens,
    };
  }

  async signOut(refreshToken: string): Promise<MessageType> {
    return await this.tokensService.removeTokens(refreshToken);
  }

  async refresh(refreshToken: string): Promise<ResponseType<GenerateTokenReturnType>> {
    if (!refreshToken) {
      throw new HttpException(Responses.tokens.headersNotFound, HttpStatus.NOT_FOUND);
    }

    const refreshTokenFromDb = await this.tokensService.findRefreshToken(refreshToken);
    const { userId } = await this.tokensService.validateToken(
      refreshToken,
      process.env.REFRESH_SECRET_KEY,
    );

    if (!userId || !refreshTokenFromDb) {
      throw new HttpException(Responses.tokens.tokenNotFound, HttpStatus.NOT_FOUND);
    }

    const user = await this.userService.getUserById(userId);
    const tokens = await this.tokensService.createAndSaveTokens(user);

    return {
      ...Responses.success,
      data: tokens,
    };
  }
}
