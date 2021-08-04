import React, { Dispatch, SetStateAction } from "react";
import { View, StyleSheet, ListRenderItem, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface IProps {
    count: number;
    handler: Dispatch<SetStateAction<number>>;
}

const PaginationButtons: React.FC<IProps> = (props: IProps) => {

    const array = [];

    for (let index = 1; index <= props.count; index++) {
        array.push(index);
    }

    const onPressHandler = (item: any) => () => {
        props.handler(item);
    };

    const renderItems: ListRenderItem<any> = ({ item }) => {
        return(
            <View style={styles.button}>
                <Button
                    title = {`${item}`}
                    onPress = {onPressHandler(item)}
                />
            </View>
        );
    };

    return (
        <FlatList
            data = {array}
            renderItem={renderItems}
            keyExtractor={item => item}
            contentContainerStyle = {styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    button: {
        width: 50,
        height: 50,
        marginRight: 5,
        marginLeft: 5
    }
});

export default PaginationButtons;
