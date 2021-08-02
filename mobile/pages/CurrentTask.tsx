import React, { useContext } from 'react';
import { View, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import { Formik } from 'formik';
import { useMutation } from 'react-query';
import { TaskValidation } from '../validators/task.validator';
import { ITask } from '../types/Post';
import InputField from '../components/FormInput/InputField'
import CheckBox from '../components/CheckBox/CheckBox';
import APIServices from '../services/HTTP.services'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';



const CurrentTask = ({ route }: any) => {

    const { userData } = useContext(AuthContext)
    const { token, userId } = userData!

    const { params } = route
    const navigation = useNavigation()
    const initVal: ITask = {
        _id: params._id,
        title: params.title,
        description: params.description,
        year: params.year,
        isPublic: params.isPublic,
        isCompleted: params.isCompleted,
        owner: userId
    }

    const updateHandler = async (task: ITask) => {
        try {
            const { data } = await APIServices.update(`/task/${task._id}`, task, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    

    const { mutateAsync } = useMutation(updateHandler)

    const submitHandler = async (data: ITask) => {
        await mutateAsync(data)
        navigation.navigate('Tasks')
    }
    
    return (
        <Formik
            initialValues={ initVal }
            onSubmit={submitHandler}
            validationSchema={TaskValidation}
        >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                <View>
                    <InputField
                        name='title'
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.title}
                    />
                    <InputField
                        name='description'
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.description}
                    />
                    <InputField
                        name='year'
                        style={styles.input}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.year.toString()}
                    />
                    <View style={styles.checkbox}>
                        <CheckBox 
                            isChecked={values.isPublic}
                            onPress={() => setFieldValue('isPublic', !values.isPublic)}
                            style={styles.checkbox}
                            value={values.isPublic ? 'Public' : 'Private'}
                        />
                    </View>
                        <CheckBox 
                            isChecked={values.isCompleted}
                            onPress={() => setFieldValue('isCompleted', !values.isCompleted)}
                            style={styles.checkbox}
                            value={values.isCompleted ? 'Completed' : 'Not completed'}
                        />
                    <Button
                        onPress={(handleSubmit as unknown) as (event: GestureResponderEvent) => void}
                        title="Submit" 
                    />
                    <Button 
                        title='Back to tasks'
                        onPress={onTasksScreenNavigate => navigation.navigate('Tasks')}
                    />
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        marginBottom: 25,
        borderWidth: 1,
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
    }
})

export default CurrentTask;
