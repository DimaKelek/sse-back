import { CreatedUserType } from '../Users/types';

export type GenerateTokenReturnType = {
  accessToken: string;
  refreshToken: string;
};

export type TokenInfoType = Pick<
  CreatedUserType,
  'id' | 'email' | 'name' | 'role'
>;

export type RegistrationResponseType = GenerateTokenReturnType & {
  user: CreatedUserType;
};
