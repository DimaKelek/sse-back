import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../mongoDB/User/schema';
import { CreatedUserType, RegistrationUserDtoType } from './types';
import { Tokens, TokensDocument } from '../../mongoDB/Tokens/schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Tokens.name)
    private readonly tokensModel: Model<TokensDocument>,
  ) {}

  async createUser(userDto: RegistrationUserDtoType): Promise<User> {
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
    userId: CreatedUserType['id'],
  ): Promise<CreatedUserType | undefined> {
    return this.userModel.findById(userId);
  }
}
