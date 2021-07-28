import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native';
import { useHistory } from 'react-router';
import TaskItem from './TaskItem';
import { ITask } from '../types/Post';
import APIServices from '../services/task.service'



const TasksContainer = () => {

    const history = useHistory()

    const [tasks, setTasks] = useState<any>([])
    
    useEffect( ()=>{
        getHandler()
    },[])

    const getHandler = async () => {
        try{
            const {data} = await APIServices.getData('/task')
            setTasks(data)
        } catch(e) {
            console.log(e)
        }
    }

    const deleteHandler = async (id:string)=>{
        try {
            const response = await APIServices.deleteData(`/task/${id}`)
            console.log(response.data);
            getHandler()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView>
            <ScrollView >
                {tasks.map((el: ITask)=>{
                    return(
                        <View key={el._id} style={styles.container}>
                            <TaskItem {...el}/>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title='Edit'
                                    onPress={()=>history.push({
                                        pathname: `/tasks/${el._id}`,
                                        state: {...el}
                                    })} />
                                <Button
                                    title='Delete'
                                    onPress={()=>deleteHandler(el._id)} />
                            </View>
                        </View>
                    )
                })}
                <Button
                    title='LogOut'
                    onPress={()=>history.push('/')}
                />
                <View style={styles.footer}></View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
    },
    buttonContainer:{
        display: 'flex',
        justifyContent: 'center',
        padding: 50
    },
    footer:{
        height:200
    }
})

export default TasksContainer;
