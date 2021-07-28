import React from 'react';
import {View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import { useHistory, useLocation } from 'react-router';
import { TaskValidation } from '../validators/task.validator';
import InputField from '../components/FormInput/InputField'
import { ITask } from '../types/Post';
import CheckBox from '../components/CheckBox/CheckBox';
import APIServices from '../services/HTTP.services'

const CurrentTask = () => {

    const location = useLocation<any>()
    const history = useHistory()
    const initVal: ITask = {
        _id: location.state._id,
        title: location.state.title,
        description: location.state.description,
        year: location.state.year,
        isPublic: location.state.isPublic,
        isCompleted: location.state.isCompleted
    }
    
    const updateHandler = async (task: ITask) => {
        try {
            const { data } = await APIServices.update(`/task/${task._id}`, task)
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
                updateHandler(values)

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
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
    }
})

export default CurrentTask;
