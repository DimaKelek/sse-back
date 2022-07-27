import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('tokens')
@UsePipes(new ValidationPipe())
export class TokensController {}
