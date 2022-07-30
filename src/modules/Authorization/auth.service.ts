import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../Users/user.service';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from '../Todolists/types';
import { EXCEPTIONS } from '../../common/constants/strings';
import { CreatedUserType, RegistrationUserDtoType } from '../Users/types';
import { AuthSuccessResponseType } from './types';
import { TokensService } from '../Tokens/tokens.service';
import { MessageResponseType } from '../../types/defaultTypes';
import { unauthorizedUser } from '../../common/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
  ) {}

  async registration(
    userDto: RegistrationUserDtoType,
  ): Promise<AuthSuccessResponseType> {
    const currentUser = await this.userService.getUserByEmail(userDto.email);

    if (currentUser) {
      throw new HttpException(EXCEPTIONS.UserExist, HttpStatus.BAD_REQUEST);
    }

    try {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const newUser = (await this.userService.createUser({
        ...userDto,
        role: userDto.role ?? UserRoles.User,
        photo: userDto.photo ?? null,
        password: hashPassword,
      })) as CreatedUserType;

      const { id, email, fullName, role, lastName, firstName, photo } = newUser;
      const tokens = await this.tokensService.createAndSaveTokens(newUser);

      return {
        ...tokens,
        user: { id, email, fullName, role, lastName, firstName, photo },
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('### Some error', error);
    }
  }

  async signIn(
    userEmail: string,
    password: string,
  ): Promise<AuthSuccessResponseType> {
    const user = await this.userService.getUserByEmail(userEmail);

    if (!user) {
      throw new HttpException(EXCEPTIONS.UserNotFound, HttpStatus.NOT_FOUND);
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new HttpException(
        EXCEPTIONS.IncorrectPassword,
        HttpStatus.NOT_FOUND,
      );
    }

    const { id, email, fullName, role, lastName, firstName, photo } = user;
    const tokens = await this.tokensService.createAndSaveTokens(user);

    return {
      ...tokens,
      user: { id, email, fullName, role, lastName, firstName, photo },
    };
  }

  async signOut(refreshToken: string): Promise<MessageResponseType | void> {
    return await this.tokensService.removeTokens(refreshToken);
  }

  async refresh(refreshToken: string): Promise<AuthSuccessResponseType> {
    if (!refreshToken) {
      unauthorizedUser();
    }

    const userId = await this.tokensService.validateRefreshToken(refreshToken);
    const refreshTokenFromDb = await this.tokensService.findRefreshToken(
      refreshToken,
    );

    if (!userId || !refreshTokenFromDb) {
      unauthorizedUser();
    }

    const user = await this.userService.getUserById(userId);

    const { id, email, fullName, role, lastName, firstName, photo } = user;
    const tokens = await this.tokensService.generateTokens(user);

    return {
      ...tokens,
      user: { id, email, fullName, role, lastName, firstName, photo },
    };
  }
}
