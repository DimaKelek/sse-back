import { UserRoles } from '../Todolists/types';
import { ObjectId } from 'mongoose';

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

export type MeDtoType = Omit<CreatedUserType, 'password'>;

export enum UsersEndpoints {
  GetUserById = '/list/:id',
  Main = 'users',
  Me = '/me',
}
