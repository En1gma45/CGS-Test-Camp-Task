import React from 'react';
import { View, StyleSheet, Button } from 'react-native';



const Main = ({ navigation }: any ) => {
    return( 
        <View>
            <Button
                title='Login'
                onPress={() => navigation.navigate('Login')} />
            <Button
                title='Registration'
                onPress={() => navigation.navigate('Registration')} />
        </View>
    )

}

const styles = StyleSheet.create({})

export default Main;
