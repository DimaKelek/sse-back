import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserType } from '../Users/types';
import { RegistrationResponseType } from './types';
import { EXCEPTIONS } from '../../common/constants/strings';
import { MessageResponseType } from '../../types/defaultTypes';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  registration(
    @Body() userDto: CreatedUserType,
  ): Promise<RegistrationResponseType> {
    return this.authService.registration(userDto);
  }

  @Post('/signOut')
  signOut(@Headers() headers): Promise<MessageResponseType | void> {
    const authHeader: string = headers.authorization;
    const splitHeader = authHeader.split(' ');
    const bearer = splitHeader[0];
    const token = splitHeader[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: EXCEPTIONS.UserIsNotAuthorized,
      });
    }

    return this.authService.signOut(token);
  }
}
