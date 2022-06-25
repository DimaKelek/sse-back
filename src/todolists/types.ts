export type CreatorType = {
  name?: string;
  role?: UserRoles;
};

export enum UserRoles {
  Developer = 'Developer',
  User = 'User',
}

export type TodoListDtoType = {
  completedTasks: number;
  creator: CreatorType;
  description: string | null;
  image: string | null;
  isLike: boolean;
  numberOfTasks: number;
  title: string;
};
