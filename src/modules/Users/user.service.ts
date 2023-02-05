import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../mongoDB/User/schema';
import { CreatedUserType, MeDtoType, RegistrationUserDtoType } from './types';
import { Tokens, TokensDocument } from '../../mongoDB/Tokens/schema';
import { TokensService } from '../Tokens/tokens.service';
import { ErrorCodes, Responses } from '../../common/constants/strings';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Tokens.name)
    private readonly tokensModel: Model<TokensDocument>,
    private readonly tokensService: TokensService,
  ) {}

  async createUser(userDto: RegistrationUserDtoType): Promise<User> {
    const { firstName, lastName, email } = userDto;

    const lowercaseEmail = email.toLowerCase();
    const fullName = `${firstName} ${lastName}`;
    const newUser = new this.userModel({
      ...userDto,
      email: lowercaseEmail,
      fullName,
    });

    return newUser.save();
  }

  async getUserByEmail(email: CreatedUserType['email']): Promise<CreatedUserType | undefined> {
    return this.userModel.findOne({ email });
  }

  async getUserById(userId: CreatedUserType['id']): Promise<CreatedUserType> {
    return this.userModel.findById(userId);
  }

  async getMyData(accessToken: string): Promise<MeDtoType> {
    const { userId, responseCode } = await this.tokensService.validateToken(
      accessToken,
      process.env.ACCESS_SECRET_KEY,
    );

    if (responseCode === ErrorCodes.TokenExpired) {
      throw new HttpException(Responses.tokens.tokenExpired, HttpStatus.UNAUTHORIZED);
    }

    if (userId) {
      const tokensData = await this.tokensModel.findById(userId);

      if (tokensData) {
        const { id, fullName, firstName, lastName, email, photo, role } = await this.getUserById(userId);
        return {
          ...Responses.success,
          data: { id, fullName, firstName, lastName, email, photo, role },
        };
      }
    }

    throw new HttpException(Responses.tokens.tokenNotFound, HttpStatus.FORBIDDEN);
  }
}
