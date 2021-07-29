import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import { UserValidation } from '../validators/user.validator'
import { ILogin } from '../types/Login';
import InputField from '../components/FormInput/InputField';


const Login: React.FC = ({ navigation }: any) => {
    const initVal: ILogin = {
        email: '',
        password: ''
    }

    return (
        <Formik
            initialValues={initVal}
            onSubmit={() => navigation.navigate('Tasks')}
            validationSchema={UserValidation}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
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
                    <Button
                        onPress={handleSubmit}
                        title="Login" 
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

export default Login;


