import React, { useCallback, useContext, useState } from "react";
import { View, StyleSheet, Button, SafeAreaView, Text, FlatList, ListRenderItem, ActivityIndicator } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ITask } from "../types/Post";
import TaskItem from "./TaskItem";
import APIServices from "../services/HTTP.services";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PaginationButtons from "./PaginationButtons/PaginationButtons";
import Search from "./Search/Search";

const TasksContainer = () => {

    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const { userData } = useContext(AuthContext);
    const { token } = userData!;
    const [page, setPage] = useState<number>(1);
    const [params, setParams] = useState<string>("");
    const [tokenState, setTokenState] = useState({ value: "" });


    const getHandler = useCallback(async (queryString) => {
        try {
            // tslint:disable-next-line: no-console
            console.log("Params: ", params);
            const { data } = await APIServices.get("/task".concat(queryString), token);
            setPage(data.page);
            return data;
        } catch (e) {
            throw new Error(`Smth went wrong: ${e}`);
        }
    }, [params]);

    const deleteHandler = async (id: string) => {
        try {
            const response = await APIServices.delete(`/task/${id}`, token);
            getHandler(params);
        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error);
        }
    };

    const redirectTo = (screenName: string, props?: object) => () => {
        navigation.navigate(screenName, props);
    };


    const { data, isLoading, isError } = useQuery(["getTasks", params], () => getHandler(params));
    const { mutateAsync } = useMutation(deleteHandler);

    const removeHandler = (id: string) => async () => {
        await mutateAsync(id);
        queryClient.invalidateQueries("getTasks");
    };

    useFocusEffect(
        useCallback(() => {
            queryClient.invalidateQueries("getTasks");
        }, [params])
    );

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (isError) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        );
    }

    const renderItems: ListRenderItem<ITask> = ({ item }) => {
        return (
            <View>
                <TaskItem {...item} />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Edit"
                        onPress={redirectTo("Edit", { ...item })} />
                    <Button
                        title="Delete"
                        onPress={removeHandler(item._id)} />
                </View>
            </View>
        );
    };

    const listFooter = () => {
        return (
            <View>
                {data.countsOfPages > 1 && <PaginationButtons count={data.countsOfPages} handler={setPage} />}
                <Button
                    title="Main"
                    onPress={redirectTo("Main")}
                />
            </View>
        );
    };

    const listHeader = () => {
        return (
            <View style={styles.header}>
                <View style={styles.createButton}>
                    <Button
                        title="Create"
                        onPress={redirectTo("Create")} />
                </View>
                <Search page={page} setParams={setParams}/>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <FlatList
                data={data.tasks}
                renderItem={renderItems}
                keyExtractor={item => item._id}
                ListFooterComponent={listFooter}
                ListHeaderComponent={listHeader}

            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 450
    },
    buttonContainer: {
        justifyContent: "center",
        padding: 25,
    },
    createButton: {
        height: 50
    },
});

export default TasksContainer;
