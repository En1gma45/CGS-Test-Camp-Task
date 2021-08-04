import React, { useState } from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { urlHandler } from "../../services/params.services";
import { IParams } from "../../types/IParams";
import CheckBox from "../CheckBox/CheckBox";

interface IProps {
    page: number;
    setParams: (data: string) => void;
}

const Search = ({ page, setParams }: IProps ) => {


    const [check, setCheck] = useState<IParams>({
        page: page,
        title: "",
        reset: true,
        isPublic: false,
        isPrivate: false,
        isCompleted: false,
        isNotCompleted: false
    });


    const onPressHandler = () => {
        const temp = urlHandler(check);
        setParams(temp);
    };

    const titleState = (val: string) => {
        setCheck({
            ...check,
            title: val,
        });
    };

    const resetStates = () => {
        setCheck({
            ...check,
            title: "",
            reset: true,
            isPublic: false,
            isPrivate: false,
            isCompleted: false,
            isNotCompleted: false
        });
    };

    const publicState = () => {
        setCheck({
            ...check,
            reset: false,
            isPublic: true,
            isPrivate: false,
        });
    };

    const privateState = () => {
        setCheck({
            ...check,
            reset: false,
            isPublic: false,
            isPrivate: true,
        });
    };

    const completedState = () => {
        setCheck({
            ...check,
            reset: false,
            isCompleted: true,
            isNotCompleted: false,
        });
    };

    const notCompletedState = () => {
        setCheck({
            ...check,
            reset: false,
            isCompleted: false,
            isNotCompleted: true,
        });
    };

    return (
        <View>
            <TextInput
                placeholder="Search..."
                    style={styles.input}
                    onChangeText={(text) => titleState(text)}
                    value={check.title}
                />
            <View>
                <CheckBox
                    isChecked={check.reset}
                    onPress={resetStates}
                    style={styles.checkbox}
                    value="All results"
                />
                <CheckBox
                    isChecked={check.isPublic}
                    onPress={publicState}
                    style={styles.checkbox}
                    value="Public"
                />
                <CheckBox
                    isChecked={check.isPrivate}
                    onPress={privateState}
                    style={styles.checkbox}
                    value="Private"
                />
                <CheckBox
                    isChecked={check.isCompleted}
                    onPress={completedState}
                    style={styles.checkbox}
                    value="Completed"
                />
                <CheckBox
                    isChecked={check.isNotCompleted}
                    onPress={notCompletedState}
                    style={styles.checkbox}
                    value="Not Completed"
                />
            </View>
            <View style={styles.submit}>
                <Button
                    title="Search"
                    onPress={onPressHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    submit: {
        marginBottom: "20%"
    },
    checkbox: {
        flexDirection: "row",
        marginBottom: 15
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
});

export default Search;
