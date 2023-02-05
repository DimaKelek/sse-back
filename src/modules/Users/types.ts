import { UserRoles } from '../Todolists/types';
import { ObjectId } from 'mongoose';
import { MessageType } from '../../common/constants/strings';

export type RegistrationUserDtoType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photo?: string | null;
  role?: UserRoles;
};

export type CreatedUserType = RegistrationUserDtoType & {
  fullName: string;
  id: ObjectId;
};

export type MeDtoType = MessageType & {
  data: Omit<CreatedUserType, 'password'>;
};

export enum UsersEndpoints {
  GetUserById = '/list/:id',
  Main = 'users',
  Me = '/me',
}
