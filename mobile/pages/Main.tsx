import React, { useContext, useEffect } from "react";
import { View, Button } from "react-native";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import { AuthContext } from "../context/AuthContext";

const Main = ({ navigation }: any ) => {
    const { userData, login } = useContext(AuthContext);
    const isLogin = !!userData!.token;

    useEffect(() => {
        if (userData && userData.token !== "") {
            login(userData.token, userData.userId);
        }
    }, []);

    return(
        <View>{isLogin ?
            <View>
                <Button
                    title="Tasks"
                    onPress={() => navigation.navigate("Tasks")}
                />
                <LogoutButton />
            </View>
        :
            <View>
                <Button
                    title="Login"
                    onPress={() =>  navigation.navigate("Login")}
                />
                <Button
                    title="Registration"
                    onPress={() => navigation.navigate("Registration")}
                />
            </View>
        }</View>
    );
};

export default Main;
