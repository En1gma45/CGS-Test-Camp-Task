import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ITask } from '../types/Post';


const TaskItem = ( {title, description, year, isPublic, isCompleted}: ITask) => {
    return (
        <View style={styles.taskContainer}>
            <View style={styles.infoContainer}>
                <Text>{title}</Text>
                <Text>{description}</Text>
                <Text>{year}</Text>
                <View style={styles.additionalInfo}>
                    <Text style={{marginRight: 30}}>{isCompleted ? 'Completed': 'Not completed'}</Text>
                    <Text style={{marginLeft: 30}}>{isPublic ? 'Public' : 'Private'}</Text>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    taskContainer:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        backgroundColor: 'lightgray'
    },
    infoContainer:{
        height: 250,
        minWidth:250,
        padding: 25,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    additionalInfo:{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between'
    },
})

export default TaskItem;
