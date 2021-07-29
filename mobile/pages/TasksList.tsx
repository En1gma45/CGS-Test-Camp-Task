import React from 'react';
import { StyleSheet, View } from 'react-native';
import TasksContainer from '../components/TasksContainer';


const TaskList = () => {

    return (
        <View style={styles.container}>
            <TasksContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    createButton:{
        height:50
    },
})

export default TaskList;
