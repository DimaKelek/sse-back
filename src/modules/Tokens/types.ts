import { ObjectId } from 'mongoose';

export type TokensDataType = {
  id: ObjectId;
  refreshToken: string;
};

export enum TokensMessages {
  Removed = `Token has been removed`,
}
