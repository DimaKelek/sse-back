import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreatedUserType, MeDtoType, RegistrationUserDtoType, UsersEndpoints } from './types';
import { authorizationHeaderHandler } from '../../common/helpers';

@Controller(UsersEndpoints.Main)
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() userDto: RegistrationUserDtoType): Promise<RegistrationUserDtoType> {
    return this.userService.createUser(userDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getUserByEmail(
    @Body() emailDto: Pick<CreatedUserType, 'email'>,
  ): Promise<CreatedUserType | undefined> {
    return this.userService.getUserByEmail(emailDto.email);
  }

  @Get(UsersEndpoints.GetUserById)
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: CreatedUserType['id']): Promise<CreatedUserType | undefined> {
    return this.userService.getUserById(id);
  }

  @Get(UsersEndpoints.Me)
  @HttpCode(HttpStatus.OK)
  getMyData(@Headers('authorization') authorization: string): Promise<MeDtoType> {
    const accessToken = authorizationHeaderHandler(authorization);

    return this.userService.getMyData(accessToken);
  }
}
