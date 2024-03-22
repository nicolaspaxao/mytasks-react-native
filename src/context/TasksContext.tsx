import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FunctionComponent, ReactElement, createContext, useContext, useEffect, useState } from 'react'

interface IProps {
  children: ReactElement
}
export interface ITask {
  id: string;
  title: string;
}
export interface ITaskContext {
  tasks: ITask[];
  addTask(task: ITask): void;
  removeTask(id: string): void;
}

const tasksData = '@MyTasks:Tasks';

export const TasksContext = createContext<ITaskContext>({} as ITaskContext);

export const TasksProvider: FunctionComponent<IProps> = ({ children }) => {
  const [data, setData] = useState<ITask[]>([]);
  let tasks: ITask[] = [];

  useEffect(() => {
    async function loadTasks() {
      const taskList = await AsyncStorage.getItem(tasksData);
      if (taskList) setData(JSON.parse(taskList));
    }
    loadTasks();
  }, []);


  const addTask = async (task: ITask) => {
    try {
      const newTaskList = [...data, task];
      setData(newTaskList);
      await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList));
    } catch (error) {
      throw new Error(error as string);
    }
  }

  const removeTask = async (id: string) => {
    try {
      const newTaskList = data.filter((e) => e.id != id);
      setData(newTaskList);
      await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList));
    } catch (error) {
      throw new Error(error as string);
    }
  }

  return (
    <TasksContext.Provider value={{ tasks: data, addTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTaskList(): ITaskContext {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTasksList deve ser usado em um TasksProvider');
  }

  return context;
}
