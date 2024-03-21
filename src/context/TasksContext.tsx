import React, { createContext } from 'react'

export interface ITaskContext {
  id: string;
  title: string;
}

export const TasksContext = createContext<ITaskContext>({} as ITaskContext);

