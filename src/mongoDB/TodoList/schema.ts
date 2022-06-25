import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreatorType } from '../../todolists/types';
import { Document, Types } from 'mongoose';
import { defaultConfig } from '../defaultConfig';

export type TodoListDocument = TodoList & Document;

@Schema(defaultConfig)
export class TodoList {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  creator: CreatorType;
  @Prop()
  title: string;
  @Prop()
  isLike: boolean;
  @Prop()
  completedTasks: number;
  @Prop()
  numberOfTasks: number;
  @Prop()
  description: string | null;
  @Prop()
  image: string | null;
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
