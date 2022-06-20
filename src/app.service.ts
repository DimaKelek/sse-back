import { Injectable } from '@nestjs/common';

export type TodolistType = {
  completedTasks?: number;
  creator?: CreatorType;
  id?: string;
  isLike?: boolean;
  numberOfTasks?: number;
  title?: string;
};

export type CreatorType = {
  name?: string;
  role?: UserRoles;
};

export enum UserRoles {
  Developer = 'Developer',
  User = 'User',
}

@Injectable()
export class AppService {
  getTodoLists(): TodolistType[] {
    return [
      {
        id: '1',
        title: 'TodoList 1',
        creator: { name: 'Dima Kelek', role: UserRoles.Developer },
        isLike: false,
        numberOfTasks: 3,
        completedTasks: 0,
      },
      {
        id: '2',
        title: 'TodoList 2',
        creator: { name: 'Dima Kelek', role: UserRoles.Developer },
        isLike: false,
        numberOfTasks: 8,
        completedTasks: 8,
      },
      {
        id: '3',
        title: 'TodoList 3',
        creator: { name: 'Dima Kelek', role: UserRoles.Developer },
        isLike: false,
        numberOfTasks: 12,
        completedTasks: 2,
      },
      {
        id: '4',
        title: 'TodoList 4',
        creator: { name: 'Dima Kelek', role: UserRoles.Developer },
        isLike: false,
        numberOfTasks: 3,
        completedTasks: 0,
      },
      {
        id: '5',
        title: 'TodoList 5',
        creator: { name: 'Dima Kelek', role: UserRoles.Developer },
        isLike: false,
        numberOfTasks: 3,
        completedTasks: 3,
      },
      {
        id: '6',
        title: 'TodoList 6',
        creator: { name: 'Dima Kelek', role: UserRoles.Developer },
        isLike: false,
        numberOfTasks: 1,
        completedTasks: 0,
      },
    ];
  }
}
