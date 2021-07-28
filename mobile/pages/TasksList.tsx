import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useHistory } from 'react-router';
import TasksContainer from '../components/TasksContainer';


const TaskList = () => {

    const history = useHistory()

    return (
        <View style={styles.container}>
            <View  style={styles.createButton}>
                <Button 
                    title='Create'
                    onPress={()=>history.push('/tasks/new')}/>
            </View>
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
