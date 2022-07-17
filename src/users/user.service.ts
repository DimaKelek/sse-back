import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../mongoDB/User/schema';
import { UserRoles } from '../todolists/types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: UserDtoType): Promise<UserDtoType> {
    const newUser = new this.userModel(userDto);

    return newUser.save();
  }
}

export type UserDtoType = {
  email: string;
  name: string;
  password: string;
  role?: UserRoles;
};
