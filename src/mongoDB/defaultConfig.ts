import { SchemaOptions } from '@nestjs/mongoose/dist/decorators/schema.decorator';

export const defaultConfig: SchemaOptions = {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
};
