import React from 'react';
import { StyleSheet, View } from 'react-native';
import {NativeRouter, Route, Switch} from 'react-router-native'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import TaskList from './pages/TasksList';
import Login from './pages/Login'
import Registration from './pages/Registration';
import Main from './pages/Main';
import CurrentTask from './pages/CurrentTask';
import CreateTask from './pages/CreateTask';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path='/login' component={Login} />
            <Route exact path='/registration' component={Registration} />
            <Route exact path='/tasks' component={TaskList} />
            <Route exact path='/tasks/new' component={CreateTask} />
            <Route exact path='/tasks/:id' component={CurrentTask} />
          </Switch>
        </View>
      </NativeRouter>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50
  }
});
