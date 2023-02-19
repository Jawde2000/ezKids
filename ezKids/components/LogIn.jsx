import React from 'react';
import { useForm } from 'react-hook-form';
import { View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { AsyncStorage } from 'react-native';


function Register() {
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            email: '',
            userPassword: ''
        }
    })

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo, loggedIn} = userLogin

    const dispatch = useDispatch()

    const handleLogin = (data) => {
        console.log(data);
        dispatch(login(data.email, data.userPassword));
    }

    

    useEffect(() => {
        console.log(userLogin)
        if(loggedIn){
           

            Alert.alert("Successfully Logged In, " + userInfo.username + "!");
            
        } else if (error){
            Alert.alert("Authentication Failed", "Invalid User / Password"); 
        }
        
        
    }, [loading])

    

    return (
        <View>
            <FormBuilder 
                control={control} 
                setFocus={setFocus}
                formConfigArray={[
                    {
                        type: 'email',
                        name: 'email',

                        rules: {
                            required: {
                                value: true,
                                message: 'Please enter a Email',
                            },
                            pattern: {value:/^\S+@\S+$/i, message: 'please enter a valid email'},
                        },
                        textInputProps: {
                            label: 'email'
                        }
                    },
                    {
                        type: 'password',
                        name: 'userPassword',

                        rules: {
                            required: {
                                value: true,
                                message: 'Please enter a strong password'
                            }
                        },
                        textInputProps: {
                            label: 'Password'
                        }
                    },
                ]} 
                />
                <Button
                    mode={'contained'}
                    onPress={handleSubmit((data) => {
                        // console.log("Login Button Pressed");
                        // console.log(data);
                        handleLogin(data);
                })}>
                    Submit
                </Button>
                <Button
                    mode={'contained'}
                    onPress={() => {
                        console.log("Forgot Password Button Pressed");
                }}>
                    Forgot Password
                </Button>
        </View>
    )
}

export default Register;