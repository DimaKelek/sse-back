import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { defaultConfig } from '../defaultConfig';
import { Document } from 'mongoose';

export type TokensDocument = Tokens & Document;

@Schema(defaultConfig)
export class Tokens {
  @Prop()
  id: string;
  @Prop()
  refreshToken: string;
}

export const TokensSchema = SchemaFactory.createForClass(Tokens);
