import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDtoType, UserService } from './user.service';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private authService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() userDto: UserDtoType): Promise<UserDtoType> {
    return this.authService.createUser(userDto);
  }
}
