import { MessageType } from '../common/constants/strings';

export type ResponseType<TData = never> = MessageType & {
  data?: TData;
};
