import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface CheckBoxProps {
    isChecked: boolean,
    style: object
    value: string
    onPress: () => void
}

const CheckBox = (props: CheckBoxProps) => {
    const {onPress, isChecked} = props
    const name = isChecked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'

    return (
        <View>
            <Pressable onPress={onPress}>
                <MaterialCommunityIcons name={name} size={24} color="black" />
            </Pressable>
            <Text style={props.style}>{props.value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default CheckBox;
