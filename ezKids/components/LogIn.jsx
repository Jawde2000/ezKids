import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import {useDispatch, useSelector} from 'react-redux';
import { login, Logout } from '../redux/actions/userActions';
import { useEffect, useState } from 'react';
import { AsyncStorage, Image, TouchableOpacity, Text, ToastAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LOGOUT_RESET, USER_LOGOUT } from '../redux/constants/userConstants';
import { DevSettings } from 'react-native';


function LogIn() {
    const navigation = useNavigation();
    const {control, setFocus, handleSubmit, reset} = useForm({
        defaultValues: {
            email: '',
            userPassword: ''
        }
    })

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo, loggedIn} = userLogin
    const [userData, setUserData] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: LOGOUT_RESET});
        async function getUserInfo() {
            const userDatas = await AsyncStorage.getItem('userInfo');
            const de_userDatas =  JSON.parse(userDatas);
            setUserData(de_userDatas);
        }
        getUserInfo();
    }, [userInfo])

    const handleLogin = (data) => {
        console.log(39);
        console.log(data);
        dispatch(login(data.email, data.userPassword));
    }

    useEffect(() => {
        if(userInfo) {
            reset({
                email: '',
                userPassword: '',
            });
            // dispatch({type: USER_LOGOUT});
        }
    }, [userInfo])

    // useEffect(() => {
    //     if(userInfo == null && loggedIn === false){
    //         const focusHandler = navigation.addListener('focus', () => {
    //             dispatch(Logout());
    //             ToastAndroid.showWithGravity(
    //                 'Log out success',
    //                 ToastAndroid.SHORT,
    //                 ToastAndroid.CENTER,
    //               );
    //         });
    //         return focusHandler;
    //     } 
        
    // }, [userInfo]);
    

    useEffect(() => {
        console.log(userInfo)
        console.log("74")
        console.log(userData)

        if (userInfo && typeof userInfo.then === 'function') {
            userInfo.then((val) => {
                if(val){
                    ToastAndroid.showWithGravity(
                        "Successfully Logged In",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                    navigation.navigate('Menu');
                } else if (error){
                    ToastAndroid.showWithGravity(
                        "Authentication Failed",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                      );
                }
            })
          } else {
            if(userInfo){
                ToastAndroid.showWithGravity(
                    "Successfully Logged In",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                navigation.navigate('Menu');
            }
          }
        
        
    }, [userInfo, userData])

    

    return (
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', marginHorizontal: 20, marginVertical: 50}}>
            <View style={{marginTop: 30, alignSelf: 'center'}}>
                <Image source={require('../assets/logo.png')} style={{resizeMode: "center", width: 350, height: 100}} />
            </View>
            <Text style={{fontSize: 9, fontWeight: 'bold', textAlign: 'center', marginBottom: 20,}}>
                "Empowering data-driven student insights"
            </Text>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                    required: {
                        value: true,
                        message: 'Please enter a valid email',
                    },
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email',
                    },
                
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                        style={{
                            height: 40,
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingLeft: 10,
                            borderColor: '#ccc',
                            width: 300,
                        }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Enter your email"
                        />
                    </View>
                    )}
                />
                <Controller
                    control={control}
                    name="userPassword"
                    rules={{
                    required: {
                        value: true,
                        message: 'Please enter a strong password',
                    },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <View style={{ marginBottom: 20 }}>
                        <TextInput
                        style={{
                            height: 40,
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingLeft: 10,
                            borderColor: '#ccc',
                            width: 300,
                        }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={true}
                        placeholder="Enter your password"
                        />
                    </View>
                    )}
                />
                {/* <Button
                    mode={'contained'}
                    onPress={handleSubmit((data) => {
                        handleLogin(data);
                    })} 
                    style={{marginTop: 20, width: 250, Color: "black"}}
                >
                    Login
                </Button> */}
                <Button
                    mode={'contained'}
                    onPress={handleSubmit((data) => {
                        handleLogin(data);
                    })} 
                    style={{marginTop: 20, width: 250, backgroundColor: "#FFA500",}}
                >
                    <Text style={{fontSize: 16, fontWeight: "bold", color: "white"}}>Login</Text>
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
                    <Text style={{marginTop: 10, color: '#578acb'}}>Forgot Password?</Text>
                </TouchableOpacity>
        </View>
    )
}

export default LogIn;