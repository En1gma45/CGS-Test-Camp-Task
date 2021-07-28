import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import { IInput } from './IInput';

const InputField = ({ name, style, handleChange, handleBlur, value}: IInput) => {
    return (
        <View>
            <Text style={{marginLeft:20}}>{name.replace(name[0], name[0].toUpperCase())}</Text>
            <TextInput
                style={style}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                value={value}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default InputField;
