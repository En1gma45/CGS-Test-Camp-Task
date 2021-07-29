import React from 'react';
import { View, StyleSheet, Button } from 'react-native';



const Main = ({ navigation }: any ) => {
    return( 
        <View>
            <Button
                title='Login'
                onPress={onLoginScreenNavigate => navigation.navigate('Login')} />
            <Button
                title='Registration'
                onPress={onRegistrationScreenNavigate => navigation.navigate('Registration')} />
        </View>
    )

}

const styles = StyleSheet.create({})

export default Main;
