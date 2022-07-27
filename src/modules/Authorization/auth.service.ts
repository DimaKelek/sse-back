import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../Users/user.service';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from '../Todolists/types';
import { EXCEPTIONS } from '../../common/constants/strings';
import { RegistrationUserDtoType } from '../Users/types';
import { RegistrationResponseType } from './types';
import { TokensService } from '../Tokens/tokens.service';

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
      throw new HttpException(EXCEPTIONS.userExist, HttpStatus.BAD_REQUEST);
    }

    try {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const newUser = await this.userService.createUser({
        ...userDto,
        role: userDto.role ?? UserRoles.User,
        password: hashPassword,
      });

      const tokens = await this.tokensService.generateTokens(newUser);
      await this.tokensService.saveRefreshToken(
        newUser.id,
        tokens.refreshToken,
      );

      return {
        ...tokens,
        user: newUser,
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('### Some error', error);
    }
  }
}
