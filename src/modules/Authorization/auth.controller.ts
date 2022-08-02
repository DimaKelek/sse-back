import { Body, Controller, Headers, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserType, RegistrationUserDtoType } from '../Users/types';
import { AuthEndpoints, GenerateTokenReturnType } from './types';
import { ResponseType } from '../../types/defaultTypes';
import { authorizationHeaderHandler } from '../../common/helpers';
import { MessageType } from '../../common/constants/strings';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AuthEndpoints.Registration)
  registration(@Body() userDto: CreatedUserType): Promise<MessageType> {
    return this.authService.registration(userDto);
  }

  @Post(AuthEndpoints.SignIn)
  signIn(
    @Body() credentials: Pick<RegistrationUserDtoType, 'email' | 'password'>,
  ): Promise<ResponseType<GenerateTokenReturnType>> {
    const { email, password } = credentials;

    return this.authService.signIn(email, password);
  }

  @Post(AuthEndpoints.SignOut)
  signOut(@Headers('authorization') authorization: string): Promise<ResponseType | void> {
    const token = authorizationHeaderHandler(authorization);

    return this.authService.signOut(token);
  }

  @Post(AuthEndpoints.Refresh)
  refresh(
    @Headers('authorization') authorization: string,
  ): Promise<ResponseType<GenerateTokenReturnType>> {
    const token = authorizationHeaderHandler(authorization);

    return this.authService.refresh(token);
  }
}
