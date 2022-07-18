import { UserRoles } from '../Todolists/types';

export type RegistrationUserDtoType = {
  email: string;
  name: string;
  password: string;
  role?: UserRoles;
};

export type CreatedUserType = RegistrationUserDtoType & {
  id: string;
};
