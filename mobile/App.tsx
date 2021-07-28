import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NativeRouter, Route, Switch} from 'react-router-native'
import TaskList from './pages/TasksList';
import Login from './pages/Login'
import Registration from './pages/Registration';
import Main from './pages/Main';
import CurrentTask from './pages/CurrentTask';
import CreateTask from './pages/CreateTask';

export default function App() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:50
  }
});
