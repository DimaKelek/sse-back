import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../Users/user.service';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from '../Todolists/types';
import { EXCEPTIONS } from '../../common/constants/strings';
import { RegistrationUserDtoType } from '../Users/types';
import { RegistrationResponseType } from './types';
import { TokensService } from '../Tokens/tokens.service';
import { MessageResponseType } from '../../types/defaultTypes';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokensService: TokensService,
  ) {}

  async registration(
    userDto: RegistrationUserDtoType,
  ): Promise<RegistrationResponseType> {
    const currentUser = await this.userService.getUserByEmail(userDto.email);

    if (currentUser) {
      throw new HttpException(EXCEPTIONS.UserExist, HttpStatus.BAD_REQUEST);
    }

    try {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const newUser = await this.userService.createUser({
        ...userDto,
        role: userDto.role ?? UserRoles.User,
        photo: userDto.photo ?? null,
        password: hashPassword,
      });

      const { id, email, fullName, role, lastName, firstName, photo } = newUser;
      const tokens = await this.tokensService.generateTokens(newUser);
      await this.tokensService.saveRefreshToken(id, tokens.refreshToken);

      return {
        ...tokens,
        user: { id, email, fullName, role, lastName, firstName, photo },
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('### Some error', error);
    }
  }

  async signOut(refreshToken: string): Promise<MessageResponseType | void> {
    return await this.tokensService.removeTokens(refreshToken);
  }
}
