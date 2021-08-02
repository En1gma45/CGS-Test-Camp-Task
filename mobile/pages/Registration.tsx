import React from "react";
import { View, StyleSheet, Button, GestureResponderEvent } from "react-native";
import { Formik } from "formik";
import { RegisterValidation } from "../validators/register.validator";
import { IRegister } from "../types/Registration";
import InputField from "../components/FormInput/InputField";
import APIServices from "../services/HTTP.services";

const registrationHandler = async (data: IRegister) => {
    try {
        const response = await APIServices.post("/user/registration", data);
        console.log(response.data);
    } catch (error) {
        throw new Error(`Smth went wrong: ${error}`);
    }
};

const Registration = ({ navigation }: any) => {
    const initVal: IRegister = {
        username: "",
        email: "",
        password: "",
        verifyPassword: ""
    };

    const submitHandler = async (data: IRegister) => {
        registrationHandler(data)
        .then(navigation.navigate("Login"))
        .catch((e) => {
            throw new Error(`Smth went wrong: ${e.msg}`);
        });
    };

    return (
        <Formik
            initialValues={initVal}
            onSubmit={submitHandler}
            validationSchema={RegisterValidation}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>
                <InputField
                        name="username"
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.username}
                />
                <InputField
                        name="email"
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.email}
                />
                <InputField
                        name="password"
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.password}
                />
                <InputField
                        name="verifyPassword"
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.verifyPassword}
                />
                <Button
                    onPress={(handleSubmit as unknown) as (event: GestureResponderEvent) => void}
                    title="Register"
                />
                <Button
                    title="Login"
                    onPress={onMainScreenNavigate => navigation.navigate("Login")}
                />
            </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    input: {
        height: 40,
        margin: 12,
        marginBottom: 25,
        borderWidth: 1,
      },
});

export default Registration;
