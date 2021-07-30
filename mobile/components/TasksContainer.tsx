import React, { useCallback, useContext } from 'react';
import { View, StyleSheet, Button, SafeAreaView, Text, FlatList, ListRenderItem } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ITask } from '../types/Post';
import TaskItem from './TaskItem';
import APIServices from '../services/HTTP.services'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const TasksContainer = () => {

    const navigation = useNavigation()
    const queryClient = useQueryClient()
    const { userData } = useContext(AuthContext)
    const { userId } = userData!

    const getHandler = useCallback(async () => {
        try{
            //AsyncStorage.getItem('UserData').then(res => console.log(res))
            const { data } = await APIServices.get('/task', [`userId=${userId}`])
            return data
        } catch(e) {
            throw new Error('Smth went wrong')
        }
    }, [userId])

    const deleteHandler = async ( id:string )=>{
        try {
            const response = await APIServices.delete(`/task/${id}`)
            console.log(response.data);
            getHandler()
        } catch (error) {
            console.log(error)
        }
    }


    const { data, isLoading, isError } = useQuery<any>('getTasks', getHandler)
    const { mutateAsync } = useMutation(deleteHandler)

    const removeHandler = async (id:string) => {
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
                <TaskItem {...item }/>
                <View style={styles.buttonContainer}>
                    <Button
                        title='Edit'
                        onPress={onEditScreenNavigate => navigation.navigate('Edit', {...item})} />
                    <Button
                        title='Delete'
                        onPress={() => removeHandler(item._id)} />
                    </View>
            </View>
        )
    }

    const listFooter = () => {
        return (
            <Button
                title='Main'
                onPress={onLoginScreenNavigate => navigation.navigate('Main')}
            />
        )
    }

    const listHeader = () => {
        return (
            <View style={ styles.createButton }>
                <Button 
                    title='Create'
                    onPress={onCreateScreenNavigate => navigation.navigate('Create')}/>
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
