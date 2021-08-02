import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IStorage {
    token: string;
    userId: string;
}

export const useAuth = () => {
    const [userData, setUserData] = useState<IStorage>({
        token: "",
        userId: ""
    });
    const [isReady, setReady] = useState<boolean>(false);

    const login = async (jwtToken: string, id: string) => {
        try {
            setUserData({
                token: jwtToken,
                userId: id
            });
            await AsyncStorage.setItem("UserData", JSON.stringify({
                userId: id,
                token: jwtToken
            }));
        } catch (error) {
            alert(error);
        }
    };

    const logout = async () => {
        try {
            setUserData({
                token: "",
                userId: ""
            });
            await AsyncStorage.removeItem("UserData");
        } catch (error) {
            alert(error);
        }
    };

    const getDataFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem("UserData");
            if (data !== null) {
                setUserData(JSON.parse(data));
            }
        } catch (error) {
            alert(error);
        }
    };

    return { login, logout, userData };
};

