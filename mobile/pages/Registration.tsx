import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import { RegisterValidation } from '../validators/register.validator'
import { IRegister } from '../types/Registration';
import InputField from '../components/FormInput/InputField';

const Registration = ({ navigation }: any) => {

    const initVal: IRegister = {
        username: '',
        email: '',
        password: '',
        verifyPassword: ''
    }

    return (
        <Formik
            initialValues={initVal}
            onSubmit={() => navigation.navigate('Login') }
            validationSchema={RegisterValidation}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>
                <InputField
                        name='username'
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.username}
                />
                <InputField
                        name='email'
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.email}
                />
                <InputField
                        name='password'
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.password}
                />
                <InputField
                        name='verifyPassword'
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.verifyPassword}
                />
                <Button
                    onPress={handleSubmit}
                    title="Register"
                />
                <Button 
                    title='Back to main'
                    onPress={()=> navigation.navigate('Main')}
                />
            </View>
            )}
        </Formik>
    );
}

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
})

export default Registration;
