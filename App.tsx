import React from 'react'
import { Home } from './src/Pages/Home';
import { ITaskContext, TasksContext } from './src/context/TasksContext';

const App = () => {
  return (
    <TasksContext.Provider value={{ id: '1', title: 'Task01' }}>
      <Home />
    </TasksContext.Provider>
  );
}

export default App;


