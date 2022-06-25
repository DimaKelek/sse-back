import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../../todolists/types';

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
