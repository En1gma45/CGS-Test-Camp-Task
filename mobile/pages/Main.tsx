import React from 'react';
import {View, StyleSheet, Button} from 'react-native';



const Main = ({ history }:any) => {
    return( 
        <View>
            <Button
                title='Login'
                onPress={()=>history.push('/login')} />
            <Button
                title='Registration'
                onPress={()=>history.push('/registration')} />
        </View>
    )

}

const styles = StyleSheet.create({})

export default Main;
