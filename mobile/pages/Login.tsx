import React, { useContext } from 'react';
import { View, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import { Formik } from 'formik';
import { UserValidation } from '../validators/user.validator'
import { ILogin } from '../types/Login';
import InputField from '../components/FormInput/InputField';
import APIServices from '../services/HTTP.services'
import { useMutation } from 'react-query';
import { AuthContext } from '../context/AuthContext';


const Login: React.FC = ({ navigation }: any) => {
    const initVal: ILogin = {
        email: '',
        password: ''
    }
    const { login } = useContext(AuthContext);

    const loginHandler = async (data: ILogin) => {
        try {
            const response = await APIServices.post('/user/login', data)
            login(response.data.token, response.data.userId)
        } catch (error) {
            throw new Error(`Smth went wrong: ${error}`)
        }
    }

    const { mutateAsync } = useMutation(loginHandler)

    const submitHandler = async (data: ILogin) => {
        try{
            await loginHandler(data)
            navigation.navigate('Tasks')
        }catch(e){
            throw new Error(`${e}`)
        }
    }

    return (
        <Formik
            initialValues={initVal}
            onSubmit={submitHandler}
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
                        onPress={(handleSubmit as unknown) as (event: GestureResponderEvent) => void}
                        title="Login" 
                    />
                    <Button 
                        title='Create new account'
                        onPress={onMainScreenNavigate => navigation.navigate('Registration')}
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


