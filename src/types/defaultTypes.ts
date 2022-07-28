export type MessageResponseType<T = never> = {
  data?: T;
  message: string;
};
