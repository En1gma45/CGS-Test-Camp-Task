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
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';

const queryClient = new QueryClient()
const Stack = createStackNavigator()

export default function App() {

  const { login, logout, userData } = useAuth()

  return (
    <AuthContext.Provider value={{ login, logout, userData }}>
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
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({ });
