import { CreatedUserType } from '../Users/types';

export type GenerateTokenReturnType = {
  accessToken: string;
  refreshToken: string;
};

export type TokenInfoType = Pick<CreatedUserType, 'id' | 'email' | 'fullName' | 'role'>;

export type ReturnedUserType = Omit<CreatedUserType, 'password'>;

export type AuthSuccessResponseType = GenerateTokenReturnType & {
  //user: ReturnedUserType;
};

export enum AuthResponseCodes {
  Success,
  TokenExpired,
  UserNotAuthorized,
}

export enum AuthMessages {
  RegistrationFailed = 'Oh, something wrong(',
  RegistrationSuccess = 'User has been created!',
  SignInSuccess = 'Sign In successfully',
  SignOutSuccess = 'You have successfully logged out',
}

export enum AuthEndpoints {
  Refresh = '/refresh',
  Registration = '/registration',
  SignIn = '/signIn',
  SignOut = '/signOut',
}
