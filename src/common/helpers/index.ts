import { BEARER } from '../constants/strings';
import { unauthorizedUser } from '../errors';

export const authorizationHeaderHandler = (header?: string): string => {
  if (!header) {
    unauthorizedUser();
  }

  const splitHeader = header.split(' ');
  const bearer = splitHeader[0];
  const token = splitHeader[1];

  if (bearer !== BEARER || !token) {
    unauthorizedUser();
  }

  return token;
};
