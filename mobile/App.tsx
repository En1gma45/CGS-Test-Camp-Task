import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { QueryClient, QueryClientProvider } from 'react-query'
import TaskList from './pages/TasksList';
import Login from './pages/Login'
import Registration from './pages/Registration';
import Main from './pages/Main';
import CurrentTask from './pages/CurrentTask';
import CreateTask from './pages/CreateTask';
import { NavigationContainer } from '@react-navigation/native';

const queryClient = new QueryClient()
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={Main} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Registration' component={Registration} />
          <Stack.Screen name='Tasks' component={TaskList} />
          <Stack.Screen name='Edit' component={CurrentTask} />
          <Stack.Screen name='Create' component={CreateTask} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({ });
