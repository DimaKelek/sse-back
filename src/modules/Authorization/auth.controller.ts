import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserType } from '../Users/types';
import { RegistrationResponseType } from './types';

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
}
