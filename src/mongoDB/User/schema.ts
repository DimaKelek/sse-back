import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../../todolists/types';
import { Document } from 'mongoose';
import { defaultConfig } from '../defaultConfig';

export type UserDocument = User & Document;

@Schema(defaultConfig)
export class User {
  @Prop()
  name: string;
  @Prop()
  role: UserRoles;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
