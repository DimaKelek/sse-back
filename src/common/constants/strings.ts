export enum EXCEPTIONS {
  UserExist = 'The user already exists',
  UserIsNotAuthorized = `The user isn't authorized`,
  TokenIsNotFound = `The token wasn't found`,
  UserNotFound = 'User not found',
  IncorrectPassword = 'Incorrect password',
}

export enum Messages {
  RegistrationFailed = 'Oh, something wrong(',
  RegistrationSuccess = 'User has been created!',
  SignOutSuccess = 'You have successfully logged out',
}

export const BEARER = 'Bearer';
