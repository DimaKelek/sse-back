import {
  Body,
  Controller,
  Headers,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserType, RegistrationUserDtoType } from '../Users/types';
import { AuthSuccessResponseType } from './types';
import { MessageResponseType } from '../../types/defaultTypes';
import { authorizationHeaderHandler } from '../../common/helpers';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  registration(
    @Body() userDto: CreatedUserType,
  ): Promise<AuthSuccessResponseType> {
    return this.authService.registration(userDto);
  }

  @Post('/signIn')
  signIn(
    @Body() credentials: Pick<RegistrationUserDtoType, 'email' | 'password'>,
  ): Promise<AuthSuccessResponseType> {
    const { email, password } = credentials;

    return this.authService.signIn(email, password);
  }

  @Post('/signOut')
  signOut(
    @Headers('authorization') authorization: string,
  ): Promise<MessageResponseType | void> {
    const token = authorizationHeaderHandler(authorization);

    return this.authService.signOut(token);
  }

  @Post('/refresh')
  refresh(
    @Headers('authorization') authorization: string,
  ): Promise<AuthSuccessResponseType> {
    const token = authorizationHeaderHandler(authorization);

    return this.authService.refresh(token);
  }
}
