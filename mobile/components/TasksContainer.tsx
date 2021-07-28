import React from 'react';
import { View, StyleSheet, Button, ScrollView, SafeAreaView, Text } from 'react-native';
import { useHistory } from 'react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ITask } from '../types/Post';
import TaskItem from './TaskItem';
import APIServices from '../services/HTTP.services'

const getHandler = async () => {
    try{
        const {data} = await APIServices.get('/task')
        return data
    } catch(e) {
        throw new Error('Smth went wrong')
    }
}

const deleteHandler = async (id:string)=>{
    try {
        const response = await APIServices.delete(`/task/${id}`)
        console.log(response.data);
        getHandler()
    } catch (error) {
        console.log(error)
    }
}

const TasksContainer = () => {

    const history = useHistory()
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery<any>('getTasks', getHandler)
    const { mutateAsync } = useMutation(deleteHandler)

    const remove = async (id:string) => {
        await mutateAsync(id)
        queryClient.invalidateQueries('getTasks')
    }

    if(isLoading){
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

    if(isError){
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <ScrollView >
                {data.map((el: ITask)=>{
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
                                    onPress={()=>remove(el._id)} />
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
