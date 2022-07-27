import { ObjectId } from 'mongoose';

export type TokensDataType = {
  id: ObjectId;
  refreshToken: string;
};
