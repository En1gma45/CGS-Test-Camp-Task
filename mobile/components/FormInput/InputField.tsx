import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { IInput } from "./IInput";

const InputField = ({ name, style, handleChange, handleBlur, value}: IInput) => {
    return (
        <View>
            <Text style={styles.text}>{name.replace(name[0], name[0].toUpperCase())}</Text>
            <TextInput
                style={style}
                secureTextEntry={name === "password" ? true : false}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        marginLeft: 20
    }
});

export default InputField;
