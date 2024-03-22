import React, { useContext, useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { TaskList } from '../components/TaskList';
import { ITask, TasksContext, useTaskList } from '../context/TasksContext';

export const Home = () => {
  const [newTask, setNewTask] = useState('');

  const { addTask } = useTaskList();

  const handleAddNewTaska = () => {
    const data = {
      id: String(new Date().getTime()),
      title: newTask ? newTask : 'Task empty'
    } as ITask;

    addTask(data);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Dev!</Text>
        <TextInput
          onChangeText={setNewTask}
          placeholderTextColor='#555'
          placeholder='Nova tarefa...'
          style={styles.input}
        />
        <TouchableOpacity activeOpacity={.7} style={styles.button} onPress={handleAddNewTaska}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <Text style={styles.titleTasks}>Minhas tarefas</Text>
        <TaskList />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121214'
  },
  container: {
    flex: 1,
    backgroundColor: '#121214',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    color: '#f1f1f1',
    fontWeight: 'bold'
  },
  titleTasks: {
    fontSize: 24,
    color: '#f1f1f1',
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#29292e',
    fontSize: 18,
    color: '#f1f1f1',
    padding: Platform.OS === 'android' ? 10 : 15,
    marginTop: 30,
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#eba417',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#121214',
    fontSize: 18,
    fontWeight: 'bold'
  },
})
