import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View, Text, ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgot } from '../redux/actions/userActions';
import { USER_FORGET_RESET } from '../redux/constants/userConstants';

function Register({ navigation }) {
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: {
            email: '',
        }
    })

    const userForget = useSelector(state => state.userForget)
    const {loading, data, error, e} = userForget

    const dispatch = useDispatch();

    const handleForgot = (data) => {
        dispatch(forgot(data));
    }

    useEffect(() => {
        console.log(error);
        if(data){
            ToastAndroid.showWithGravity(
                "An email have sent to your email included the new password!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
            dispatch({type: USER_FORGET_RESET});
            navigation.goBack();
            
        } else if(error && e){
            ToastAndroid.showWithGravity(
                "No user found! Please try valid email",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }  
    }, [dispatch, loading])


    return (
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2'}}>
            <View style={{marginTop: 30, alignSelf: 'center'}}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#333'}}>Reset Your Password</Text>
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
                                message: 'Please enter a email'
                            },
                            pattern: {value:/^\S+@\S+$/i, message: 'please enter a valid email'},
                        },
                        textInputProps: {
                            label: 'email',
                            style: {
                                width: 300 ,
                            },
                        }
                    }
                ]} 
                />
                <Button
                    mode={'contained'}
                    style={{marginTop: 20, width: 250, backgroundColor: "#FFA500",}}
                    onPress={handleSubmit((data) => {
                        console.log(data);
                        handleForgot(data.email);
                })}>
                    Submit
                </Button>
        </View>
    )
}

export default Register;