import { CreatedUserType } from '../Users/types';

export type GenerateTokenReturnType = {
  accessToken: string;
  refreshToken: string;
};

export type TokenInfoType = Pick<
  CreatedUserType,
  'id' | 'email' | 'fullName' | 'role'
>;

export type ReturnedUserType = Omit<CreatedUserType, 'password'>;

export type AuthSuccessResponseType = GenerateTokenReturnType & {
  user: ReturnedUserType;
};
