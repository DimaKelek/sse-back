import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../Users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from '../Todolists/types';
import { EXCEPTIONS } from '../../common/constants/strings';
import { CreatedUserType, RegistrationUserDtoType } from '../Users/types';
import { GenerateTokenReturnType, TokenInfoType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registration(
    userDto: RegistrationUserDtoType,
  ): Promise<GenerateTokenReturnType> {
    const currentUser = await this.userService.getUserByEmail(userDto.email);

    if (currentUser) {
      throw new HttpException(EXCEPTIONS.userExist, HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const newUser = await this.userService.createUser({
      ...userDto,
      role: userDto.role ?? UserRoles.User,
      password: hashPassword,
    });

    return this.generateTokens(newUser);
  }

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
}
