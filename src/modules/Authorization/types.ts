import { CreatedUserType } from '../Users/types';

export type GenerateTokenReturnType = {
  accessToken: string;
  refreshToken: string;
};

export type TokenInfoType = Pick<CreatedUserType, 'id' | 'email' | 'fullName' | 'role'>;

export enum AuthEndpoints {
  Main = 'auth',
  Refresh = '/refresh',
  Registration = '/registration',
  SignIn = '/signIn',
  SignOut = '/signOut',
}
