import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {Button, StyleSheet} from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const LogoutButton: React.FC = () => {

    const navigation = useNavigation()
    const { logout } = useContext(AuthContext)

    const logoutHandler = () => {
        logout()
        navigation.navigate('Login')
    }

    return (
        <Button
            title="Logout"
            onPress={logoutHandler}
        />
    );
}

const styles = StyleSheet.create({})

export default LogoutButton;
