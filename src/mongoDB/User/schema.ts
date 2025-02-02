import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../../modules/Todolists/types';
import { Document } from 'mongoose';
import { defaultConfig } from '../defaultConfig';

export type UserDocument = User & Document;

@Schema(defaultConfig)
export class User {
  @Prop()
  fullName: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  photo: string | null;
  @Prop()
  role: UserRoles;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
