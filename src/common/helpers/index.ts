import { BEARER, Responses } from '../constants/strings';
import { HttpException, HttpStatus } from '@nestjs/common';

export const authorizationHeaderHandler = (header?: string): string => {
  if (!header) {
    throw new HttpException(Responses.tokens.headersNotFound, HttpStatus.FORBIDDEN);
  }

  const splitHeader = header.split(' ');
  const bearer = splitHeader[0];
  const token = splitHeader[1];

  if (bearer !== BEARER || !token) {
    throw new HttpException(Responses.tokens.incorrectToken, HttpStatus.FORBIDDEN);
  }

  return token;
};
