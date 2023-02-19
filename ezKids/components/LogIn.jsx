import React from 'react';
import { useForm } from 'react-hook-form';
import { View, Alert, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import {useDispatch, useSelector} from 'react-redux';
import { login, logout } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { AsyncStorage, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { DevSettings } from 'react-native';


function LogIn({ navigation }) {

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

    console.log("hello");

    useEffect(() => {
        if(userLogin){
            const focusHandler = navigation.addListener('focus', () => {
                Alert.alert('Logged Out');
    
                dispatch(logout());
                // DevSettings.reload();
    
            });
            return focusHandler;
        }
        
    }, [navigation]);
    

    useEffect(() => {
        console.log(userLogin)
        if(loggedIn){
           

            Alert.alert("Successfully Logged In, " + userInfo.username + "!");
            navigation.push('Menu')


        } else if (error){
            Alert.alert("Authentication Failed", "Invalid User / Password"); 
        }
        
        
    }, [loading])

    

    return (
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View style={{marginTop: 30, alignSelf: 'center'}}>
                <Image source={require('../assets/logo.png')} style={{resizeMode: "center", width: 250, height: 100}} />
            </View>
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
                            label: 'Email'
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
                })} style={{marginBottom: 15}}>
                    Submit
                </Button>
                <Button
                    mode={'contained'}
                    onPress={() => {
                        navigation.navigate('Forget')
                }}>
                    Forgot Password
                </Button>
        </View>
    )
}

export default LogIn;