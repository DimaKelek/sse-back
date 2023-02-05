import { ObjectId } from 'mongoose';
import { UserRoles } from '../Todolists/types';
import { MessageType } from '../../common/constants/strings';

export type TokensDataType = {
  id: ObjectId;
  refreshToken: string;
};

export type TokenPayloadType = {
  email: string;
  exp: number;
  fullName: string;
  iat: number;
  id: ObjectId;
  role: UserRoles;
};

export type ValidateTokenReturnType = MessageType & {
  userId?: ObjectId;
};
