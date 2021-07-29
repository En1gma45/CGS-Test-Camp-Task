import React from 'react';
import { Formik } from 'formik';
import { TaskValidation } from '../validators/task.validator';
import { View, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import { useMutation } from 'react-query';
import { ITask } from '../types/Post';
import CheckBox from '../components/CheckBox/CheckBox';
import InputField from '../components/FormInput/InputField';
import APIServices from '../services/HTTP.services'
import { useNavigation } from '@react-navigation/native';


const createHandler = async (task: ITask) => {
    try {
        const {data} = await APIServices.post('/task/', task)
        console.log(data)
        
    } catch (error) {
        console.log(error)
    }
}

const CreateTask: React.FC = () => {

    const navigation = useNavigation()
    const initVal: ITask = {
        _id: '',
        title: '',
        description: '',
        year: new Date(Date.now()).getFullYear(),
        isPublic: false,
        isCompleted: false
    }

    const { mutateAsync } = useMutation(createHandler)

    const submitHandler = async (data: ITask) => {
        await mutateAsync(data)
        navigation.navigate('Tasks')
    }

    return (
        <Formik
            initialValues={initVal}
            onSubmit={submitHandler}
            validationSchema={TaskValidation}
        >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => {
                return (
                    <View>
                        <InputField
                            name='title'
                            style={styles.input}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.title} />
                        <InputField
                            name='description'
                            style={styles.input}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.description} />
                        <InputField
                            name='year'
                            style={styles.input}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values.year.toString()} />
                        <View style={styles.checkbox}>
                            <CheckBox
                                isChecked={values.isPublic}
                                onPress={() => setFieldValue('isPublic', !values.isPublic)}
                                style={styles.checkbox}
                                value={values.isPublic ? 'Public' : 'Private'} />
                        </View>
                        <CheckBox
                            isChecked={values.isCompleted}
                            onPress={() => setFieldValue('isCompleted', !values.isCompleted)}
                            style={styles.checkbox}
                            value={values.isCompleted ? 'Completed' : 'Not completed'} />
                        <Button
                            onPress={(handleSubmit as unknown) as (event: GestureResponderEvent) => void}
                            title="Submit" />
                        <Button
                            title='Back to tasks'
                            onPress={onTasksScreenNavigate => navigation.navigate('Tasks')} />
                    </View>
                );
            }}
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
    descInput: {
        height: 200,
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

export default CreateTask;
