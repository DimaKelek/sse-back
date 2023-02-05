export enum Messages {
  HeadersNotFound = 'Headers not found',
  IncorrectPassword = 'Incorrect password',
  IncorrectToken = 'Incorrect token',
  Success = 'Success!!',
  TokenExpired = 'Token expired',
  TokenNotFound = 'Token not found in database. Try to sign in again please',
  UnknownError = 'Unknown error',
  UserExist = 'The user already exists',
  UserNotFound = 'User not found',
}

export enum ErrorCodes {
  Success,
  UserExist,
  IncorrectPassword,
  UserNotFound,
  TokenNotFound,
  TokenExpired,
  UnknownError,
  IncorrectToken,
  HeadersNotFound,
}

export type MessageType = {
  message: Messages;
  responseCode: ErrorCodes;
};

type ResponsesType = {
  auth: {
    signIn: {
      invalidPassword: MessageType;
      userNotFound: MessageType;
    };
    signUp: {
      userExist: MessageType;
    };
  };
  success: MessageType;
  tokens: {
    headersNotFound: MessageType;
    incorrectToken: MessageType;
    tokenExpired: MessageType;
    tokenNotFound: MessageType;
  };
  unknown: MessageType;
};

export const Responses: ResponsesType = {
  success: {
    message: Messages.Success,
    responseCode: ErrorCodes.Success,
  },
  tokens: {
    tokenNotFound: {
      message: Messages.TokenNotFound,
      responseCode: ErrorCodes.TokenNotFound,
    },
    tokenExpired: {
      message: Messages.TokenExpired,
      responseCode: ErrorCodes.TokenExpired,
    },
    headersNotFound: {
      message: Messages.HeadersNotFound,
      responseCode: ErrorCodes.HeadersNotFound,
    },
    incorrectToken: {
      message: Messages.IncorrectToken,
      responseCode: ErrorCodes.IncorrectToken,
    },
  },
  auth: {
    signUp: {
      userExist: {
        message: Messages.UserExist,
        responseCode: ErrorCodes.UserExist,
      },
    },
    signIn: {
      invalidPassword: {
        message: Messages.IncorrectPassword,
        responseCode: ErrorCodes.IncorrectPassword,
      },
      userNotFound: {
        message: Messages.UserNotFound,
        responseCode: ErrorCodes.UserNotFound,
      },
    },
  },
  unknown: {
    message: Messages.UnknownError,
    responseCode: ErrorCodes.UnknownError,
  },
};

export const BEARER = 'Bearer';
