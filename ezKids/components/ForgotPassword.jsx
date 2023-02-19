import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
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
            Alert.alert("An Email have sent to your email containing the new password!");
            dispatch({type: USER_FORGET_RESET});
            navigation.goBack();
            
        } else if(error && e){
            Alert.alert("No such user found! Please Try again");
        }  
    }, [dispatch, loading])


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
                                message: 'Please enter a email'
                            },
                            pattern: {value:/^\S+@\S+$/i, message: 'please enter a valid email'},
                        },
                        textInputProps: {
                            label: 'email'
                        }
                    }
                ]} 
                />
                <Button
                    mode={'contained'}
                    onPress={handleSubmit((data) => {
                        console.log("Submit Button Pressed");
                        console.log(data);
                        handleForgot(data.email);
                })}>
                    Submit
                </Button>
        </View>
    )
}

export default Register;