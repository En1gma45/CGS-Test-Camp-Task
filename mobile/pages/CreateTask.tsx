import React, { useState } from 'react';
import { Formik } from 'formik';
import { TaskValidation } from '../validators/task.validator';
import {View, StyleSheet, TextInput, Button, Text} from 'react-native';
import axios from 'axios';
import CheckBox from '../components/CheckBox/CheckBox';
import { useHistory } from 'react-router';
import { ITask } from '../types/Post';
import InputField from '../components/FormInput/InputField';
import APIServices from '../services/task.service'


const CreateTask: React.FC = () => {
    const history = useHistory()

    const initVal: ITask = {
        _id: '',
        title: '',
        description: '',
        year: new Date(Date.now()).getFullYear(),
        isPublic: false,
        isCompleted: false
    }


    const createTask = async (task: ITask) => {
        try {
            const {data} = await APIServices.postData('/task/', task)
            console.log(data)
            history.push('/tasks')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Formik
            initialValues={ initVal }
            onSubmit={ values => {
                createTask(values)
            }}
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
                            onPress={()=>{setFieldValue('isPublic', !values.isPublic)}}
                            style={styles.checkbox}
                            value={values.isPublic ? 'Public' : 'Private'}
                        />
                    </View>
                        <CheckBox 
                            isChecked={values.isCompleted}
                            onPress={()=>{setFieldValue('isCompleted', !values.isCompleted)}}
                            style={styles.checkbox}
                            value={values.isCompleted ? 'Completed' : 'Not completed'}
                        />
                    <Button
                        onPress={handleSubmit}
                        title="Submit" 
                    />
                    <Button 
                        title='Back to tasks'
                        onPress={()=> history.push('/tasks')}
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
