import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreatedUserType, RegistrationUserDtoType } from './types';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @Body() userDto: RegistrationUserDtoType,
  ): Promise<RegistrationUserDtoType> {
    return this.userService.createUser(userDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getUserByEmail(
    @Body() emailDto: Pick<CreatedUserType, 'email'>,
  ): Promise<CreatedUserType | undefined> {
    return this.userService.getUserByEmail(emailDto.email);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(
    @Param('id') id: CreatedUserType['id'],
  ): Promise<CreatedUserType | undefined> {
    return this.userService.getUserById(id);
  }
}
