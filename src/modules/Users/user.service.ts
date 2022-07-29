import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../mongoDB/User/schema';
import { CreatedUserType, RegistrationUserDtoType } from './types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: RegistrationUserDtoType): Promise<CreatedUserType> {
    const { firstName, lastName } = userDto;
    const fullName = `${firstName} ${lastName}`;
    const newUser = new this.userModel({ ...userDto, fullName });

    return newUser.save();
  }

  async getUserByEmail(
    email: CreatedUserType['email'],
  ): Promise<CreatedUserType | undefined> {
    return this.userModel.findOne({ email });
  }

  async getUserById(
    id: CreatedUserType['id'],
  ): Promise<CreatedUserType | undefined> {
    return this.userModel.findById(id);
  }
}
