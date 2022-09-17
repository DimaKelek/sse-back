import { HttpException, HttpStatus } from '@nestjs/common';
import { EXCEPTIONS } from '../constants/strings';

export const unauthorizedUser = (): void => {
  throw new HttpException(EXCEPTIONS.UserIsNotAuthorized, HttpStatus.NOT_FOUND);
};
