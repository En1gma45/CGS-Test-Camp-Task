import React, { useCallback } from 'react';
import { View, StyleSheet, Button, SafeAreaView, Text, FlatList, ListRenderItem } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ITask } from '../types/Post';
import TaskItem from './TaskItem';
import APIServices from '../services/HTTP.services'
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const getHandler = async () => {
    try{
        const { data } = await APIServices.get('/task')
        return data
    } catch(e) {
        throw new Error('Smth went wrong')
    }
}

const deleteHandler = async ( id:string )=>{
    try {
        const response = await APIServices.delete(`/task/${id}`)
        console.log(response.data);
        getHandler()
    } catch (error) {
        console.log(error)
    }
}

const TasksContainer = () => {

    const navigation = useNavigation()
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery<any>('getTasks', getHandler)
    const { mutateAsync } = useMutation(deleteHandler)

    const remove = async (id:string) => {
        await mutateAsync(id)
        queryClient.invalidateQueries('getTasks')
    }

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries('getTasks')
        }, [])
    )

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

    const renderItems: ListRenderItem<ITask> = ({ item }) => {
        return(
            <View>
                <TaskItem { ...item }/>
                <View style={ styles.buttonContainer }>
                    <Button
                        title='Edit'
                        onPress={ () => navigation.navigate('Edit', {...item})} />
                    <Button
                        title='Delete'
                        onPress={ () => remove(item._id)} />
                    </View>
            </View>
        )
    }

    const listFooter = () => {
        return (
            <Button
                title='LogOut'
                onPress={ () => navigation.navigate('Login')}
            />
        )
    }

    const listHeader = () => {
        return (
            <View style={ styles.createButton }>
                <Button 
                    title='Create'
                    onPress={() => navigation.navigate('Create')}/>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <FlatList
                data = {data}
                renderItem = {renderItems}
                keyExtractor = {item => item._id}
                ListFooterComponent = {listFooter}
                ListHeaderComponent = {listHeader}
                stickyHeaderIndices={[0]}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        padding: 25,
    },
    createButton: {
        height:50
    },
})

export default TasksContainer;
